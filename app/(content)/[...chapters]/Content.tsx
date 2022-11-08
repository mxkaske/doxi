"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import React, { use, cache } from "react";
import { components } from "@/lib/mdx";
import { allChapters } from "contentlayer/generated";

// REMINDER: the problem is in the cache!
// github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#caveat-data-requests-must-be-cached-between-replays
const fetchChapter = cache(async (url: string) => {
  const chapter = allChapters.find((c) => c.url === url);
  return chapter;
});

export default function Content({
  url,
  rsc_counter,
}: {
  url: string;
  rsc_counter: React.ReactNode;
}) {
  const data = use(fetchChapter(url));
  if (!data) {
    notFound();
  }
  const MDXContent = useMDXComponent(data.body.code);
  return (
    <div>
      <p className="text-gray-500">
        {data.readingTime} <span>&middot;</span> {rsc_counter}
      </p>
      <div className="prose">
        <h1>{data.title}</h1>
        <MDXContent components={components} />
      </div>
    </div>
  );
}
