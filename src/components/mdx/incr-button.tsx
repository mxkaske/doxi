"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function IncrButton() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return <Button onClick={onClick}>Increase current number ({count})</Button>;
}
