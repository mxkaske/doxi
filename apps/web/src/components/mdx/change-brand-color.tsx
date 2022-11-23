"use client";

import colors from "tailwindcss/colors";
import { Select } from "../ui/select";

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const restrictedColors = Object.keys(colors).filter(
  (c) => !["inherit", "current", "transparent", "black", "white"].includes(c)
);

export default function ChangeBrandColor() {
  return (
    <div>
      <Select
        onChange={(e) => {
          const value = e.target.value as keyof typeof colors;
          // TODO: search for the `pre` > * element that has "colors." in the name
          // replace the name with the current value
          Object.keys(colors[value]).map((key) => {
            // @ts-ignore
            const hex = colors[value][key];
            const { r, g, b } = hexToRgb(hex) || {};
            document.documentElement.style.setProperty(
              `--brand-color-${key}`,
              `${r} ${g} ${b}`
            );
          });
        }}
        defaultValue="green"
      >
        {restrictedColors.map((color) => {
          return (
            <option key={color} value={color}>
              {color}
            </option>
          );
        })}
      </Select>
    </div>
  );
}
