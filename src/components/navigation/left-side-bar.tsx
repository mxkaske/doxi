"use client";

import { allDocs, type Doc } from "contentlayer/generated";
import { usePathname } from "next/navigation";
import React from "react";
import { PathSegments } from "src/contentlayer/utils";
import ListElement from "./list-element";

// TODO: currently, only mdx files with a sourceFileDir !== "." are allowed
function docsTree() {
  return allDocs.reduce((prev, curr) => {
    const pathSegments = curr.pathSegments as PathSegments;
    const chapter = pathSegments[0].pathName.replace("-", " ");
    if (Array.isArray(prev[chapter])) {
      prev[chapter].push(curr);
    } else {
      prev[chapter] = [curr];
    }
    return prev;
  }, {} as Record<string, Doc[]>);
}

export default function LeftSideBar() {
  const pathname = usePathname();
  const tree = docsTree();

  return (
    <ul className="grid gap-2">
      {Object.keys(tree).map((chapter) => {
        const data = tree[chapter];
        return (
          <React.Fragment key={chapter}>
            <h5 className="font-bold capitalize">{chapter}</h5>
            {data.map(({ url, title }) => {
              const isActive = pathname === url;
              return <ListElement key={url} {...{ url, title, isActive }} />;
            })}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
