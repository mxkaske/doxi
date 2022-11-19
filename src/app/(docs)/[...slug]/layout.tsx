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
  params: { slug: string[] };
}) {
  // we are doing this work twice... also in page.tsx
  const chapter = allChapters.find(
    (c) => c._raw.flattenedPath === `${params.slug.join("/")}`
  );

  if (!chapter) {
    notFound();
  }
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row">
      {/* REMINDER: max-h-[calc(h-screen - h-header)] */}
      <aside className="sticky top-0 hidden max-h-[calc(100vh-73px)] w-full max-w-xs items-stretch overflow-y-auto border-r border-gray-100 p-6 md:block">
        <LeftSideBar />
      </aside>
      <div className="sticky top-0 block border-b border-gray-100 bg-white px-6 py-3 md:hidden">
        <MobileMenu />
      </div>
      <div className="h-full flex-1 overflow-auto p-6">{children}</div>
      <aside className="sticky top-0 hidden max-h-[calc(100vh-73px)] w-full max-w-xs items-stretch overflow-y-auto border-l border-gray-100 p-6 xl:block">
        <RightSideBar chapter={chapter} />
      </aside>
    </div>
  );
}
