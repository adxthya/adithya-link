"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function MusicButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Unable to play audio:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/song.mp3"
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause music" : "Play music"}
        className="relative z-20 grid size-10 cursor-pointer place-items-center rounded-full bg-chip text-chip-foreground transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause className="size-4.5" strokeWidth={1.8} />
        ) : (
          <Play className="size-4.5" strokeWidth={1.8} />
        )}
      </button>
    </>
  );
}
