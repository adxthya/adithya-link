import { supabaseConfigured, supabaseFetchAll } from "../../lib/supabase";
import { links } from "../links";

export const dynamic = "force-dynamic";

const DAY_MS = 86_400_000;
const CHART_DAYS = 14;

function dayKeyToDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dayKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shorter(dayKeyStr) {
  const d = dayKeyToDate(dayKeyStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(",", "");
}

export default async function StatsPage() {
  if (!supabaseConfigured) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-card-gradient p-8 text-center shadow-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-link">
            stats
          </p>
          <h1 className="mt-3 text-lg text-foreground">Not configured.</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
          </p>
        </div>
      </main>
    );
  }

  let rows = [];
  try {
    rows = await supabaseFetchAll(
      "link_click?select=link_id,clicked_at&order=clicked_at",
    );
  } catch {
    rows = [];
  }

  const todayStart = startOfDay(new Date());
  const todayKey = dayKey(todayStart);
  const chartStart = new Date(todayStart.getTime() - (CHART_DAYS - 1) * DAY_MS);

  const perLink = new Map();
  let clicksToday = 0;
  const byDay = new Map();

  for (const row of rows) {
    const id = row.link_id;
    perLink.set(id, (perLink.get(id) ?? 0) + 1);

    const at = new Date(row.clicked_at);
    if (at >= todayStart) clicksToday += 1;

    const key = dayKey(at);
    if (key >= dayKey(chartStart)) {
      byDay.set(key, (byDay.get(key) ?? 0) + 1);
    }
  }

  const total = rows.length;

  const stats = Array.from(perLink, ([id, count]) => {
    const match = links.find((l) => l.id === id);
    return { id, label: match?.label ?? id, count };
  }).sort((a, b) => b.count - a.count);

  const maxPerLink = Math.max(1, ...stats.map((s) => s.count));

  const chart = Array.from({ length: CHART_DAYS }, (_, i) => {
    const key = dayKey(new Date(chartStart.getTime() + i * DAY_MS));
    return { key, label: shorter(key), count: byDay.get(key) ?? 0 };
  });
  const maxDay = Math.max(1, ...chart.map((d) => d.count));

  return (
    <main className="flex min-h-dvh flex-col items-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-xs uppercase tracking-[0.18em] text-link">
            click stats
          </h1>
          <a
            href="/"
            className="text-xs text-foreground/40 transition-colors hover:text-foreground/70"
          >
            ← back
          </a>
        </div>

        <section className="mt-6 rounded-[28px] border border-white/10 bg-card-gradient p-4 shadow-2xl sm:p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                total clicks
              </p>
              <p className="mt-1 text-3xl font-medium tabular-nums text-foreground">
                {total}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                today
              </p>
              <p className="mt-1 text-3xl font-medium tabular-nums text-foreground">
                {clicksToday}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
              past {CHART_DAYS} days
            </h2>
            {maxDay === 1 ? (
              <p className="mt-4 text-sm text-foreground/50">
                No clicks logged yet.
              </p>
            ) : (
              <div className="mt-4 flex items-end gap-1.5 overflow-x-auto pb-1 sm:overflow-x-visible" role="img" aria-label="Daily clicks bar chart">
                {chart.map((d) => (
                  <div key={d.key} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] tabular-nums text-foreground/45">
                      {d.count || ""}
                    </span>
                    <div
                      title={`${d.label}: ${d.count}`}
                      className="w-full rounded-t bg-link/70"
                      style={{
                        height: `${Math.max(2, Math.round((d.count / maxDay) * 96))}px`,
                        background: d.count
                          ? "linear-gradient(180deg, var(--color-link), oklch(0.36 0.09 32))"
                          : "oklch(1 0 0 / 6%)",
                      }}
                    />
                    <span className="inline-block origin-top-left rotate-45 text-[9px] leading-none text-foreground/35">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/10 bg-card-gradient p-4 shadow-2xl sm:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
            per link
          </h2>

          {stats.length === 0 ? (
            <p className="mt-4 text-sm text-foreground/50">No clicks yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {stats.map((item) => (
                <li key={item.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm text-foreground/85">
                      {item.label}
                    </span>
                    <span className="tabular-nums text-sm text-foreground/60">
                      {item.count}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-link"
                      style={{ width: `${(item.count / maxPerLink) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}