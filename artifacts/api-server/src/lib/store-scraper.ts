import { logger } from "./logger";

export interface ScrapedProduct {
  externalId: string;
  title: string;
  description: string | null;
  price: number | null;
  compareAtPrice: number | null;
  imageUrl: string | null;
  productUrl: string | null;
  category: string | null;
  tags: string | null;
  inStock: boolean;
}

export interface ScrapeResult {
  products: ScrapedProduct[];
  platform: string;
  currency: string;
  currencySymbol: string;
}

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; Ziadah-Engine/1.0; +https://ziadah.com)",
  "Accept-Language": "ar,en;q=0.9",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

const FETCH_TIMEOUT = 20000;

function normalizeBaseUrl(url: string): string {
  const parsed = new URL(url);
  return `${parsed.protocol}//${parsed.host}`;
}

/** Extract all JSON-LD blocks from an HTML page */
function extractJsonLd(html: string): unknown[] {
  const results: unknown[] = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (Array.isArray(parsed)) {
        results.push(...parsed);
      } else if (parsed && typeof parsed === "object") {
        // Handle @graph
        if ("@graph" in parsed && Array.isArray((parsed as Record<string, unknown>)["@graph"])) {
          results.push(...(parsed as Record<string, unknown>)["@graph"] as unknown[]);
        } else {
          results.push(parsed);
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  }
  return results;
}

/** Extract a Product schema from an array of JSON-LD objects */
function findProductSchema(items: unknown[]): Record<string, unknown> | null {
  for (const item of items) {
    if (item && typeof item === "object") {
      const obj = item as Record<string, unknown>;
      const type = String(obj["@type"] ?? "").toLowerCase();
      if (type === "product") return obj;
    }
  }
  return null;
}

/** Parse a JSON-LD Product schema into a ScrapedProduct */
function parseProductSchema(
  schema: Record<string, unknown>,
  productUrl: string,
  fallbackId?: string
): ScrapedProduct {
  const offers = schema.offers as Record<string, unknown> | undefined;
  const rawPrice = offers?.price ?? offers?.lowPrice;
  const price = rawPrice !== undefined ? parseFloat(String(rawPrice)) : null;

  const rawCompare = schema.offers ? (schema.offers as Record<string, unknown>).highPrice : null;
  const compareAtPrice = rawCompare ? parseFloat(String(rawCompare)) : null;

  const images = schema.image;
  let imageUrl: string | null = null;
  if (typeof images === "string") imageUrl = images;
  else if (Array.isArray(images) && images.length > 0) imageUrl = String(images[0]);

  const description = typeof schema.description === "string"
    ? schema.description.replace(/<[^>]*>/g, "").trim() || null
    : null;

  const category = typeof schema.category === "string" ? schema.category.split(">")[0].trim() : null;

  const inStock =
    typeof offers?.availability === "string"
      ? offers.availability.includes("InStock") || offers.availability.includes("InStoreOnly")
      : true;

  const externalId =
    typeof schema.sku === "string" && schema.sku
      ? schema.sku
      : typeof schema.mpn === "string" && schema.mpn
      ? schema.mpn
      : fallbackId ?? productUrl;

  return {
    externalId,
    title: typeof schema.name === "string" ? schema.name : "Unnamed Product",
    description,
    price: price !== null && !isNaN(price) ? price : null,
    compareAtPrice: compareAtPrice !== null && !isNaN(compareAtPrice) ? compareAtPrice : null,
    imageUrl,
    productUrl,
    category,
    tags: null,
    inStock,
  };
}

// ─── Platform Detection ───────────────────────────────────────────────────────

async function fetchHomepage(storeUrl: string): Promise<string> {
  const res = await fetch(storeUrl, {
    headers: HEADERS,
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Homepage returned ${res.status}`);
  return res.text();
}

function detectPlatformFromHtml(html: string, url: string): string {
  if (html.includes("media.zid.store") || html.includes("assets.zid.store") || html.includes("static.zid.store")) {
    return "zid";
  }
  if (html.includes("cdn.salla.network") || html.includes("cdn.assets.salla.network") || html.includes("assets.salla.sa")) {
    return "salla";
  }
  if (html.includes("myshopify.com") || html.includes("Shopify.theme") || html.includes("cdn.shopify.com")) {
    return "shopify";
  }
  if (url.includes("myshopify.com")) return "shopify";
  return "generic";
}

// ─── Shopify ──────────────────────────────────────────────────────────────────

async function fetchShopifyProducts(baseUrl: string): Promise<ScrapedProduct[]> {
  const cleanUrl = baseUrl.replace(/\/$/, "");
  const apiUrl = `${cleanUrl}/products.json?limit=250`;

  const response = await fetch(apiUrl, {
    headers: { "Accept": "application/json", "User-Agent": HEADERS["User-Agent"] },
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) throw new Error(`Shopify API returned ${response.status}`);

  const data = await response.json() as { products?: unknown[] };
  const rawProducts = data.products ?? [];

  return rawProducts.map((p: unknown) => {
    const product = p as Record<string, unknown>;
    const variants = (product.variants as Record<string, unknown>[])?.[0] ?? {};
    const images = (product.images as Record<string, unknown>[]) ?? [];
    const image = images[0] as Record<string, unknown> | undefined;
    const price = variants.price ? parseFloat(String(variants.price)) : null;
    const compareAtPrice = variants.compare_at_price ? parseFloat(String(variants.compare_at_price)) : null;
    const tags = Array.isArray(product.tags)
      ? (product.tags as string[]).join(", ")
      : typeof product.tags === "string" ? product.tags : null;
    const productType = typeof product.product_type === "string" ? product.product_type || null : null;
    const handle = typeof product.handle === "string" ? product.handle : String(product.id ?? "");

    return {
      externalId: String(product.id ?? ""),
      title: String(product.title ?? ""),
      description: typeof product.body_html === "string"
        ? product.body_html.replace(/<[^>]*>/g, "").trim() || null : null,
      price,
      compareAtPrice,
      imageUrl: image?.src ? String(image.src) : null,
      productUrl: `${cleanUrl}/products/${handle}`,
      category: productType,
      tags,
      inStock: variants.available !== false,
    };
  });
}

// ─── Zid ─────────────────────────────────────────────────────────────────────

interface ZidProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  short_description: string | null;
  images: { image: { large: string } }[];
  html_url: string | null;
  categories: { name: string }[];
  keywords: string[];
  in_stock: boolean;
  currency?: string;
  currency_symbol?: string;
}

interface ZidProductsResponse {
  results: ZidProduct[];
  count: number;
  next: string | null;
}

function mapZidProduct(p: ZidProduct, baseUrl: string): ScrapedProduct {
  // sale_price is the discounted price; price is the original
  const hasDiscount = p.sale_price > 0 && p.sale_price < p.price;
  const currentPrice = hasDiscount ? p.sale_price : p.price;
  const compareAtPrice = hasDiscount ? p.price : null;

  const imageUrl = p.images?.[0]?.image?.large ?? null;

  const description = p.short_description
    ? p.short_description.replace(/<[^>]*>/g, "").trim() || null
    : null;

  // Use the first non-generic category name
  const skipCategories = new Set(["جميع المنتجات", "All Products", "all-products"]);
  const category = p.categories?.find((c) => !skipCategories.has(c.name) && !skipCategories.has(c.name))?.name ?? null;

  const tags = Array.isArray(p.keywords) && p.keywords.length > 0
    ? p.keywords.join(", ")
    : null;

  const productUrl = p.html_url ?? `${baseUrl}/products/${p.slug}`;

  return {
    externalId: p.id || p.sku,
    title: p.name,
    description,
    price: currentPrice > 0 ? currentPrice : null,
    compareAtPrice,
    imageUrl,
    productUrl,
    category,
    tags,
    inStock: p.in_stock !== false,
  };
}

// Zid API v1 has two response shapes depending on store version.
// Shape A (newer): { results: ZidProduct[], count: number, next: string|null }
// Shape B (legacy): { status: "success", data: { products: { data: ZidProduct[], total: number, last_page: number, next_page_url: string|null } } }

function extractZidPage(raw: any): { items: ZidProduct[]; total: number; hasMore: boolean } {
  if (Array.isArray(raw?.results)) {
    // Shape A
    return {
      items: raw.results as ZidProduct[],
      total: raw.count ?? raw.results.length,
      hasMore: !!raw.next,
    };
  }
  if (raw?.data?.products?.data) {
    // Shape B
    const pg = raw.data.products;
    return {
      items: pg.data as ZidProduct[],
      total: pg.total ?? pg.data.length,
      hasMore: !!pg.next_page_url && pg.current_page < pg.last_page,
    };
  }
  return { items: [], total: 0, hasMore: false };
}

function normalizeZidNextUrl(next: string | null | undefined): string | null {
  if (!next || typeof next !== "string") return null;
  let u = next.trim();
  if (u.startsWith("http://")) u = `https://${u.slice("http://".length)}`;
  return u;
}

/** Shape A: `next` on root. Shape B: `data.products.next_page_url`. */
function zidNextPageUrl(raw: Record<string, unknown>): string | null {
  const top = raw.next;
  if (typeof top === "string" && top.length > 0) return normalizeZidNextUrl(top);
  const data = raw.data as Record<string, unknown> | undefined;
  const prods = data?.products as Record<string, unknown> | undefined;
  const legacy = prods?.next_page_url;
  if (typeof legacy === "string" && legacy.length > 0) return normalizeZidNextUrl(legacy);
  return null;
}

async function fetchZidProducts(baseUrl: string): Promise<{ products: ScrapedProduct[]; currency: string; currencySymbol: string }> {
  const cleanUrl = baseUrl.replace(/\/$/, "");
  const products: ScrapedProduct[] = [];
  const PAGE_SIZE = 100;
  let currency = "SAR";
  let currencySymbol = "ر.س";
  let pageNum = 0;

  /** Zid returns absolute `next` URLs (often api.zid.sa) — must follow them; constructing ?page=2 on the storefront domain can 404. */
  let nextUrl: string | null = `${cleanUrl}/api/v1/products?page=1&page_size=${PAGE_SIZE}`;

  while (nextUrl) {
    pageNum++;
    const res = await fetch(nextUrl, {
      headers: { ...HEADERS, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!res.ok) throw new Error(`Zid API returned ${res.status} at ${nextUrl}`);

    const raw = (await res.json()) as Record<string, unknown>;
    const { items, total } = extractZidPage(raw);

    if (items.length === 0) break;

    if (pageNum === 1 && items[0]) {
      currency = items[0].currency ?? "SAR";
      currencySymbol = items[0].currency_symbol?.trim() ?? "ر.س";
    }

    for (const p of items) {
      products.push(mapZidProduct(p, cleanUrl));
    }

    logger.info({ page: pageNum, fetched: items.length, total, baseUrl }, "Zid: fetched page");

    if (products.length >= total || products.length >= 500) break;

    const fromApi = zidNextPageUrl(raw);
    if (fromApi) {
      nextUrl = fromApi;
    } else if (products.length < total) {
      nextUrl = `${cleanUrl}/api/v1/products?page=${pageNum + 1}&page_size=${PAGE_SIZE}`;
    } else {
      nextUrl = null;
    }
  }

  if (products.length === 0) {
    throw new Error("No products returned from Zid API");
  }

  return { products, currency, currencySymbol };
}

// ─── Salla ────────────────────────────────────────────────────────────────────

function extractSallaProductIds(html: string): number[] {
  const ids = new Set<number>();

  // Extract from source-value="[id1,id2,...]" attributes on salla-products-slider / salla-products-list
  const sourceValueRegex = /source-value="(\[[^\]]+\])"/g;
  let match: RegExpExecArray | null;
  while ((match = sourceValueRegex.exec(html)) !== null) {
    try {
      const arr = JSON.parse(match[1]);
      if (Array.isArray(arr)) {
        for (const id of arr) {
          if (typeof id === "number" && id > 0) ids.add(id);
        }
      }
    } catch {
      // ignore
    }
  }

  // Also extract from data-id attributes on product cards
  const dataIdRegex = /data-id="(\d+)"/g;
  while ((match = dataIdRegex.exec(html)) !== null) {
    const id = parseInt(match[1], 10);
    if (id > 0) ids.add(id);
  }

  // Extract from href patterns like /p123456789 or /products/123456789
  const hrefRegex = /\/p(\d{8,})|\/products\/(\d{8,})/g;
  while ((match = hrefRegex.exec(html)) !== null) {
    const id = parseInt(match[1] ?? match[2], 10);
    if (id > 0) ids.add(id);
  }

  return Array.from(ids);
}

async function fetchSallaProducts(baseUrl: string, homepageHtml: string): Promise<ScrapedProduct[]> {
  const cleanBase = baseUrl.replace(/\/$/, "");

  // Extract product IDs from homepage
  let productIds = extractSallaProductIds(homepageHtml);

  // If homepage didn't yield enough, try the root domain homepage
  if (productIds.length < 3) {
    try {
      const rootHtml = await (await fetch(cleanBase + "/", { headers: HEADERS, signal: AbortSignal.timeout(FETCH_TIMEOUT) })).text();
      productIds = extractSallaProductIds(rootHtml);
    } catch { /* ignore */ }
  }

  if (productIds.length === 0) {
    throw new Error("Could not find Salla product IDs on the store homepage");
  }

  logger.info({ count: productIds.length, baseUrl }, "Salla: found product IDs");

  // Fetch up to 50 products (batches of 5)
  const limit = Math.min(productIds.length, 50);
  const products: ScrapedProduct[] = [];
  const BATCH_SIZE = 5;

  for (let i = 0; i < limit; i += BATCH_SIZE) {
    const batch = productIds.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async (id) => {
        // Salla redirect URL resolves to actual product page
        const redirectUrl = `${cleanBase}/ar/redirect/products/${id}`;
        const res = await fetch(redirectUrl, {
          headers: HEADERS,
          signal: AbortSignal.timeout(FETCH_TIMEOUT),
          redirect: "follow",
        });
        if (!res.ok) throw new Error(`Salla product ${id} returned ${res.status}`);
        const finalUrl = res.url;
        const html = await res.text();
        const jsonLdItems = extractJsonLd(html);
        const schema = findProductSchema(jsonLdItems);
        if (!schema) throw new Error(`No Product schema at ${finalUrl}`);
        return parseProductSchema(schema, finalUrl, String(id));
      })
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        products.push(result.value);
      }
    }

    if (i + BATCH_SIZE < limit) {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  return products;
}

// ─── Main Scraper ─────────────────────────────────────────────────────────────

export async function scrapeStore(storeUrl: string): Promise<ScrapeResult> {
  // Normalize URL and fetch homepage for platform detection
  let cleanUrl = storeUrl.trim();
  if (!cleanUrl.startsWith("http")) cleanUrl = `https://${cleanUrl}`;

  // Strip language path suffixes (e.g. /ar, /en) for base URL detection
  const parsed = new URL(cleanUrl);
  const baseUrl = `${parsed.protocol}//${parsed.host}`;

  logger.info({ storeUrl, baseUrl }, "Scraping store — fetching homepage");

  let homepageHtml: string;
  try {
    homepageHtml = await fetchHomepage(cleanUrl);
  } catch (err) {
    // Try with base URL if the given URL failed
    if (cleanUrl !== baseUrl) {
      homepageHtml = await fetchHomepage(baseUrl);
    } else {
      throw err;
    }
  }

  const platform = detectPlatformFromHtml(homepageHtml, cleanUrl);
  logger.info({ platform, storeUrl }, "Detected platform");

  let products: ScrapedProduct[];
  let currency = "SAR";
  let currencySymbol = "ر.س";

  if (platform === "shopify") {
    try {
      products = await fetchShopifyProducts(baseUrl);
    } catch {
      products = await fetchShopifyProducts(cleanUrl.replace(/\/products\.json.*/, ""));
    }
  } else if (platform === "zid") {
    const result = await fetchZidProducts(baseUrl);
    products = result.products;
    currency = result.currency;
    currencySymbol = result.currencySymbol;
  } else if (platform === "salla") {
    products = await fetchSallaProducts(baseUrl, homepageHtml);
  } else {
    // Generic: try Shopify products.json first
    try {
      const jsonRes = await fetch(`${baseUrl}/products.json?limit=10`, {
        headers: { "Accept": "application/json", "User-Agent": HEADERS["User-Agent"] },
        signal: AbortSignal.timeout(10000),
      });
      if (jsonRes.ok) {
        const data = await jsonRes.json() as { products?: unknown[] };
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          products = await fetchShopifyProducts(baseUrl);
        } else {
          throw new Error("Not Shopify");
        }
      } else {
        throw new Error("Not Shopify");
      }
    } catch {
      throw new Error(
        "Could not fetch products from this store. The platform is not yet supported (supported: Shopify, Zid, Salla)."
      );
    }
  }

  logger.info({ storeUrl, productCount: products.length, platform }, "Scraped store successfully");
  return { products, platform, currency, currencySymbol };
}
