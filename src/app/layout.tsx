import "@/styles/globals.css";
import Analytics from "@/components/analytics";
import { Inter } from "next/font/google";
import TopBar from "@/components/navigation/top-bar";
import BottomBar from "@/components/navigation/bottom-bar";
import { Metadata } from "next";

const URL = process.env.NEXT_PUBLIC_DOCUMENTATION_URL;
const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
const DESCRIPTION =
  "Create your Documentation with Next.js and MDX. Powered by Contentlayer.";

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: NAME,
    url: URL,
    images: [`${URL}/api/og`],
  },
  twitter: {
    card: "summary_large_image",
    title: NAME,
    images: [`${URL}/api/og`],
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen w-full flex-col">
        <header className="w-full border-b border-gray-100">
          <div className="container mx-auto px-4 py-6 md:px-6">
            <TopBar />
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="w-full border-t border-gray-100">
          <div className="container mx-auto px-4 py-6 md:px-6">
            <BottomBar />
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
