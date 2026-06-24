import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praha Labs | Praha Voice-1 TTS",
  description:
    "Praha Labs builds applied AI models, including Praha Voice-1, a text-to-speech model for product teams and developers.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
