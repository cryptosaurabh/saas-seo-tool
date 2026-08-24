import { useTenantStore } from "@/store/tenant-store";

export function useTenant() {
  const { activeOrg, organizations, activeWorkspace, workspaces, setActiveOrg, setActiveWorkspace } = useTenantStore();

  return {
    activeOrg,
    organizations,
    activeWorkspace,
    workspaces,
    switchOrganization: setActiveOrg,
    switchWorkspace: setActiveWorkspace
  };
}
