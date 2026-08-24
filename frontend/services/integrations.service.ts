import { apiClient } from "@/lib/api";

export const integrationsService = {
  async getStatus() {
    return apiClient.get("/integrations/status");
  },

  async getGSCPerformance(siteUrl?: string) {
    return apiClient.get("/integrations/gsc/performance", { params: { site_url: siteUrl } });
  },

  async getGA4Traffic(propertyId?: string) {
    return apiClient.get("/integrations/ga4/traffic", { params: { property_id: propertyId } });
  },

  async runPageSpeed(url: string, device: string = "desktop") {
    return apiClient.post("/integrations/pagespeed/run", { url, device });
  },

  async submitInstantIndexing(url: string, action: string = "URL_UPDATED") {
    return apiClient.post("/integrations/indexing/submit", { url, action });
  },

  async triggerSync(serviceName: string = "all") {
    return apiClient.post("/integrations/sync", null, { params: { service_name: serviceName } });
  }
};
