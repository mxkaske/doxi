import React from "react";
import SideNav from "./side-nav";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <div className="sticky top-0 w-full max-w-xs self-start border border-red-500 p-6">
        <SideNav />
      </div>
      <div className="overflow-auto border border-blue-500 p-6">{children}</div>
    </div>
  );
}
