import ShareButton from "./components/ShareButton";
import MusicButton from "./components/MusicButton";
import RotatingPhrase from "./components/RotatingPhrase";
import LinkItem from "./components/LinkItem";
import { links } from "./links";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-8 sm:py-10">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-card-gradient shadow-2xl backdrop-blur-xl">
        <div
          className="pointer-events-none absolute inset-0 bg-page-glow"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col px-4 pb-8 pt-5 sm:px-5 sm:pb-10 sm:pt-6">
          <div className="flex items-start justify-between">
            <MusicButton />
            <ShareButton />
          </div>

          <header className="-mt-8 flex flex-col items-center text-center">
            <img
              src="/images/profile.webp"
              alt="adii. profile picture"
              width={512}
              height={512}
              fetchPriority="high"
              className="size-20 rounded-full object-cover ring-1 ring-white/15 shadow-lg sm:size-24"
            />

            <h1 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-foreground sm:text-[25px]">
              adii.
            </h1>

            <RotatingPhrase />
          </header>

          <div className="mt-5 flex items-center justify-center">
            <div className="inline-flex font-mono items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-white/80 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              probably asleep
            </div>
          </div>

          <p className="mt-7 text-center font-mono text-[11px] leading-6 tracking-[0.14em] text-white/45 sm:text-xs">
            To see a World in a Grain of Sand
            <br />
            <span className="text-white/60">And a Heaven in a Wild Flower</span>
          </p>

          <nav className="mt-8 flex flex-col gap-3 sm:gap-4">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </nav>

          <footer className="mt-10 border-t border-white/5 px-1 pt-5 text-center font-mono text-[10px] tracking-[0.12em] text-foreground/40">
            Same person. Different places.
          </footer>
        </div>
      </div>
    </main>
  );
}
