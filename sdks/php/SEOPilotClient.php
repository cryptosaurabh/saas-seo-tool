<?php

namespace SEOPilot\SDK;

class SEOPilotClient {
    private string $apiKey;
    private string $baseUrl;

    public function __construct(string $apiKey, string $baseUrl = "https://api.seopilot.ai/api/v1") {
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl, "/");
    }

    public function getAudit(string $auditId): array {
        return $this->request("/audit/" . $auditId);
    }

    private function request(string $endpoint, string $method = "GET", ?array $data = null): array {
        $ch = curl_init($this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . $this->apiKey,
            "Content-Type: application/json"
        ]);
        if ($method === "POST" && $data) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}
