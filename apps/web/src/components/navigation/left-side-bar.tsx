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
    // console.log(pathSegments);
    const chapter = pathSegments[0].pathName.replace("-", " ");
    if (Array.isArray(prev[chapter])) {
      prev[chapter].push(curr);
    } else {
      prev[chapter] = [curr];
    }
    return prev;
  }, {} as Record<string, Doc[]>);
}

type Node = {
  doc?: Doc;
  children: Node[];
};

// TODO: FIXME: instead of parentPathNames, pass parentPathSegments
function buildTree(docs: Doc[], parentPathNames: string[] = []): Node[] {
  const level = parentPathNames.length;
  // console.log(parentPathNames);
  const children = docs
    .filter((_) => {
      const pathSegments = _.pathSegments as PathSegments;
      return (
        pathSegments.length === level + 1 && // REMINDER: that means it is a leave
        pathSegments
          .map((_) => _.pathName)
          .join("/")
          .startsWith(parentPathNames.join("/"))
      );
    })
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<Node>((doc) => {
      const pathSegments = doc.pathSegments as PathSegments;
      // console.log(pathSegments);
      return {
        doc,
        children: buildTree(
          docs,
          pathSegments.map((_) => _.pathName)
        ),
      };
    });

  // no leafs
  const pathNames = [
    ...new Set(
      docs
        .filter((_) => {
          const pathSegments = _.pathSegments as PathSegments;
          return (
            // REMINDER: opposite
            // pathSegments.length > 0 &&
            pathSegments.length !== level + 1 &&
            pathSegments
              .map((_) => _.pathName)
              .join("/")
              .startsWith(parentPathNames.join("/"))
          );
        })
        .map((_) => {
          const pathSegments = _.pathSegments as PathSegments;
          return pathSegments[0].pathName;
        })
    ),
  ];

  // console.log(pathNames, children.length);

  if (
    pathNames.length > 0 &&
    parentPathNames.length > 0 &&
    pathNames[0] === parentPathNames[0]
  ) {
    console.log("subfolder");
    // console.log(pathNames, parentPathNames);
    return children;
  }
  const a = pathNames.map((path) => ({
    doc: undefined,
    children: buildTree(docs, [path]),
  }));

  // console.log(children);
  // FIXME: potentially wrong order
  return [...children, ...a];
}

export default function LeftSideBar() {
  const pathname = usePathname();
  const tree = docsTree();

  // const t = buildTree(allDocs, ["getting-started"]);
  // const t = buildTree(allDocs);

  // console.log(t);

  return (
    <ul className="grid gap-2">
      {Object.keys(tree).map((chapter) => {
        const doc = tree[chapter];
        return (
          <React.Fragment key={chapter}>
            <h5 className="font-bold capitalize">{chapter}</h5>
            {doc.map(({ url, title }) => {
              const isActive = pathname === url;
              return <ListElement key={url} {...{ url, title, isActive }} />;
            })}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
