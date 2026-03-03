import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log("Checking database schema...");
  
  // Check pages table
  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .limit(1);

  if (pageError) {
    console.error("Error fetching from pages:", pageError);
  } else {
    const columns = Object.keys(pageData[0] || {});
    console.log("Pages columns:", columns);
    if (columns.includes("schema_type") && columns.includes("schema_data")) {
      console.log("✅ 'pages' table migration verified.");
    } else {
      console.error("❌ 'pages' table missing columns!");
    }
  }

  // Check page_revisions table
  const { data: revData, error: revError } = await supabase
    .from("page_revisions")
    .select("*")
    .limit(1);

  if (revError) {
    console.error("Error fetching from page_revisions:", revError);
  } else if (revData && revData.length > 0) {
    const columns = Object.keys(revData[0]);
    console.log("Page revisions columns:", columns);
    if (columns.includes("schema_type") && columns.includes("schema_data")) {
      console.log("✅ 'page_revisions' table migration verified.");
    } else {
      console.log("⚠️ 'page_revisions' table missing columns (user might not have run it there)");
    }
  } else {
    console.log("No revisions found to check.");
  }
}

checkSchema();
