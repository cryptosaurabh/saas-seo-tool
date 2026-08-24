import { apiClient } from "@/lib/api";

export const orgService = {
  async getOrganizations() {
    return apiClient.get("/organizations");
  },

  async createOrganization(name: string) {
    return apiClient.post("/organizations", { name });
  },

  async getWorkspaces() {
    return apiClient.get("/organizations/workspaces");
  },

  async createWorkspace(name: string, description?: string) {
    return apiClient.post("/organizations/workspaces", { name, description });
  },

  async getProjects(workspaceId?: string) {
    return apiClient.get("/organizations/projects", { params: { workspace_id: workspaceId } });
  },

  async createProject(workspaceId: string, name: string, targetDomain: string) {
    return apiClient.post("/organizations/projects", {
      workspace_id: workspaceId,
      name,
      target_domain: targetDomain
    });
  }
};

export const billingService = {
  async getPlans() {
    return apiClient.get("/billing/plans");
  },

  async getSubscription() {
    return apiClient.get("/billing/subscription");
  },

  async createCheckoutSession(planCode: string, billingCycle: string = "monthly") {
    return apiClient.post("/billing/checkout", { plan_code: planCode, billing_cycle: billingCycle });
  },

  async getInvoices() {
    return apiClient.get("/billing/invoices");
  }
};
