import { apiClient } from "@/lib/api";

export interface ArticleGeneratePayload {
  primary_keyword: string;
  secondary_keywords?: string[];
  article_type?: string;
  writing_tone?: string;
  target_word_count?: number;
}

export const contentService = {
  async generateArticle(payload: ArticleGeneratePayload) {
    return apiClient.post("/content/generate", payload);
  },

  async optimizeContent(title: string, contentMarkdown: string, authorName?: string) {
    return apiClient.post("/content/optimize", {
      title,
      content_markdown: contentMarkdown,
      author_name: authorName
    });
  },

  async rewriteContent(text: string, mode: string = "improve_seo") {
    return apiClient.post("/content/rewrite", { text, mode });
  },

  async getArticles() {
    return apiClient.get("/content/articles");
  },

  async getContentCalendar() {
    return apiClient.get("/content/calendar");
  }
};
