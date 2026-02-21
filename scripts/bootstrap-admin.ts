/**
 * Bootstrap CMS admin user — one-time setup script.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   ADMIN_EMAIL=you@example.com \
 *   ADMIN_PASSWORD=changeme123 \
 *   pnpm seed:admin
 *
 * Or copy .env.example → .env and fill in the values, then run:
 *   pnpm seed:admin
 *
 * The script is idempotent — running it twice will not create duplicate
 * users. If the auth user already exists the script will still upsert
 * the cms_users row so it is safe to run multiple times.
 *
 * NEVER commit the .env file or the SERVICE_ROLE_KEY to version control.
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// ── Config ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "polaris.dev.solutions@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ── Validate ───────────────────────────────────────────────────────────────
if (!SUPABASE_URL) {
  die("Missing env var: SUPABASE_URL (or VITE_SUPABASE_URL)");
}
if (!SERVICE_ROLE_KEY) {
  die("Missing env var: SUPABASE_SERVICE_ROLE_KEY");
}
if (!ADMIN_PASSWORD) {
  die(
    "Missing env var: ADMIN_PASSWORD — set a strong initial password.\n" +
      "Example: ADMIN_PASSWORD=$(openssl rand -base64 18) pnpm seed:admin",
  );
}

// ── Client (service role bypasses RLS) ────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🔐  Bootstrapping CMS admin user: ${ADMIN_EMAIL}\n`);

  // 1. Check if auth user already exists
  const { data: listData, error: listError } =
    await supabase.auth.admin.listUsers();
  if (listError) die(`Could not list auth users: ${listError.message}`);

  const existingAuthUser = listData.users.find((u) => u.email === ADMIN_EMAIL);

  let authUserId: string;

  if (existingAuthUser) {
    console.log(
      `  ✓ Auth user already exists (${existingAuthUser.id}) — skipping creation.`,
    );
    authUserId = existingAuthUser.id;
  } else {
    // 2. Create the auth user via the Admin API (no SQL)
    const { data: created, error: createError } =
      await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true, // mark email as already verified
        user_metadata: { role: "admin" },
      });

    if (createError) die(`Failed to create auth user: ${createError.message}`);

    authUserId = created.user.id;
    console.log(`  ✓ Auth user created: ${authUserId}`);
  }

  // 3. Upsert into public.cms_users
  const { error: upsertError } = await supabase.from("cms_users").upsert(
    {
      user_id: authUserId,
      email: ADMIN_EMAIL,
      role: "admin",
    },
    {
      onConflict: "email", // safe to re-run
    },
  );

  if (upsertError) {
    die(`Failed to upsert cms_users row: ${upsertError.message}`);
  }

  console.log(`  ✓ cms_users row upserted (role=admin)\n`);
  console.log("✅  Done! Admin user is ready.\n");
  console.log(`   Email    : ${ADMIN_EMAIL}`);
  console.log(`   Auth UID : ${authUserId}`);
  console.log(`   Login at : /admin/login\n`);

  if (!existingAuthUser) {
    console.log(
      "⚠️  Save or change the password now — it will not be shown again.",
    );
  }
}

main().catch((err) => {
  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});

// ── Helper ─────────────────────────────────────────────────────────────────
function die(msg: string): never {
  console.error(`\n❌  ${msg}\n`);
  process.exit(1);
}
