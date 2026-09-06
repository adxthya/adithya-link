"use client";

import { ArrowUpRight } from "lucide-react";

function recordClick(id) {
  const payload = JSON.stringify({ id, referrer: document.referrer });
  const blob = new Blob([payload], { type: "application/json" });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", blob);
    return;
  }

  try {
    fetch("/api/click", {
      method: "POST",
      body: blob,
      keepalive: true,
    });
  } catch {}
}

export default function LinkItem({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => recordClick(link.id)}
      className="group relative flex items-center gap-3 rounded-full border-2 border-link-border bg-link p-1.5 shadow-link transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] active:scale-[0.985]"
    >
      <img
        src={link.image}
        alt=""
        loading="lazy"
        width={512}
        height={512}
        className="size-11 shrink-0 rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
      />

      <span className="min-w-0 flex-1 truncate px-1 text-center text-base font-normal text-link-foreground">
        {link.label}
      </span>

      <span
        className="grid size-8 shrink-0 place-items-center rounded-full text-link-foreground/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
}