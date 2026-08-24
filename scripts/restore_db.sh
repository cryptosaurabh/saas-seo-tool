#!/usr/bin/env bash
# PostgreSQL Database Recovery Script for Point-In-Time Restoration

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 /path/to/backup_file.sql.gz"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "Error: Backup file '${BACKUP_FILE}' does not exist!"
  exit 1
fi

echo "=========================================================="
echo "WARNING: About to restore PostgreSQL database from backup:"
echo "File: ${BACKUP_FILE}"
echo "Target DB: ${POSTGRES_DB:-seopilot_db}"
echo "=========================================================="

echo "Restoring database in 5 seconds... Press Ctrl+C to cancel."
sleep 5

echo "[$(date)] Restoring database..."
gunzip -c "${BACKUP_FILE}" | PGPASSWORD="${POSTGRES_PASSWORD:-seopilot_secret}" psql \
  -h "${POSTGRES_SERVER:-localhost}" \
  -U "${POSTGRES_USER:-seopilot}" \
  -d "${POSTGRES_DB:-seopilot_db}"

echo "[$(date)] Database restoration finished successfully!"
