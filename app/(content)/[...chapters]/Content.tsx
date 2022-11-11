"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";
import { components } from "@/lib/mdx";
import type { Chapter } from "contentlayer/generated";

export default function Content({
  chapter,
  rsc_counter,
}: {
  chapter: Chapter;
  rsc_counter: React.ReactNode;
}) {
  const MDXContent = useMDXComponent(chapter.body.code);
  return (
    <div>
      <p className="text-gray-500">
        {chapter.readingTime} <span>&middot;</span> {rsc_counter}
      </p>
      <div className="prose">
        <h1>{chapter.title}</h1>
        <MDXContent components={components} />
      </div>
    </div>
  );
}
