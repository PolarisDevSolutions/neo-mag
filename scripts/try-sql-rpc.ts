import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function tryExecSql() {
  const sql = `ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS schema_type text; 
              ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS schema_data jsonb;`;
  
  console.log("Trying to call RPC 'exec_sql'...");
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error("RPC 'exec_sql' failed:", error);
    
    console.log("Trying to call RPC 'run_sql'...");
    const { data: data2, error: error2 } = await supabase.rpc('run_sql', { sql });
    
    if (error2) {
      console.error("RPC 'run_sql' failed:", error2);
    } else {
      console.log("RPC 'run_sql' succeeded!");
    }
  } else {
    console.log("RPC 'exec_sql' succeeded!");
  }
}

tryExecSql();
