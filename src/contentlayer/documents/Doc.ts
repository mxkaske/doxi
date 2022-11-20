import { defineDocumentType } from "contentlayer/source-files";
import readingTime from "reading-time";
import { getHeadings, getLastEditedDate } from "../utils";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
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
    // REMINDER: used for og generation - name property might confuse
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (_) => `/${_._raw.flattenedPath}`,
    },
    // slug: {
    //   type: "string",
    //   resolve: (_) => `${_._raw.flattenedPath}`,
    // },
    lastEdited: {
      type: "date",
      resolve: (_) => getLastEditedDate(_),
    },
    readingTime: {
      type: "string",
      resolve: (_) => readingTime(_.body.raw).text,
    },
    chapter: {
      type: "string",
      resolve: (_) => _._raw.sourceFileDir,
    },
    headings: {
      type: "json",
      resolve: (_) => getHeadings(_),
    },
  },
}));
