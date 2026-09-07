"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetStatsButton() {
  const router = useRouter();
  const [state, setState] = useState("idle");

  const reset = async () => {
    if (!window.confirm("Reset all click stats? This cannot be undone.")) return;

    setState("resetting");
    try {
      const res = await fetch("/api/stats/reset", { method: "DELETE" });
      if (!res.ok) throw new Error("reset failed");

      setState("done");
      router.refresh();
    } catch {
      setState("error");
    }

    window.setTimeout(() => setState("idle"), 2000);
  };

  const label =
    state === "resetting"
      ? "resetting…"
      : state === "done"
        ? "reset"
        : state === "error"
          ? "failed"
          : "reset";

  return (
    <button
      type="button"
      onClick={reset}
      disabled={state === "resetting"}
      className="cursor-pointer text-xs text-foreground/40 transition-colors hover:text-red-400/80 disabled:cursor-default disabled:opacity-50"
    >
      {label}
    </button>
  );
}