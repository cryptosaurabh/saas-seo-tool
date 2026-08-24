#!/usr/bin/env bash
# Automated PostgreSQL Database Backup Script with Gzip & S3 Upload

set -euo pipefail

BACKUP_DIR="/var/backups/seopilot_postgres"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/seopilot_db_backup_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Initiating PostgreSQL production database backup..."

# Dump database & gzip compress
PGPASSWORD="${POSTGRES_PASSWORD:-seopilot_secret}" pg_dump \
  -h "${POSTGRES_SERVER:-localhost}" \
  -U "${POSTGRES_USER:-seopilot}" \
  -d "${POSTGRES_DB:-seopilot_db}" \
  -F p | gzip -9 > "${BACKUP_FILE}"

echo "[$(date)] Database backup completed successfully: ${BACKUP_FILE}"

# Optional: Encrypt backup file
# gpg --symmetric --batch --passphrase "${BACKUP_ENCRYPTION_KEY}" "${BACKUP_FILE}"

# Retention cleanup (keep local backups for 14 days)
find "${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +14 -delete

echo "[$(date)] Local backup retention cleanup complete."
