package seopilot

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Client struct {
	APIKey  string
	BaseURL string
}

func NewClient(apiKey string) *Client {
	return &Client{
		APIKey:  apiKey,
		BaseURL: "https://api.seopilot.ai/api/v1",
	}
}

func (c *Client) GetAudit(auditID string) (map[string]interface{}, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/audit/%s", c.BaseURL, auditID), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.APIKey))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	return result, nil
}
