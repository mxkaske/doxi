"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";
import { components } from "@/lib/mdx";
import type { Doc } from "contentlayer/generated";

export default function Content({
  doc,
  rsc_counter,
}: {
  doc: Doc;
  rsc_counter: React.ReactNode;
}) {
  const MDXContent = useMDXComponent(doc.body.code);
  return (
    <div>
      <p className="mb-2 text-sm font-extralight text-gray-500">
        {doc.readingTime} <span>&middot;</span> {rsc_counter}
      </p>
      <article className="prose-code:black prose max-w-none prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50 prose-blockquote:text-brand-900 prose-strong:text-brand-500 prose-em:font-light prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-50">
        <h1>{doc.title}</h1>
        <MDXContent components={components} />
      </article>
      <p className="mt-6 text-sm font-extralight text-gray-500">
        last edited: {new Date(doc.lastEdited).toLocaleDateString("en-US")}
      </p>
    </div>
  );
}
