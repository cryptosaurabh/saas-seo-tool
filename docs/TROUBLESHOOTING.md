# SEOPilot AI - Operations & Troubleshooting Guide

This guide covers incident response, log inspection, rollback procedures, and common error resolution.

---

## 1. Checking System Health

Probing deep readiness endpoint:
```bash
curl -i http://localhost:8000/api/v1/health/readiness
```

Expected Output:
```json
{
  "status": "ready",
  "components": {
    "database": "connected",
    "redis": "connected",
    "celery": "active",
    "storage": "writable"
  }
}
```

---

## 2. Emergency Production Rollback

If a bad deployment occurs:

```bash
# 1. Rollback Git commit to last known stable release
git checkout main
git reset --hard STABLE_COMMIT_HASH

# 2. Re-deploy container stack
docker compose -f docker-compose.prod.yml up -d --build

# 3. If database restoration is required:
./scripts/restore_db.sh /var/backups/seopilot_postgres/seopilot_db_backup_LAST_STABLE.sql.gz
```

---

## 3. Common Issues & Solutions

### Redis Connection Error in Celery Workers
- **Symptom**: `redis.exceptions.ConnectionError: Error 111 connecting to redis:6379`.
- **Solution**: Ensure Redis container is running and healthy: `docker compose -f docker-compose.prod.yml restart redis`.

### PostgreSQL Disk Full Alert
- **Symptom**: `FATAL: could not write to file "base/16384/...": No space left on device`.
- **Solution**: Clear old logs and run PostgreSQL vacuum: `docker compose exec postgres vacuumdb -U seopilot --all --analyze`.
