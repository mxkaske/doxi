import { allChapters } from "contentlayer/generated";
import { notFound } from "next/navigation";
import React from "react";
import RightSideBar from "@/components/navigation/right-side-bar";
import LeftSideBar from "@/components/navigation/left-side-bar";
import MobileMenu from "@/components/navigation/mobile-menu";

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chapters: string[] };
}) {
  // we are doing this work twice... also in page.tsx
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.chapters.join("/")}`
  );

  if (!chapter) {
    notFound();
  }
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* TODO: FIXME: add overflow-y */}
      <div className="sticky top-0 hidden w-full max-w-xs self-start p-6 md:block">
        <LeftSideBar />
      </div>
      <div className="sticky top-0 block border-b border-gray-100 bg-white px-6 py-3 md:hidden">
        <MobileMenu />
      </div>
      <div className="h-full flex-1 overflow-auto border-l border-r border-gray-100 p-6">
        {children}
      </div>
      {/* TODO: FIXME: add overflow-y */}
      <div className="sticky top-0 hidden w-full max-w-xs self-start p-6 xl:block">
        <RightSideBar chapter={chapter} />
      </div>
    </div>
  );
}
