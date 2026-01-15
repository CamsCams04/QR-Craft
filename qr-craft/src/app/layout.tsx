import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "QR-Craft",
  description: "Application QR-Craft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
