import "./globals.css";

export const metadata = {
  title: "adii. — all my links in one place",
  description:
    "Chronically online or chronically offline. Find adii. on Instagram, Discord, Spotify, Letterboxd and Goodreads.",
  openGraph: {
    title: "adii. — all my links in one place",
    description:
      "Chronically online or chronically offline. Find adii. on Instagram, Discord, Spotify, Letterboxd and Goodreads.",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#233326" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}