import { neon } from '@neondatabase/serverless';

let sqlClient = null;

// DATABASE_URL না থাকলেও build ভেঙে না পড়ার জন্য lazy init।
export function sql(...args) {
  if (!sqlClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL সেট করা নেই। .env.local দেখো।');
    }
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient(...args);
}
