const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const envPath = path.join(__dirname, "..", ".env.local");
const envLines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
const env = {};

for (const line of envLines) {
  if (!line || line.startsWith("#")) continue;
  const idx = line.indexOf("=");
  if (idx < 0) continue;
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  env[key] = value;
}

const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is missing in .env.local");
  process.exit(1);
}

const sql = `
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  department text not null,
  schedule text not null,
  last_check_in text,
  status text not null default 'Present',
  created_at timestamptz not null default now()
);
`;

(async () => {
  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    await client.query(sql);
    console.log("employees table created (or already exists).");
  } catch (err) {
    console.error("Failed to create employees table:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
