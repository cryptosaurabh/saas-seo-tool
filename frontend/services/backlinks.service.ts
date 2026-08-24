import { apiClient } from "@/lib/api";

export const backlinksService = {
  async getOverview() {
    return apiClient.get("/backlinks/overview");
  },

  async getBacklinks() {
    return apiClient.get("/backlinks/list");
  },

  async getReferringDomains() {
    return apiClient.get("/backlinks/domains");
  },

  async getBacklinkGap(yourDomain: string, competitorDomain: string) {
    return apiClient.post("/backlinks/gap", null, { params: { your_domain: yourDomain, competitor_domain: competitorDomain } });
  },

  async addDisavow(domainOrUrl: string, isDomainLevel: boolean = true, reason?: string) {
    return apiClient.post("/backlinks/disavow", {
      domain_or_url: domainOrUrl,
      is_domain_level: isDomainLevel,
      reason
    });
  },

  async getOutreachProspects() {
    return apiClient.get("/backlinks/outreach");
  }
};
