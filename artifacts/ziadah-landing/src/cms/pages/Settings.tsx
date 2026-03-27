import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CmsApiError, cmsApi } from "../api";
import { useCmsAuth } from "../CmsAuthContext";

export default function CmsSettingsPage() {
  const { user, refreshUser } = useCmsAuth();
  const canEditProfile =
    user?.role === "editor" || user?.role === "super_admin";

  const [name, setName] = useState(user?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const mut = useMutation({
    mutationFn: () =>
      cmsApi.patchMe({
        name: name !== user?.name ? name : undefined,
        ...(newPassword
          ? { currentPassword, newPassword }
          : {}),
      }),
    onSuccess: () => {
      toast.success("Profile updated");
      setCurrentPassword("");
      setNewPassword("");
      void refreshUser();
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Update failed"),
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-md space-y-8" dir="ltr">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Update your profile and password.
        </p>
      </div>

      {!canEditProfile && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Viewer accounts are read-only. Ask a super admin to change your role
          if you need to edit your profile.
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="st-name">Display name</Label>
          <Input
            id="st-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!canEditProfile}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
      </div>

      {canEditProfile && (
        <div className="space-y-4 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="font-medium">Change password</h2>
          <div className="space-y-2">
            <Label htmlFor="st-cur">Current password</Label>
            <Input
              id="st-cur"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="st-new">New password</Label>
            <Input
              id="st-new"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      )}

      {canEditProfile && (
        <Button
          type="button"
          disabled={mut.isPending}
          onClick={() => {
            if (newPassword && newPassword.length < 8) {
              toast.error("New password must be at least 8 characters");
              return;
            }
            mut.mutate();
          }}
        >
          Save changes
        </Button>
      )}
    </div>
  );
}
