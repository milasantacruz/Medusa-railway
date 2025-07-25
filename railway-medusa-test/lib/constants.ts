import { loadEnv } from '@medusajs/framework/utils'
import { assertValue } from '../utils/assert-value'

export function getConfig() {
  // Solo cargar env en desarrollo, en producción Railway ya las pone
  if (process.env.NODE_ENV === 'development') {
    loadEnv('development', process.cwd())
  }

  return {
    IS_DEV: process.env.NODE_ENV === 'development',

    BACKEND_URL: process.env.BACKEND_PUBLIC_URL ?? process.env.RAILWAY_PUBLIC_DOMAIN_VALUE ?? 'http://localhost:9000',

    DATABASE_URL: assertValue(process.env.DATABASE_URL, 'Environment variable for DATABASE_URL is not set'),

    REDIS_URL: process.env.REDIS_URL,

    ADMIN_CORS: process.env.ADMIN_CORS || '*',

    AUTH_CORS: process.env.AUTH_CORS || '*',

    STORE_CORS: process.env.STORE_CORS || '*',

    JWT_SECRET: assertValue(process.env.JWT_SECRET, 'Environment variable for JWT_SECRET is not set'),

    COOKIE_SECRET: assertValue(process.env.COOKIE_SECRET, 'Environment variable for COOKIE_SECRET is not set'),

    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MINIO_BUCKET: process.env.MINIO_BUCKET,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM,

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || process.env.SENDGRID_FROM,

    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    MEILISEARCH_HOST: process.env.MEILISEARCH_HOST,
    MEILISEARCH_ADMIN_KEY: process.env.MEILISEARCH_ADMIN_KEY,

    WORKER_MODE: (process.env.MEDUSA_WORKER_MODE as 'worker' | 'server' | 'shared' | undefined) ?? 'shared',

    SHOULD_DISABLE_ADMIN: process.env.MEDUSA_DISABLE_ADMIN === 'true',
  }
}
