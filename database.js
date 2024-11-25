import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

export default function dbInit(){
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    return createClient(supabaseUrl, supabaseAnonKey);
}