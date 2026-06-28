import type { Metadata } from "next";
import "./globals.css";
import "./components/BtnPrimary.css";

export const metadata: Metadata = {
  title: "tindel",
  description: "AEGIS-generated project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
