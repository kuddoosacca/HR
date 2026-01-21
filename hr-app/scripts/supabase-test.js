const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(__dirname, "..", ".env.local");
const envLines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
console.log("Reading env from:", envPath);
const env = {};

let supabaseLineLength = 0;
for (const line of envLines) {
  if (!line || line.startsWith("#")) continue;
  const idx = line.indexOf("=");
  if (idx < 0) continue;
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  env[key] = value;
  if (key === "SUPABASE_KEY") {
    supabaseLineLength = line.length;
  }
}

const supabaseUrl = "https://rolpskghrkvqgantfifx.supabase.co";
const supabaseKey = env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error("SUPABASE_KEY is missing in .env.local");
  console.error("Found keys:", Object.keys(env).join(", ") || "(none)");
  console.error("SUPABASE_KEY length:", (env.SUPABASE_KEY || "").length);
  console.error("SUPABASE_KEY line length:", supabaseLineLength);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const { data, error, status } = await supabase
    .from("employees")
    .select("id")
    .limit(1);

  if (error && (status === 401 || status === 403)) {
    console.error("Auth error:", error.message);
    process.exit(1);
  }

  if (error) {
    console.log("Connected, but table check failed:", error.message);
    process.exit(0);
  }

  console.log("Connected. Sample:", data);
})();
