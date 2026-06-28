import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, roastPref, cadencePref, consentFlag, consentTimestamp } =
    body as {
      email?: unknown;
      roastPref?: unknown;
      cadencePref?: unknown;
      consentFlag?: unknown;
      consentTimestamp?: unknown;
    };

  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    consentFlag !== true ||
    typeof consentTimestamp !== "string" ||
    consentTimestamp.trim() === ""
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Check if email already exists before upsert to detect new vs existing
  const { data: existing } = await supabase
    .from("tindel_waitlist")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  const alreadyOnList = existing !== null;

  const { error } = await supabase.from("tindel_waitlist").upsert(
    {
      email,
      roast_pref: typeof roastPref === "string" ? roastPref : "",
      cadence_pref: typeof cadencePref === "string" ? cadencePref : "",
      consent_flag: consentFlag,
      consent_timestamp: consentTimestamp,
    },
    { onConflict: "email" }
  );

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ success: true, alreadyOnList });
}
