import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv";

dotenv.config()
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABSE_KEY
const serviceRolekey = process.env.SUPABASE_SERVICE_ROLEKEY
export const supabaseClient = createClient(supabaseUrl,
    serviceRolekey, { persistSession: false })

