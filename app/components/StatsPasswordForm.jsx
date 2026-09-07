"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StatsPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (event) => {
    event.preventDefault();
    if (!password) return;

    setState("checking");
    try {
      const res = await fetch("/api/stats/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("wrong password");
      setState("idle");
      setPassword("");
      router.refresh();
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
      <label htmlFor="stats-password" className="sr-only">
        Password
      </label>
      <input
        id="stats-password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          if (state === "error") setState("idle");
        }}
        placeholder="password"
        autoComplete="current-password"
        autoFocus
        className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center font-mono text-sm text-foreground outline-none placeholder:text-foreground/35 backdrop-blur-xl focus:border-white/25"
      />
      <button
        type="submit"
        disabled={state === "checking" || !password}
        className="cursor-pointer rounded-full bg-link px-4 py-2 text-sm font-medium text-link-foreground transition-transform duration-200 hover:brightness-105 active:scale-[0.98] disabled:cursor-default disabled:opacity-50"
      >
        {state === "checking" ? "checking…" : "unlock"}
      </button>
      {state === "error" && (
        <p className="text-center text-xs text-red-300/90">wrong password</p>
      )}
    </form>
  );
}