# SEOPilot AI - Docker Architecture & CLI Reference

This project utilizes multi-stage Docker builds and Docker Compose for development and production orchestration.

---

## Service Architecture

- **`frontend`**: Next.js 14 App Router (Node.js 20 runner).
- **`backend`**: FastAPI Python 3.11 web app with Uvicorn workers.
- **`celery_worker`**: Celery async worker process handling crawl jobs and background tasks.
- **`celery_beat`**: Celery periodic task scheduler.
- **`postgres`**: PostgreSQL 16 relational database.
- **`redis`**: Redis 7 cache and Celery message broker.
- **`nginx`**: Nginx 1.25 reverse proxy & SSL termination.
- **`prometheus`**: Prometheus metric aggregator.

---

## Common Docker CLI Commands

### Development
```bash
# Start dev services
docker compose up -d

# View live container logs
docker compose logs -f backend

# Stop dev stack
docker compose down
```

### Production
```bash
# Build and start production containers
docker compose -f docker-compose.prod.yml up -d --build

# Inspect health check statuses
docker compose -f docker-compose.prod.yml ps

# Execute database backup in postgres container
docker compose -f docker-compose.prod.yml exec postgres /etc/periodic/daily/backup_db
```
