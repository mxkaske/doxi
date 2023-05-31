import React from "react";
import RightSideBar from "@/components/layout/right-side-bar";
import LeftSideBar from "@/components/layout/left-side-bar";
import MobileMenu from "@/components/layout/mobile-menu";
import { getDocBySlug } from "./utils";
import { Metadata } from "next";

const URL = process.env.NEXT_PUBLIC_DOCUMENTATION_URL;
const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const doc = getDocBySlug(params.slug);
  const title = `${NAME} - ${doc.title}`;
  const image = `${URL}/api/og?title=${encodeURIComponent(
    doc.title
  )}&excerpt=${encodeURIComponent(doc.excerpt)}&chapter=${encodeURIComponent(
    doc.pathSegments[0].pathName
  )}`;
  return {
    title,
    description: doc.excerpt,
    openGraph: {
      type: "website",
      url: `${URL}${doc.url}`,
      title,
      description: doc.excerpt,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: doc.excerpt,
      images: [image],
    },
  };
}

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const doc = getDocBySlug(params.slug);
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
