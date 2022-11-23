import { makeSource } from "contentlayer/source-files";
import slug from "rehype-slug";
import prettyCode from "./src/contentlayer/plugins/pretty-code";
import autolinkHeadings from "./src/contentlayer/plugins/autolink-headings";
import { contentDirPath } from "./src/contentlayer/utils";
import { Doc } from "./src/contentlayer/documents/Doc";

// TODO: add tsconfig import path

export default makeSource({
  contentDirPath,
  documentTypes: [Doc],
  mdx: {
    rehypePlugins: [slug, autolinkHeadings, prettyCode],
  },
});
