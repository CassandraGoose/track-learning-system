import { Metadata } from "next";
import Navbar from "@/app/_components/Navbar";
import SiteFooter from "@/app/_components/SiteFooter";
import "@/styles/globals.css";
import { checkUser } from '@/app/actions/actions';

export const metadata: Metadata = {
  title: "Track",
  description: "Personal LMS for tracking and proving your learning.",
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode,
}) {

  const user = await checkUser();

  return (
    <html lang="en">
      <body className="bg-bright text-secondary space-y-8">
        <Navbar user={user}/>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
