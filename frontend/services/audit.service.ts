import { apiClient } from "@/lib/api";

export interface CrawlStartConfig {
  target_url: string;
  max_pages?: number;
  max_depth?: number;
  crawl_speed?: string;
  user_agent_type?: string;
}

export const auditService = {
  async startCrawl(config: CrawlStartConfig) {
    return apiClient.post("/audit/crawl/start", config);
  },

  async getCrawlStatus(jobId: string) {
    return apiClient.get(`/audit/crawl/${jobId}/status`);
  },

  async pauseCrawl(jobId: string) {
    return apiClient.post(`/audit/crawl/${jobId}/pause`);
  },

  async cancelCrawl(jobId: string) {
    return apiClient.post(`/audit/crawl/${jobId}/cancel`);
  },

  async getLatestReport() {
    return apiClient.get("/audit/reports/latest");
  },

  async getReportIssues(reportId: string, severity?: string, category?: string) {
    return apiClient.get(`/audit/reports/${reportId}/issues`, {
      params: { severity, category }
    });
  },

  async getPageDetails(pageId: string) {
    return apiClient.get(`/audit/pages/${pageId}`);
  }
};
