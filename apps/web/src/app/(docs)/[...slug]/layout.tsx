import { allDocs } from "contentlayer/generated";
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
  const doc = allDocs.find((c) => c.url === `/${params.slug.join("/")}`);

  if (!doc) {
    notFound();
  }
  return (
    <div className="flex w-full flex-1 flex-col lg:container lg:mx-auto lg:flex-row">
      <aside className="sticky top-0 hidden max-h-[calc(100vh-73px)] w-full items-stretch overflow-y-auto p-6 lg:block lg:max-w-[256px]">
        <LeftSideBar />
      </aside>
      <div className="sticky top-0 z-10 block border-b border-gray-100 bg-white lg:hidden">
        <div className="container mx-auto py-3 px-4">
          <MobileMenu />
        </div>
      </div>
      <div className="container mx-auto flex-1 items-stretch overflow-auto border-gray-100 px-4 py-6 lg:max-w-none lg:border-l lg:px-6 xl:border-r">
        {children}
      </div>
      <aside className="sticky top-0 hidden max-h-[calc(100vh-73px)] w-full max-w-[256px] items-stretch overflow-y-auto p-6 xl:block">
        <RightSideBar doc={doc} />
      </aside>
    </div>
  );
}
