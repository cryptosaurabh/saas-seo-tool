# SEOPilot AI - Environment Variables Reference

| Variable Name | Description | Default / Example | Required in Prod |
| :--- | :--- | :--- | :--- |
| `ENVIRONMENT` | Execution mode (`development`, `staging`, `production`) | `production` | **Yes** |
| `POSTGRES_SERVER` | Database host hostname | `postgres` / `localhost` | **Yes** |
| `POSTGRES_USER` | PostgreSQL user account | `seopilot_prod` | **Yes** |
| `POSTGRES_PASSWORD` | PostgreSQL secret password | `CHANGEME_STRONG_PASS` | **Yes** |
| `POSTGRES_DB` | PostgreSQL database name | `seopilot_production` | **Yes** |
| `POSTGRES_PORT` | PostgreSQL port | `5432` | No |
| `SECRET_KEY` | JWT signing secret (min 32 bytes) | `CHANGEME_JWT_KEY` | **Yes** |
| `REDIS_HOST` | Redis broker host | `redis` / `localhost` | **Yes** |
| `REDIS_PORT` | Redis server port | `6379` | No |
| `STRIPE_API_KEY` | Stripe secret live key | `sk_live_...` | Optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` | Optional |
| `RAZORPAY_KEY_ID` | Razorpay public key ID | `rzp_live_...` | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay private secret | `rzp_live_sec_...` | Optional |
| `STORAGE_PROVIDER` | Asset storage backend (`s3`, `r2`, `minio`) | `s3` | No |
| `NEXT_PUBLIC_API_URL` | Public API URL endpoint for Next.js | `https://api.seopilot.ai/api/v1` | **Yes** |
