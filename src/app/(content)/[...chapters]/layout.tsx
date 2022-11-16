import React from "react";
import BaseNav from "./base-nav";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <BaseNav />
      <div className="h-full overflow-auto border-l border-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
