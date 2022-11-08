import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import slug from "rehype-slug";
import autolinkHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (chapter) => `/${chapter._raw.flattenedPath}`,
    },
    // slug: {
    //   type: "string",
    //   resolve: (chapter) => `${chapter._raw.flattenedPath}`,
    // },
    readingTime: {
      type: "string",
      resolve: (_) => readingTime(_.body.raw).text,
    },
    chapter: {
      type: "string",
      resolve: (_) => _._raw.sourceFileDir,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/chapters",
  documentTypes: [Chapter],
  mdx: {
    rehypePlugins: [
      highlight,
      slug,
      [
        autolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: [
              "no-underline after:content-['#'] after:ml-1 after:text-gray-200 hover:after:text-gray-400 after:p-1",
            ],
          },
        },
      ],
    ],
  },
});
