import type { DocumentGen } from "contentlayer/core";
import * as fs from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";

export const contentDirPath = "content/docs";

// DISCUSS: this will be the same for all files
export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath)
  );
  return stats.mtime;
};

export type DocHeading = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  slug?: string;
};

// props to https://youssefbouzekri.vercel.app/posts/contentlayer-table-of-contents
export const getHeadings = async (doc: DocumentGen): Promise<DocHeading[]> => {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const slugger = new GithubSlugger();
  // TODO: instead of map, use reduce and only return object if **not undefined**
  const headings: DocHeading[] = Array.from(
    doc.body.raw.matchAll(regXHeader)
  ).map(({ groups }) => {
    const flag = groups?.flag;
    const content = groups?.content;
    return {
      level: flag?.length as keyof DocHeading["level"], // DISCUSS: better ts support
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    };
  });
  return headings;
};

// TODO: pathSegments
// props to https://github.com/contentlayerdev/website/blob/main/src/contentlayer/document/Doc.ts
export const getPathSegments = async (doc: DocumentGen) => {
  return doc._raw.flattenedPath.split("/").map((dirName) => {
    const re = /^((\d+)-)?(.*)$/;
    const [, , orderStr, pathName] = dirName.match(re) ?? [];
    const order = orderStr ? parseInt(orderStr) : 0;
    return { order, pathName };
  });
};

// Because of the "001-", we will need to have
// getUrl and getSlug here as well!
