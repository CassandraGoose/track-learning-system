import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import SiteFooter from "@/app/components/SiteFooter";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Track",
  description: "Personal LMS for tracking and proving your learning.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bright text-secondary">
        <Navbar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
