import { ArrowUpRight } from "lucide-react";
import ShareButton from "./components/ShareButton";

const links = [
  {
    label: "@halfasleepbun - instagram",
    image: "/images/instagram.jpg",
    href: "https://www.instagram.com/halfasleepbun",
  },
  {
    label: "@adx.thya - discord",
    image: "/images/discord.webp",
    href: "https://discord.com/users/1416099867431931926",
  },
  {
    label: "adii - spotify",
    image: "/images/spotify.webp",
    href: "https://open.spotify.com/user/31iogna4pulj6yjbaprphfn3gi2e?si=e53fafe9525b4e9b",
  },
  {
    label: "adii.'s profile - letterboxd",
    image: "/images/letterboxd.webp",
    href: "https://boxd.it/4w3I7",
  },
  {
    label: "adii. - goodreads",
    image: "/images/goodreads.webp",
    href: "https://goodreads.com/adithyakb",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-card-gradient shadow-2xl backdrop-blur-xl">
        <div
          className="pointer-events-none absolute inset-0 bg-page-glow"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col px-5 pb-10 pt-6">
          <div className="flex items-start justify-end">
            <ShareButton />
          </div>

          <header className="-mt-8 flex flex-col items-center text-center">
            <img
              src="/images/profile.webp"
              alt="adii. profile picture"
              width={512}
              height={512}
              className="size-24 rounded-full object-cover"
            />
            <h1 className="mt-3 text-2xl font-normal tracking-tight text-foreground">
              adii.
            </h1>
            <p className="mt-1 text-base text-foreground/90">
              Somewhere between here and there.
            </p>
          </header>

          <div className="mt-5 flex items-center justify-center">
            <div className="inline-flex font-mono items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              probably asleep
            </div>
          </div>

          <p className="mt-7 text-center font-mono text-xs leading-6 tracking-[0.14em] text-white/45">
            To see a World in a Grain of Sand
            <br />
            <span className="text-white/60">And a Heaven in a Wild Flower</span>
          </p>

          <nav className="mt-8 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
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
