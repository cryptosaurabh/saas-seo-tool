export interface SEOPilotClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export class SEOPilotClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SEOPilotClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.seopilot.ai/api/v1";
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`SEOPilot API Error [${res.status}]: ${res.statusText}`);
    }
    return res.json();
  }

  public async getAudit(auditId: string) {
    return this.request(`/audit/${auditId}`);
  }

  public async getRankings() {
    return this.request(`/rankings`);
  }

  public async triggerCrawl(websiteUrl: string) {
    return this.request(`/audit/crawl`, {
      method: "POST",
      body: JSON.stringify({ url: websiteUrl })
    });
  }
}
