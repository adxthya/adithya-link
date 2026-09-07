import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseDeleteAll } from "../../../../lib/supabase";

export async function DELETE() {
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  try {
    await supabaseDeleteAll("link_click");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "delete failed" }, { status: 500 });
  }
}