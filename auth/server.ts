import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component — cookie mutations are ignored (expected).
          }
        },
      },
    }
  );

  return client
}

export async function getUser() {
  const {auth} = await createClient();

  try {
    const {error, data} = await auth.getUser();

    if (error) {
      if (error.name !== "AuthSessionMissingError") {
        console.error(error);
      }
      return null;
    }

    return data.user;
  } catch (error) {
    if (error instanceof Error && error.name === "AuthSessionMissingError") {
      return null;
    }
    console.log('error from auth session');
    console.log(error);
    return null;
  }
}
