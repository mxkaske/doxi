"use client";

import { allChapters, Chapter } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import cn from "classnames";

export default function SideNav() {
  const pathname = usePathname();

  const categorizeByFileDir = () => {
    return allChapters.reduce((prev, curr) => {
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
    <ul>
      {Object.keys(categorized).map((chapter) => {
        const data = categorized[chapter];
        const renderContent = () => {
          if (Array.isArray(data)) {
            const isActive = pathname?.startsWith(`/${chapter}`);
            return (
              <>
                <p className={cn("text-sm uppercase", isActive && "font-bold")}>
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
                  className={cn("text-sm uppercase", isActive && "font-bold")}
                >
                  {title}
                </Link>
              </li>
            );
          }
        };
        return <React.Fragment key={chapter}>{renderContent()}</React.Fragment>;
      })}
    </ul>
  );
}
