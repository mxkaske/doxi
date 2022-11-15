import "@/styles/globals.css";
import "@/styles/pretty-code.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import GitHubIcon from "src/icons/GitHub";
import TwitterIcon from "src/icons/Twitter";

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
      <body className="flex min-h-screen w-full flex-col">
        <header className="flex w-full items-center justify-between space-x-4 border border-gray-100 py-8 px-6">
          <div>
            <Link href="/" className="text-xl">
              Learn <span className="font-medium text-red-700">Redis</span> with{" "}
              <span className="font-medium text-green-500">Upstash</span>
            </Link>
          </div>
          <div className="flex space-x-3">
            <Link
              href="https://github.com/mxkaske/learn-redis-with-upstash"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="h-6 w-6 hover:text-[#6cc644]" />
            </Link>
            <Link
              href="https://twitter.com/mxkaske"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon className="h-6 w-6 hover:text-[#1DA1F2]" />
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="w-full border border-gray-100 px-6 py-8">
          <p className="text-center text-sm font-extralight text-gray-600">
            created by{" "}
            <Link
              href="https://twitter.com/mxkaske"
              target="_blank"
              rel="noreferrer"
            >
              @mxkaske
            </Link>
          </p>
        </footer>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
