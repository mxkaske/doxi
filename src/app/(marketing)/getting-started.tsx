"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function GettingStarted() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/introduction");
      }}
    >
      Getting Started
    </Button>
  );
}
