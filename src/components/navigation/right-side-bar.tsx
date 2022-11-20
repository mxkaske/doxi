"use client";

import React from "react";
import cn from "classnames";
import type { Doc } from ".contentlayer/generated";
import ListElement from "./list-element";

type Item = {
  level?: number;
  text: string;
  slug?: string;
};

export default function RightSideBar({ doc }: { doc: Doc }) {
  const headings = doc.headings as Item[];
  const activeSlug = useActiveSlug(headings.map((h) => h.slug!));

  return (
    <ul className="grid gap-2">
      <li>
        <p className="font-bold">On this page</p>
      </li>
      {headings?.map(({ slug, text, level }) => {
        return (
          <ListElement
            key={slug}
            url={`#${slug}`}
            title={text}
            isActive={slug === activeSlug}
            // DISCUSS: about style
            className={cn({
              "ml-3": level === 2,
              "ml-6": level === 3,
            })}
          />
        );
      })}
    </ul>
  );
}

// props to https://github.com/shadcn/taxonomy/blob/main/components/docs/toc.tsx
function useActiveSlug(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // @ts-ignore
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}
