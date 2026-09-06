"use client";

import { useState } from "react";
import { Share } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "adii.",
          text: "Check out my links",
          url,
        });
      } catch {
        // User cancelled the share sheet.
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Share profile"
        onClick={share}
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-chip text-chip-foreground transition-transform duration-200 hover:scale-105 active:scale-95 sm:size-10"
      >
        <Share className="size-4.5" strokeWidth={1.8} />
      </button>

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-xl transition-all duration-200 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        Link copied
      </div>
    </>
  );
}
