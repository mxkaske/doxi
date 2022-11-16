"use client";

import { allChapters, Chapter } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import cn from "classnames";

function categorizeByFileDir() {
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
}

export default function SideNav() {
  const pathname = usePathname();

  const categorized = categorizeByFileDir();

  return (
    <ul className="grid gap-1">
      {Object.keys(categorized).map((chapter) => {
        const data = categorized[chapter];
        // LATER: make it recursive!
        const renderContent = () => {
          if (Array.isArray(data)) {
            // const isActive = pathname?.startsWith(`/${chapter}`);
            return (
              <>
                <h5 className={cn("text-sm font-semibold capitalize")}>
                  {chapter.replace("-", " ")}
                </h5>
                {data.map(({ url, title }) => {
                  const isActive = pathname === url;
                  return (
                    <ListElement key={url} {...{ url, title, isActive }} />
                  );
                })}
              </>
            );
          } else {
            const { url, title } = data;
            const isActive = pathname === url;
            return <ListElement key={url} {...{ url, title, isActive }} />;
          }
        };
        return <React.Fragment key={chapter}>{renderContent()}</React.Fragment>;
      })}
    </ul>
  );
}

// usePathname and isActive here instead of parent Component! Prop drill
function ListElement({
  isActive,
  title,
  url,
}: {
  isActive: boolean;
  title: string;
  url: string;
}) {
  return (
    // FIXME: strange behavior when switching `a` and `li`
    // FIXME: add group and apply group-hover to marker!
    <Link
      href={`${url}`}
      className={cn(
        "-mx-2 rounded-md px-2 py-0.5",
        isActive
          ? "bg-green-50 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <li
        className={cn(
          "list-inside list-disc",
          isActive
            ? "marker:text-green-500"
            : "marker:text-gray-200 hover:marker:text-gray-400"
        )}
      >
        {title}
      </li>
    </Link>
  );
}
