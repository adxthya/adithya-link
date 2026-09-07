const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY,
);

function authHeaders() {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

export async function supabaseInsert(table, row) {
  if (!supabaseConfigured) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    throw new Error(`supabase insert failed: ${res.status}`);
  }
}

export async function supabaseDeleteAll(table) {
  if (!supabaseConfigured) return 0;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
      Prefer: "return=minimal",
    },
  });
  if (!res.ok) {
    throw new Error(`supabase delete failed: ${res.status}`);
  }
  return 0;
}

export async function supabaseFetchAll(select) {
  if (!supabaseConfigured) return [];
  const rows = [];
  let from = 0;

  for (;;) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${select}`,
      {
        headers: {
          ...authHeaders(),
          Range: `${from}-${from + 999}`,
        },
      },
    );
    if (!res.ok) break;
    const page = await res.json();
    rows.push(...page);
    if (page.length < 1000) break;
    from += 1000;
  }

  return rows;
}