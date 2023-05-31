import { defineDocumentType } from "contentlayer/source-files";
import readingTime from "reading-time";
import {
  getHeadings,
  getLastEditedDate,
  getPathSegments,
  getUrl,
} from "../utils";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
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
      resolve: (_) => getUrl(_),
    },
    lastEdited: {
      type: "date",
      resolve: (_) => getLastEditedDate(_),
    },
    readingTime: {
      type: "string",
      resolve: (_) => readingTime(_.body.raw).text,
    },
    headings: {
      type: "json",
      resolve: (_) => getHeadings(_),
    },
    pathSegments: {
      type: "json",
      resolve: (_) => getPathSegments(_, "/docs"),
    },
  },
}));
