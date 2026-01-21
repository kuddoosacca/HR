import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rolpskghrkvqgantfifx.supabase.co";

export async function GET() {
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseKey) {
    return Response.json(
      { ok: false, message: "SUPABASE_KEY is missing in .env.local" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error, status } = await supabase
    .from("employees")
    .select("id")
    .limit(1);

  if (error && (status === 401 || status === 403)) {
    return Response.json(
      { ok: false, message: `Auth error: ${error.message}` },
      { status: 401 }
    );
  }

  if (error) {
    return Response.json({
      ok: true,
      message: "Connected, but table check failed (likely missing table or RLS).",
      details: error.message,
    });
  }

  return Response.json({ ok: true, message: "Connected", sample: data });
}
