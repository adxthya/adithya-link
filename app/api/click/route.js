import { supabaseConfigured, supabaseInsert } from "../../../lib/supabase";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}

  const id = typeof body.id === "string" ? body.id.slice(0, 100) : null;
  if (!id) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const referrer =
    typeof body.referrer === "string"
      ? body.referrer.slice(0, 500)
      : null;

  if (supabaseConfigured) {
    try {
      await supabaseInsert("link_click", { link_id: id, referrer });
    } catch {}
  }

  return Response.json({ ok: true });
}