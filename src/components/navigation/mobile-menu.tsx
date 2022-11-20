"use client";

import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import LeftSideBar from "./left-side-bar";
import BarsIcon from "@/icons/Bars";
import XMarkIcon from "@/icons/XMark";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      {/* asChild will add a `appearance: button` */}
      <Collapsible.Trigger asChild className="cursor-pointer appearance-none">
        <div className="flex justify-between font-light">
          <span>Documentation</span>
          {open ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <BarsIcon className="h-5 w-5" />
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="py-2">
        <LeftSideBar />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
