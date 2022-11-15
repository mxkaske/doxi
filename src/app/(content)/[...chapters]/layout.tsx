import React from "react";
import SideNav from "./side-nav";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="sticky top-0 hidden w-full max-w-xs self-start p-6 md:block">
        <SideNav />
      </div>
      <div className="h-full overflow-auto border-l border-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
