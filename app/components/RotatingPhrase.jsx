"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Somewhere between here and there.",
  "probably listening to something.",
  "one tab too many.",
  "still figuring it out.",
];

export default function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((current) => (current + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`mt-1 max-w-xs text-[15px] leading-6 text-foreground/70 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {phrases[index]}
    </p>
  );
}
