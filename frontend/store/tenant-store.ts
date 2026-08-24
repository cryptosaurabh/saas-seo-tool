import { create } from "zustand";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan_tier: string;
  is_owner: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface TenantState {
  activeOrg: Organization | null;
  organizations: Organization[];
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];
  setActiveOrg: (org: Organization) => void;
  setOrganizations: (orgs: Organization[]) => void;
  setActiveWorkspace: (ws: Workspace | null) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  activeOrg: null,
  organizations: [],
  activeWorkspace: null,
  workspaces: [],
  setActiveOrg: (org) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sp_active_org_id", org.id);
    }
    set({ activeOrg: org });
  },
  setOrganizations: (orgs) => set({ organizations: orgs }),
  setActiveWorkspace: (ws) => set({ activeWorkspace: ws }),
  setWorkspaces: (workspaces) => set({ workspaces }),
}));
