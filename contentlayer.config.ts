import { defineDocumentType, makeSource } from "contentlayer/source-files";
import slug from "rehype-slug";
import autolinkHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";
import prettyCode from "rehype-pretty-code";
import GithubSlugger from "github-slugger";

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
    // props to https://youssefbouzekri.vercel.app/posts/contentlayer-table-of-contents
    headings: {
      type: "json",
      // type: "list",
      // of: {
      //   fields: {
      //     level: { type: "string" },
      //   },
      // },
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content/chapters",
  documentTypes: [Chapter],
  mdx: {
    rehypePlugins: [
      slug,
      [
        autolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: [
              "no-underline after:content-['#'] ml-1 after:text-gray-200 hover:after:text-brand-500 hover:after:bg-brand-50 after:rounded-md after:p-1",
            ],
          },
        },
      ],
      [
        prettyCode,
        // https://rehype-pretty-code.netlify.app/
        {
          theme: "github-light",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word"];
          },
        },
      ],
    ],
  },
});
