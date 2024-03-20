import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DATABASE_URL,
  EXPIRED_TOKEN,
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE,
  Email_Pro,
  FRONT_END,
} = process.env;
