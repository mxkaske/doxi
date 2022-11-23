"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function ForkNow() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.open(process.env.NEXT_PUBLIC_GITHUB_URL, "_black");
        }
      }}
    >
      Fork Repository
    </Button>
  );
}
