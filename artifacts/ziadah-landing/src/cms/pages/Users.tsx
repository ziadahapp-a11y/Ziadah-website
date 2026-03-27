import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CmsApiError, cmsApi, type CmsRole, type CmsUser } from "../api";
import { useCmsAuth } from "../CmsAuthContext";
import { RoleBadge } from "../components/RoleBadge";

export default function CmsUsersPage() {
  const { user } = useCmsAuth();
  const qc = useQueryClient();
  const isAdmin = user?.role === "super_admin";

  const q = useQuery({
    queryKey: ["cms", "users"],
    queryFn: async () => (await cmsApi.listUsers()).users,
    enabled: isAdmin,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<CmsUser | null>(null);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg" dir="ltr">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Only super administrators can manage users.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6" dir="ltr">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Invite and manage CMS accounts.
          </p>
        </div>
        <Button type="button" onClick={() => setCreateOpen(true)}>
          New user
        </Button>
      </div>

      {q.isPending && <p className="text-sm text-neutral-500">Loading…</p>}
      {q.isError && (
        <p className="text-sm text-red-600">
          {q.error instanceof CmsApiError ? q.error.message : "Failed to load"}
        </p>
      )}

      {q.isSuccess && (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last login</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {q.data.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <RoleBadge role={u.role} />
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {u.lastLogin
                      ? new Date(u.lastLogin).toLocaleString()
                      : "—"}
                  </TableCell>
                  <TableCell>{u.isActive !== false ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditUser(u)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CreateUserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onDone={() => void qc.invalidateQueries({ queryKey: ["cms", "users"] })}
      />
      <EditUserDialog
        user={editUser}
        currentUserId={user?.id}
        onOpenChange={(o) => !o && setEditUser(null)}
        onDone={() => void qc.invalidateQueries({ queryKey: ["cms", "users"] })}
      />
    </div>
  );
}

function CreateUserDialog({
  open,
  onOpenChange,
  onDone,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<CmsRole>("viewer");

  const mut = useMutation({
    mutationFn: () =>
      cmsApi.createUser({ name, email, password, role }),
    onSuccess: () => {
      toast.success("User created");
      onDone();
      onOpenChange(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("viewer");
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New user</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as CmsRole)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="super_admin">Super admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={mut.isPending}
            onClick={() => mut.mutate()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditUserDialog({
  user,
  currentUserId,
  onOpenChange,
  onDone,
}: {
  user: CmsUser | null;
  currentUserId: string | undefined;
  onOpenChange: (o: boolean) => void;
  onDone: () => void;
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState<CmsRole>(user?.role ?? "viewer");
  const [isActive, setIsActive] = useState(user?.isActive !== false);

  const open = user !== null;

  const mut = useMutation({
    mutationFn: () =>
      user
        ? cmsApi.updateUser(user.id, { name, role, isActive })
        : Promise.reject(),
    onSuccess: () => {
      toast.success("User updated");
      onDone();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: () =>
      user ? cmsApi.deleteUser(user.id) : Promise.reject(),
    onSuccess: () => {
      toast.success("User deactivated");
      onDone();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  if (!user) return null;

  const isSelf = user.id === currentUserId;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onOpenChange(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => {
                setName(user.name);
                setRole(user.role);
                setIsActive(user.isActive !== false);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as CmsRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="super_admin">Super admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="u-active"
              checked={isActive}
              onCheckedChange={setIsActive}
              disabled={isSelf}
            />
            <Label htmlFor="u-active">Active</Label>
          </div>
        </div>
        <DialogFooter className="gap-2">
          {!isSelf && (
            <Button
              type="button"
              variant="destructive"
              disabled={deleteMut.isPending}
              onClick={() => {
                if (window.confirm("Deactivate this user?")) {
                  deleteMut.mutate();
                }
              }}
            >
              Deactivate
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={mut.isPending}
            onClick={() => mut.mutate()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
