import { allChapters } from "contentlayer/generated";

// TODO: this is temporary to fix the `use` loop
// https://twitter.com/jherr/status/1589645715151593472?s=20&t=X_o9dBeUD94i8O_ul-srRQ
// HACK

export function makeQueryClient() {
  const fetchMap = new Map<string, Promise<any>>();
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name)!;
  };
}

export async function fetchChapter(url: string) {
  const chapter = allChapters.find((c) => c.url === url);
  return chapter;
}

export async function fetchChapters() {
  const chapters = allChapters;
  return chapters;
}
