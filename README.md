# Doxi

An open source application built with Next.js 13 and the new `/app` directory.

> **Warning**
> This project is a work in progress.

## About this project

Currently, I'm building this project to create a simple and customizable documentation template to easily start with.

It includes some crutial _stuff_ that matters for documentation pages (besides a well written content 😉):

- Table of Content
- Sidebar
- MDX support
- dynamic Open Graph images

It uses `contentlayer` for typesafety-ness. With support for Notion, Contentful,.. in the future, it has the potential to grow.

It comes with an opinionated styling framework: `tailwindcss` 🐐.

TODO:

- [ ] add dark mode support
- [ ] add pagination at the bottom of the page
- [ ] add page/doc order ("001-doc-slug")
- [ ] add voting system to determine quality of page (upstash/redis)
- [ ] make env vars typesafer!
- [ ] reduce dependencies to the bare minimum (e.g. cva, classnames,...)
- [ ] ...
