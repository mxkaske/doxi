import { defineDocumentType } from "contentlayer/source-files";
import readingTime from "reading-time";
import {
  getHeadings,
  getLastEditedDate,
  getPathSegments,
  getUrl,
  getIsIndex,
} from "../utils";

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the static page",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the static page",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the static page",
      required: true,
    },
    // showReadingTime: {
    //   type: "boolean",
    //   description: "Show the reading time of the static page",
    //   default: true,
    //   required: false
    // }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (_) => {
        return getUrl(_);
      },
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
      resolve: (_) => getPathSegments(_),
    },
    isIndex: {
      type: "boolean",
      resolve: (_) => getIsIndex(_),
    }
  },
}));
