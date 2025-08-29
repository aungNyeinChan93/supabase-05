import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase_admin_key = process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY as string

export const supabase = createClient(supabase_url as string, supabase_key as string)

export const supabse_admin = createClient(supabase_url as string, supabase_admin_key)