import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Helper to read .env file if process.env is not populated
function loadEnv() {
  try {
    const envPath = path.resolve('.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const val = vals.join('=').replace(/^["']|["']$/g, '');
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val.trim();
          }
        }
      }
    }
  } catch {}
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres.xfhwgmnlzrbikvfcdtws:vjZEfPicn6GRLuYk@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || 'https://xfhwgmnlzrbikvfcdtws.supabase.co';
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Postgres direct connection (for Drizzle ORM queries)
let dbClient: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (DATABASE_URL && !DATABASE_URL.includes('your-project-id')) {
  try {
    const queryClient = postgres(DATABASE_URL, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    dbClient = drizzle(queryClient, { schema });
  } catch (err) {
    console.warn('Postgres connection failed, using fallback in-memory store:', err);
  }
}

// Supabase client (Client & Server)
export const getSupabaseClient = (serviceRole = false) => {
  if (!SUPABASE_URL || SUPABASE_URL.includes('your-project')) {
    return null;
  }
  const key = serviceRole && SUPABASE_SERVICE_ROLE_KEY ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key || 'dummy', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export { dbClient };
