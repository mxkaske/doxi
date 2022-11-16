"use client";

import React from "react";
import SideNav from "./side-nav";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function BaseNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="sticky top-0 hidden w-full max-w-xs self-start p-6 md:block">
        <SideNav />
      </div>
      {/* DISCUSS: put the padding into the Trigger to increase expected clickable area */}
      <div className="sticky top-0 block border-b border-gray-100 bg-white px-6 py-3 md:hidden">
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          {/* asChild will add a `appearance: button` */}
          <Collapsible.Trigger
            asChild
            className="cursor-pointer appearance-none"
          >
            <div className="flex justify-between font-light">
              <span>Content</span>
              {open ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars2Icon className="h-5 w-5" />
              )}
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className="py-2">
            <SideNav />
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </>
  );
}
