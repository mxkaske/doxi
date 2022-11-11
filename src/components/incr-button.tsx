"use client";

import { useState } from "react";

export function IncrButton() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <button className="border border-gray-300" onClick={onClick}>
      Increase current number ({count})
    </button>
  );
}
