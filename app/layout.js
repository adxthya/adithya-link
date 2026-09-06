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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}