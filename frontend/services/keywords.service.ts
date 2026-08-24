import { apiClient } from "@/lib/api";

export interface KeywordSearchPayload {
  keyword: string;
  country_code?: string;
  language_code?: string;
  search_engine?: string;
}

export const keywordsService = {
  async searchKeyword(payload: KeywordSearchPayload) {
    return apiClient.post("/keywords/search", payload);
  },

  async getSerpAnalysis(keyword: string) {
    return apiClient.get("/keywords/serp", { params: { keyword } });
  },

  async getTopicClusters(keyword: string) {
    return apiClient.post("/keywords/cluster", null, { params: { keyword } });
  },

  async getKeywordGap(yourDomain: string, competitorDomain: string) {
    return apiClient.post("/keywords/gap", {
      your_domain: yourDomain,
      competitor_domain: competitorDomain
    });
  },

  async generateContentBrief(targetKeyword: string) {
    return apiClient.post("/keywords/content-brief", {
      target_keyword: targetKeyword
    });
  }
};
