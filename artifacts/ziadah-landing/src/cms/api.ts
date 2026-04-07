export function getApiOrigin(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  return typeof raw === "string" ? raw.replace(/\/$/, "") : "";
}

type ApiOk<T> = { success: true; data: T };
type ApiErr = { success: false; error: string };
type ApiEnvelope<T> = ApiOk<T> | ApiErr;

export class CmsApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CmsApiError";
    this.status = status;
  }
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function getApiErrorMessage(body: unknown, status: number): string {
  if (
    body &&
    typeof body === "object" &&
    "success" in body &&
    (body as { success?: boolean }).success === false &&
    "error" in body &&
    typeof (body as { error?: unknown }).error === "string"
  ) {
    return (body as { error: string }).error;
  }
  const code = status || 500;
  if (code === 502 || code === 503 || code === 504) {
    return "Service is temporarily unavailable. Please try again in a moment.";
  }
  return `API request failed (${code})`;
}

export async function cmsFetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const origin = getApiOrigin();
  const url = `${origin}/api${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(init?.headers);
  if (
    init?.body !== undefined &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(url, { ...init, headers, credentials: "include" });
  const body = await parseJson(res);
  if (!res.ok) {
    throw new CmsApiError(getApiErrorMessage(body, res.status), res.status || 500);
  }
  if (!body || typeof body !== "object" || !("success" in body)) {
    throw new CmsApiError(`Invalid API response (${res.status || 500})`, res.status || 500);
  }
  const envelope = body as ApiEnvelope<T>;
  if (!envelope.success) {
    throw new CmsApiError(envelope.error, res.status || 500);
  }
  return envelope.data;
}

export async function cmsUploadFile(
  path: string,
  file: File,
): Promise<unknown> {
  const origin = getApiOrigin();
  const url = `${origin}/api${path.startsWith("/") ? path : `/${path}`}`;
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(url, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const body = await parseJson(res);
  if (!res.ok) {
    throw new CmsApiError(getApiErrorMessage(body, res.status), res.status || 500);
  }
  if (!body || typeof body !== "object" || !("success" in body)) {
    throw new CmsApiError(`Invalid API response (${res.status || 500})`, res.status || 500);
  }
  const envelope = body as ApiEnvelope<unknown>;
  if (!envelope.success) {
    throw new CmsApiError(envelope.error, res.status || 500);
  }
  return envelope.data;
}

export type CmsRole = "super_admin" | "editor" | "viewer";

export type CmsUser = {
  id: string;
  name: string;
  email: string;
  role: CmsRole;
  mustChangePassword: boolean;
  lastLogin?: string | null;
  /** Omitted on login response; present on user list. */
  isActive?: boolean;
};

export type ContentBlockRow = {
  id: string;
  key: string;
  value: string;
  type:
    | "text"
    | "richtext"
    | "image_url"
    | "color"
    | "number"
    | "boolean";
  page: string;
  section: string;
  label: string;
  updatedAt: string;
  updatedBy: string | null;
};

export type CmsPageRow = {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  /** Present after DB migration `0001_sections_config`; absent treats as []. */
  sectionsConfig?: Array<{
    id: string;
    label: string;
    hidden: boolean;
  }>;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
};

export type CmsMediaRow = {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string | null;
};

export type AuditItem = {
  id: string;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  action: string;
  targetTable: string;
  targetId: string | null;
  oldValue: unknown;
  newValue: unknown;
  timestamp: string;
};

export const cmsApi = {
  login: (email: string, password: string) =>
    cmsFetchJson<{ user: CmsUser }>("/cms/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => cmsFetchJson<{ ok: boolean }>("/cms/auth/logout", { method: "POST" }),

  refresh: () => cmsFetchJson<{ user: CmsUser }>("/cms/auth/refresh", { method: "POST" }),

  me: () => cmsFetchJson<CmsUser>("/cms/auth/me"),

  patchMe: (body: {
    name?: string;
    currentPassword?: string;
    newPassword?: string;
  }) =>
    cmsFetchJson<CmsUser>("/cms/auth/me", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  listContent: (params?: { page?: string; section?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", params.page);
    if (params?.section) q.set("section", params.section);
    const s = q.toString();
    return cmsFetchJson<{ blocks: ContentBlockRow[] }>(
      `/cms/content${s ? `?${s}` : ""}`,
    );
  },

  updateContent: (key: string, body: Partial<Pick<ContentBlockRow, "value" | "type" | "page" | "section" | "label">>) =>
    cmsFetchJson<{ block: ContentBlockRow }>(`/cms/content/${encodeURIComponent(key)}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  bulkUpdateContent: (
    updates: Array<{
      key: string;
      patch: Partial<Pick<ContentBlockRow, "value" | "type" | "page" | "section" | "label">>;
    }>,
  ) =>
    cmsFetchJson<{ blocks: ContentBlockRow[] }>(`/cms/content/bulk`, {
      method: "PUT",
      body: JSON.stringify({ updates }),
    }),

  createContent: (body: {
    key: string;
    value: string;
    type: ContentBlockRow["type"];
    page: string;
    section: string;
    label: string;
  }) =>
    cmsFetchJson<{ block: ContentBlockRow }>("/cms/content", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  deleteContent: (key: string) =>
    cmsFetchJson<{ deleted: boolean }>(
      `/cms/content/${encodeURIComponent(key)}`,
      { method: "DELETE" },
    ),

  listPages: () => cmsFetchJson<{ pages: CmsPageRow[] }>("/cms/pages"),

  createPage: (body: {
    slug: string;
    title: string;
    metaDescription?: string;
    sectionsConfig?: CmsPageRow["sectionsConfig"];
    isPublished?: boolean;
  }) =>
    cmsFetchJson<{ page: CmsPageRow }>("/cms/pages", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updatePage: (
    id: string,
    body: Partial<{
      slug: string;
      title: string;
      metaDescription: string;
      sectionsConfig: CmsPageRow["sectionsConfig"];
      isPublished: boolean;
    }>,
  ) =>
    cmsFetchJson<{ page: CmsPageRow }>(`/cms/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deletePage: (id: string) =>
    cmsFetchJson<{ deleted: boolean }>(`/cms/pages/${id}`, { method: "DELETE" }),

  listMedia: () => cmsFetchJson<{ media: CmsMediaRow[] }>("/cms/media"),

  uploadMedia: (file: File) =>
    cmsUploadFile("/cms/media/upload", file) as Promise<{ media: CmsMediaRow }>,

  deleteMedia: (id: string) =>
    cmsFetchJson<{ deleted: boolean }>(`/cms/media/${id}`, { method: "DELETE" }),

  listUsers: () =>
    cmsFetchJson<{ users: CmsUser[] }>("/cms/users"),

  createUser: (body: {
    name: string;
    email: string;
    password: string;
    role?: CmsRole;
  }) =>
    cmsFetchJson<{ user: CmsUser }>("/cms/users", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateUser: (
    id: string,
    body: Partial<{ name: string; role: CmsRole; isActive: boolean }>,
  ) =>
    cmsFetchJson<{ user: CmsUser }>(`/cms/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteUser: (id: string) =>
    cmsFetchJson<{ deleted: boolean }>(`/cms/users/${id}`, { method: "DELETE" }),

  listAudit: (params: {
    page?: number;
    pageSize?: number;
    userId?: string;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", String(params.page));
    if (params.pageSize) q.set("pageSize", String(params.pageSize));
    if (params.userId) q.set("userId", params.userId);
    if (params.action) q.set("action", params.action);
    if (params.dateFrom) q.set("dateFrom", params.dateFrom);
    if (params.dateTo) q.set("dateTo", params.dateTo);
    return cmsFetchJson<{
      items: AuditItem[];
      total: number;
      page: number;
      pageSize: number;
    }>(`/cms/audit?${q.toString()}`);
  },
};
