"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";
import { components } from "@/lib/mdx";
import type { Chapter } from "contentlayer/generated";

// TODO: rename to Content
export default function Chapter({
  chapter,
  rsc_counter,
}: {
  chapter: Chapter;
  rsc_counter: React.ReactNode;
}) {
  const MDXContent = useMDXComponent(chapter.body.code);
  return (
    <div>
      <p className="text-sm font-light text-gray-500">
        {chapter.readingTime} <span>&middot;</span> {rsc_counter}
      </p>
      <div className="prose-code:black prose prose-strong:text-green-500 prose-em:font-light prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-50">
        <h1>{chapter.title}</h1>
        <MDXContent components={components} />
      </div>
    </div>
  );
}
