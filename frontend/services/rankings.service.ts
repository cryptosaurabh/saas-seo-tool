import { apiClient } from "@/lib/api";

export interface TrackKeywordPayload {
  keyword_text: string;
  target_url: string;
  country_code?: string;
  search_engine?: string;
  device?: string;
}

export const rankingsService = {
  async trackKeyword(payload: TrackKeywordPayload) {
    return apiClient.post("/rankings/track", payload);
  },

  async getOverview() {
    return apiClient.get("/rankings/overview");
  },

  async getTrackedKeywords() {
    return apiClient.get("/rankings/keywords");
  },

  async getCompetitors() {
    return apiClient.get("/rankings/competitors");
  },

  async getAlerts() {
    return apiClient.get("/rankings/alerts");
  }
};
