import type { APIRoute } from 'astro';
import { getSupabaseClient } from '@/lib/database/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password, action } = await request.json().catch(() => ({}));

    if (action === 'logout') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'admin_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
        },
      });
    }

    // Check master admin password or Supabase Auth
    const isMasterPassword = password === 'admin123' || password === 'gamertag2025';

    if (isMasterPassword) {
      return new Response(
        JSON.stringify({
          success: true,
          token: 'admin-master-key-2025',
          user: { id: 'admin-001', email: email || 'admin@gamertagpro.com', role: 'admin' },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'admin_token=admin-master-key-2025; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax',
          },
        }
      );
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || '',
      });

      if (error || !data.session) {
        return new Response(
          JSON.stringify({ success: false, error: error?.message || 'Invalid credentials' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          token: data.session.access_token,
          user: data.user,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `admin_token=${data.session.access_token}; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax`,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid admin credentials' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
