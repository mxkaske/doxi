"use client";

import { allChapters, Chapter } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";
import cn from "classnames";

async function fetchChapters() {
  const chapters = allChapters;
  return chapters;
}

const _fetchChapters = fetchChapters();

export const dynamic = "error";

export async function generateStaticParams() {
  const chapters = await _fetchChapters;
  return chapters.map((chapter) => ({
    // remove trailing "/"
    chapters: chapter.url.slice(1, chapter.url.length).split("/"),
  }));
}

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = use(_fetchChapters);
  const pathname = usePathname();

  const categorizeByFileDir = () => {
    return chapters.reduce((prev, curr) => {
      if (curr._raw.sourceFileDir !== ".") {
        if (Array.isArray(prev[curr._raw.sourceFileDir])) {
          // @ts-ignore - push should be defined as isArray
          prev[curr._raw.sourceFileDir].push(curr);
        } else {
          prev[curr._raw.sourceFileDir] = [curr];
        }
      } else {
        // means this is a file!
        prev[curr._raw.flattenedPath] = curr;
      }
      return prev;
    }, {} as Record<string, Chapter[] | Chapter>);
  };

  const categorized = categorizeByFileDir();

  return (
    <div className="flex w-full">
      {/* TODO: header, side */}
      <div className="sticky top-0 w-full max-w-xs self-start border border-red-500 p-6">
        <ul>
          {Object.keys(categorized).map((chapter) => {
            const data = categorized[chapter];
            const renderContent = () => {
              if (Array.isArray(data)) {
                const isActive = pathname?.startsWith(`/${chapter}`);
                return (
                  <>
                    <p
                      className={cn(
                        "text-sm uppercase",
                        isActive && "font-bold"
                      )}
                    >
                      {chapter.replace("-", " ")}
                    </p>
                    {data.map(({ url, title }) => {
                      const isActive = pathname === url;
                      return (
                        <li key={url}>
                          <Link
                            href={`${url}`}
                            className={isActive ? "font-bold" : ""}
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </>
                );
              } else {
                const { url, title } = data;
                const isActive = pathname === url;
                return (
                  <li key={url}>
                    <Link
                      href={`${url}`}
                      className={cn(
                        "text-sm uppercase",
                        isActive && "font-bold"
                      )}
                    >
                      {title}
                    </Link>
                  </li>
                );
              }
            };
            return (
              <React.Fragment key={chapter}>{renderContent()}</React.Fragment>
            );
          })}
        </ul>
      </div>
      <div className="overflow-auto border border-blue-500 p-6">{children}</div>
    </div>
  );
}
