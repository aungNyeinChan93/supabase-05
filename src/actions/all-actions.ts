'use server'

import { supabase } from "@/config/supabase"
import { AuthError } from "@supabase/supabase-js"
import { redirect } from "next/navigation"


/**____________ Logout _____________ */
export async function logoutAction() {
    const { error } = await supabase.auth.signOut()
    if (error instanceof AuthError) {
        throw new Error(error?.message)
    }
    return redirect('/auth/login')
}