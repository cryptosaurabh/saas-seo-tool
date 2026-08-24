# SEOPilot AI - Production Deployment Guide

This guide covers enterprise production deployment strategies for **SEOPilot AI** across various cloud providers and infrastructure choices.

---

## 1. Quick Start: Single-Node VPS (DigitalOcean / Hetzner / AWS EC2)

For deploying with Docker Compose on a single Linux server with Nginx and SSL:

```bash
# 1. Clone repository on production server
git clone https://github.com/your-org/seopilot-ai.git /opt/seopilot-ai
cd /opt/seopilot-ai

# 2. Configure production environment secrets
cp .env.production .env
nano .env # Set POSTGRES_PASSWORD, SECRET_KEY, STRIPE_API_KEY, etc.

# 3. Launch container stack in detached mode
docker compose -f docker-compose.prod.yml up -d --build

# 4. Verify service status & health checks
docker compose -f docker-compose.prod.yml ps
curl http://localhost:8000/api/v1/health/readiness
```

---

## 2. Serverless Frontend + Managed API (Vercel + Railway / Render)

### Frontend Deployment on Vercel
1. Connect GitHub repository to Vercel.
2. Set Root Directory to `frontend`.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://api.seopilot.ai/api/v1`
4. Click **Deploy**.

### Backend Deployment on Railway / Render
1. Deploy `backend` subdirectory as a Web Service.
2. Attach managed PostgreSQL and Redis plugins.
3. Configure environment variables matching `.env.production`.
4. Command: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4`

---

## 3. High-Availability AWS Architecture (ECS / EKS + RDS + ElastiCache)

For large-scale enterprise deployments:

- **Frontend**: AWS CloudFront CDN + S3 or AWS Amplify.
- **Backend API**: AWS ECS Fargate or EKS Cluster behind Application Load Balancer (ALB).
- **Database**: AWS RDS PostgreSQL Multi-AZ with Read Replicas enabled.
- **Cache & Celery Queue**: AWS ElastiCache for Redis.
- **Object Storage**: AWS S3 Bucket with CloudFront CDN integration.
