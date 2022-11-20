"use client";

import { allDocs, type Doc } from "contentlayer/generated";
import { usePathname } from "next/navigation";
import React from "react";
import cn from "classnames";
import ListElement from "./list-element";

function categorizeByFileDir() {
  return allDocs.reduce((prev, curr) => {
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
  }, {} as Record<string, Doc[] | Doc>);
}

export default function LeftSideBar() {
  const pathname = usePathname();

  const categorized = categorizeByFileDir();

  return (
    <ul className="grid gap-2">
      {Object.keys(categorized).map((doc) => {
        const data = categorized[doc];
        // LATER: make it recursive!
        const renderContent = () => {
          if (Array.isArray(data)) {
            // const isActive = pathname?.startsWith(`/${doc}`);
            return (
              <>
                <h5 className={cn("font-bold capitalize")}>
                  {doc.replace("-", " ")}
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
        return <React.Fragment key={doc}>{renderContent()}</React.Fragment>;
      })}
    </ul>
  );
}
