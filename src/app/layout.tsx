import "@/styles/globals.css";
import "@/styles/pretty-code.css";
// import "@/styles/highlightjs.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-full w-full">
        <header className="flex h-36 w-full items-center justify-between border border-green-500 p-6">
          <div>
            <Link href="/" className="text-xl">
              Learn <span className="font-medium text-red-700">Redis</span> with{" "}
              <span className="font-medium text-green-500">Upstash</span>
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="h-36 w-full border border-yellow-500"></footer>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
