import { apiClient } from "@/lib/api";

export interface CreateClientPayload {
  client_name: string;
  company_name: string;
  email: string;
  website_url: string;
  industry?: string;
}

export const agencyService = {
  async getOverview() {
    return apiClient.get("/agency/overview");
  },

  async getClients() {
    return apiClient.get("/agency/clients");
  },

  async createClient(payload: CreateClientPayload) {
    return apiClient.post("/agency/clients", payload);
  },

  async getClientDashboard(clientId: string) {
    return apiClient.get(`/agency/clients/${clientId}/dashboard`);
  },

  async getWhiteLabel() {
    return apiClient.get("/agency/whitelabel");
  },

  async updateWhiteLabel(agencyName: string, primaryColor: string, customDomain?: string) {
    return apiClient.post("/agency/whitelabel", { agency_name: agencyName, primary_color: primaryColor, custom_domain: customDomain });
  },

  async getTeamMembers() {
    return apiClient.get("/agency/team");
  }
};
