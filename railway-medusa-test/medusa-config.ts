import { Modules, defineConfig } from '@medusajs/utils';
import { getConfig } from './lib/constants';  
import { loadEnv } from '@medusajs/framework/utils';

// 👇 Esta línea es esencial para cargar las variables antes de usarlas
loadEnv(process.env.NODE_ENV || 'development', process.cwd());


const config = getConfig();

const medusaConfig = {
  projectConfig: {
    databaseUrl: config.DATABASE_URL,
    databaseLogging: false,
    redisUrl: config.REDIS_URL,
    workerMode: config.WORKER_MODE,
    http: {
      adminCors: config.ADMIN_CORS,
      authCors: config.AUTH_CORS,
      storeCors: config.STORE_CORS,
      jwtSecret: config.JWT_SECRET,
      cookieSecret: config.COOKIE_SECRET,
    },
    build: {
      rollupOptions: {
        external: ["@medusajs/dashboard"]
      }
    }
  },
  admin: {
    backendUrl: config.BACKEND_URL,
    disable: config.SHOULD_DISABLE_ADMIN,
  },
  modules: [
    {
      key: Modules.FILE,
      resolve: '@medusajs/file',
      options: {
        providers: [
          ...(config.MINIO_ENDPOINT && config.MINIO_ACCESS_KEY && config.MINIO_SECRET_KEY ? [{
            resolve: './src/modules/minio-file',
            id: 'minio',
            options: {
              endPoint: config.MINIO_ENDPOINT,
              accessKey: config.MINIO_ACCESS_KEY,
              secretKey: config.MINIO_SECRET_KEY,
              bucket: config.MINIO_BUCKET // Optional, default: medusa-media
            }
          }] : [{
            resolve: '@medusajs/file-local',
            id: 'local',
            options: {
              upload_dir: 'static',
              backend_url: `${config.BACKEND_URL}/static`
            }
          }])
        ]
      }
    },
    ...(config.REDIS_URL ? [{
      key: Modules.EVENT_BUS,
      resolve: '@medusajs/event-bus-redis',
      options: { 
        redisUrl: config.REDIS_URL
      }
    },
    {
      key: Modules.WORKFLOW_ENGINE,
      resolve: '@medusajs/workflow-engine-redis',
      options: {
        redis: {
          url: config.REDIS_URL,
        }
      }
    }] : []),
    ...(config.SENDGRID_API_KEY && config.SENDGRID_FROM_EMAIL || config.RESEND_API_KEY && config.RESEND_FROM_EMAIL ? [{
      key: Modules.NOTIFICATION,
      resolve: '@medusajs/notification',
      options: {
        providers: [
          ...(config.SENDGRID_API_KEY && config.SENDGRID_FROM_EMAIL ? [{
            resolve: '@medusajs/notification-sendgrid',
            id: 'sendgrid',
            options: {
              channels: ['email'],
              api_key: config.SENDGRID_API_KEY,
              from: config.SENDGRID_FROM_EMAIL,
            }
          }] : []),
          ...(config.RESEND_API_KEY && config.RESEND_FROM_EMAIL ? [{
            resolve: './src/modules/email-notifications',
            id: 'resend',
            options: {
              channels: ['email'],
              api_key: config.RESEND_API_KEY,
              from: config.RESEND_FROM_EMAIL,
            },
          }] : []),
        ]
      }
    }] : []),
    ...(config.STRIPE_API_KEY && config.STRIPE_WEBHOOK_SECRET ? [{
      key: Modules.PAYMENT,
      resolve: '@medusajs/payment',
      options: {
        providers: [
          {
            resolve: '@medusajs/payment-stripe',
            id: 'stripe',
            options: {
              apiKey: config.STRIPE_API_KEY,
              webhookSecret: config.STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    }] : [])
  ],
  plugins: [
  ...(config.MEILISEARCH_HOST && config.MEILISEARCH_ADMIN_KEY ? [{
      resolve: '@rokmohar/medusa-plugin-meilisearch',
      options: {
        config: {
          host: config.MEILISEARCH_HOST,
          apiKey: config.MEILISEARCH_ADMIN_KEY
        },
        settings: {
          products: {
            type: 'products',
            enabled: true,
            fields: ['id', 'title', 'description', 'handle', 'variant_sku', 'thumbnail'],
            indexSettings: {
              searchableAttributes: ['title', 'description', 'variant_sku'],
              displayedAttributes: ['id', 'handle', 'title', 'description', 'variant_sku', 'thumbnail'],
              filterableAttributes: ['id', 'handle'],
            },
            primaryKey: 'id',
          }
        }
      }
    }] : [])
  ]
};

export default defineConfig(medusaConfig);
