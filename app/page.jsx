import ShareButton from "./components/ShareButton";
import MusicButton from "./components/MusicButton";
import RotatingPhrase from "./components/RotatingPhrase";
import LinkItem from "./components/LinkItem";
import { links } from "./links";

export default function Home() {
  return (
<main className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-background px-4 py-3 sm:h-screen sm:justify-center sm:overflow-hidden sm:py-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.webp')" }}
        aria-hidden="true"
      />

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.16] bg-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        {/* Olive glass tint */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#26301f]/35"
          aria-hidden="true"
        />

        {/* Glass reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.08] to-transparent sm:h-40"
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-page-glow opacity-50"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col px-4 pb-5 pt-3 min-[700px]:pb-8 min-[700px]:pt-5 sm:px-5">
          {/* Header controls */}
          <div className="flex items-start justify-between">
            <MusicButton />
            <ShareButton />
          </div>

          {/* Profile */}
          <header className="-mt-7 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative flex size-[82px] items-center justify-center min-[700px]:size-[104px]">
              {/* Outer orbit */}
              <div
                className="absolute inset-0 rounded-full border border-white/[0.14]"
                aria-hidden="true"
              />

              {/* Inner orbit */}
              <div
                className="absolute inset-[5px] rounded-full border border-dashed border-white/[0.11]"
                aria-hidden="true"
              />

              {/* Accent dots */}
              <span
                className="absolute left-[5px] top-[18px] size-1.5 rounded-full bg-white/45 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                aria-hidden="true"
              />

              <span
                className="absolute bottom-[11px] right-[6px] size-1 rounded-full bg-white/30"
                aria-hidden="true"
              />

              {/* Avatar frame */}
              <div className="relative rounded-full bg-white/[0.07] p-[3px] shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <div className="rounded-full border border-white/[0.18] bg-black/10 p-[2px]">
                  <img
                    src="/images/profile.webp"
                    alt="adii. profile picture"
                    width={512}
                    height={512}
                    fetchPriority="high"
                    className="size-[62px] rounded-full object-cover min-[700px]:size-[80px]"
                  />
                </div>
              </div>
            </div>

            <h1 className="mt-2 text-[21px] font-medium tracking-[-0.02em] text-foreground min-[700px]:mt-3 min-[700px]:text-[25px]">
              adii.
            </h1>

            <RotatingPhrase />
          </header>

          {/* Status */}
          <div className="mt-3 flex items-center justify-center min-[700px]:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 font-mono text-xs text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-xl min-[700px]:px-4 min-[700px]:py-2 min-[700px]:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Seeking Coffee
            </div>
          </div>

          {/* Quote */}
          <p className="mt-4 text-center font-mono text-[10px] leading-5 tracking-[0.12em] text-white/45 min-[700px]:mt-7 min-[700px]:text-xs min-[700px]:leading-6 min-[700px]:tracking-[0.14em]">
            To see a World in a Grain of Sand
            <br />
            <span className="text-white/60">And a Heaven in a Wild Flower</span>
          </p>

          {/* Links */}
          <nav className="mt-5 flex flex-col gap-2.5 min-[700px]:mt-8 min-[700px]:gap-4">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </nav>

          {/* Footer */}
          <footer className="mt-6 border-t border-white/[0.08] px-1 pt-3 text-center font-mono text-[9px] tracking-[0.12em] text-foreground/40 min-[700px]:mt-10 min-[700px]:pt-5 min-[700px]:text-[10px]">
            Same person. Different places.
          </footer>
        </div>
      </div>
    </main>
  );
}
