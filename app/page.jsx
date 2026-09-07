import ShareButton from "./components/ShareButton";
import MusicButton from "./components/MusicButton";
import RotatingPhrase from "./components/RotatingPhrase";
import LinkItem from "./components/LinkItem";
import { links } from "./links";

export default function Home() {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-8 sm:py-0">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.webp')" }}
        aria-hidden="true"
      />

      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.16] bg-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        {/* Olive glass tint */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#26301f]/35"
          aria-hidden="true"
        />

        {/* Glass reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.08] to-transparent"
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-page-glow opacity-50"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col px-4 pb-6 pt-4 sm:px-5 sm:pb-10 sm:pt-6">
          {/* Header controls */}
          <div className="flex items-start justify-between">
            <MusicButton />
            <ShareButton />
          </div>

          {/* Profile */}
          <header className="-mt-8 flex flex-col items-center text-center">
            {/* Avatar decoration */}
            <div className="relative flex size-[92px] items-center justify-center sm:size-[112px]">
              {/* Orbit ring */}
              <div
                className="absolute inset-0 rounded-full border border-white/[0.14]"
                aria-hidden="true"
              />

              {/* Dashed orbit */}
              <div
                className="absolute inset-[5px] rounded-full border border-dashed border-white/[0.12]"
                aria-hidden="true"
              />

              {/* Floating accent dots */}
              <span
                className="absolute left-[7px] top-[21px] size-1.5 rounded-full bg-white/45 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                aria-hidden="true"
              />

              <span
                className="absolute bottom-[13px] right-[8px] size-1 rounded-full bg-white/30"
                aria-hidden="true"
              />

              {/* Avatar glass frame */}
              <div className="relative rounded-full bg-white/[0.07] p-[3px] shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <div className="rounded-full border border-white/[0.18] bg-black/10 p-[2px]">
                  <img
                    src="/images/profile.webp"
                    alt="adii. profile picture"
                    width={512}
                    height={512}
                    fetchPriority="high"
                    className="size-[72px] rounded-full object-cover sm:size-[88px]"
                  />
                </div>
              </div>
            </div>

            <h1 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-foreground sm:text-[25px]">
              adii.
            </h1>

            <RotatingPhrase />
          </header>

          {/* Status */}
          <div className="mt-4 flex items-center justify-center sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] px-3.5 py-1.5 font-mono text-xs text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-4 sm:py-2 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Seeking Coffee
            </div>
          </div>

          {/* Quote */}
          <p className="mt-5 text-center font-mono text-[11px] leading-6 tracking-[0.14em] text-white/45 sm:mt-7 sm:text-xs">
            To see a World in a Grain of Sand
            <br />
            <span className="text-white/60">
              And a Heaven in a Wild Flower
            </span>
          </p>

          {/* Links */}
          <nav className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </nav>

          {/* Footer */}
          <footer className="mt-7 border-t border-white/[0.08] px-1 pt-4 text-center font-mono text-[10px] tracking-[0.12em] text-foreground/40 sm:mt-10 sm:pt-5">
            Same person. Different places.
          </footer>
        </div>
      </div>
    </main>
  );
}