import { apiClient } from "@/lib/api";

export const aiAgentService = {
  async sendMessage(message: string, conversationId?: string) {
    return apiClient.post("/ai/chat", { message, conversation_id: conversationId });
  },

  async getRecommendations() {
    return apiClient.get("/ai/recommendations");
  },

  async generateTask(recommendationId: string) {
    return apiClient.post("/ai/tasks/generate", null, { params: { recommendation_id: recommendationId } });
  },

  async getWorkflows() {
    return apiClient.get("/ai/workflows");
  },

  async createWorkflow(name: string, triggerEvent: string, actionSteps: string[]) {
    return apiClient.post("/ai/workflows", { name, trigger_event: triggerEvent, action_steps: actionSteps });
  },

  async getPrompts() {
    return apiClient.get("/ai/prompts");
  }
};
