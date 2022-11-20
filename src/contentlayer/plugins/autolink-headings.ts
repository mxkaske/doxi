import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type * as unified from "unified";

const autolinkHeadings: unified.Pluggable<any[]> = [
  rehypeAutolinkHeadings,
  {
    behavior: "append",
    properties: {
      className: [
        "no-underline after:content-['#'] ml-1 after:text-gray-200 hover:after:text-brand-500 hover:after:bg-brand-50 after:rounded-md after:p-1",
      ],
    },
  },
];

export default autolinkHeadings;
