import { makeSource } from "contentlayer/source-files";
import slug from "rehype-slug";
import prettyCode from "./src/contentlayer/plugins/pretty-code";
import autolinkHeadings from "./src/contentlayer/plugins/autolink-headings";
import { contentDirPath } from "./src/contentlayer/utils";
import * as documentTypes from "./src/contentlayer";

// TODO: add tsconfig import path

export default makeSource({
  contentDirPath,
  documentTypes,
  mdx: {
    rehypePlugins: [slug, autolinkHeadings, prettyCode],
  },
});
