import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineScope | Premium Movie Discovery",
  description: "Discover the latest trending movies and watch trailers on CineScope.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white">
        {children}
      </body>
    </html>
  );
}
