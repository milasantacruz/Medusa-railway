import { loadEnv } from '@medusajs/framework/utils'

import { assertValue, safeEnv } from '../utils/assert-value'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export const IS_DEV = process.env.NODE_ENV === 'development'

export const BACKEND_URL = safeEnv('BACKEND_PUBLIC_URL', safeEnv('RAILWAY_PUBLIC_DOMAIN_VALUE', 'http://localhost:9000'))

export const DATABASE_URL = safeEnv('DATABASE_URL')
export const REDIS_URL = safeEnv('REDIS_URL')

export const ADMIN_CORS = safeEnv('ADMIN_CORS', '*')
export const AUTH_CORS = safeEnv('AUTH_CORS', '*')
export const STORE_CORS = safeEnv('STORE_CORS', '*')

export const JWT_SECRET = safeEnv('JWT_SECRET')
export const COOKIE_SECRET = safeEnv('COOKIE_SECRET')

export const MINIO_ENDPOINT = safeEnv('MINIO_ENDPOINT')
export const MINIO_ACCESS_KEY = safeEnv('MINIO_ACCESS_KEY')
export const MINIO_SECRET_KEY = safeEnv('MINIO_SECRET_KEY')
export const MINIO_BUCKET = safeEnv('MINIO_BUCKET')

export const RESEND_API_KEY = safeEnv('RESEND_API_KEY')
export const RESEND_FROM_EMAIL = safeEnv('RESEND_FROM_EMAIL', safeEnv('RESEND_FROM'))

export const SENDGRID_API_KEY = safeEnv('SENDGRID_API_KEY')
export const SENDGRID_FROM_EMAIL = safeEnv('SENDGRID_FROM_EMAIL', safeEnv('SENDGRID_FROM'))

export const STRIPE_API_KEY = safeEnv('STRIPE_API_KEY')
export const STRIPE_WEBHOOK_SECRET = safeEnv('STRIPE_WEBHOOK_SECRET')

export const MEILISEARCH_HOST = safeEnv('MEILISEARCH_HOST')
export const MEILISEARCH_ADMIN_KEY = safeEnv('MEILISEARCH_ADMIN_KEY')

export const WORKER_MODE = (process.env.MEDUSA_WORKER_MODE as 'worker' | 'server' | 'shared' | undefined) ?? 'shared'
export const SHOULD_DISABLE_ADMIN = process.env.MEDUSA_DISABLE_ADMIN === 'true'