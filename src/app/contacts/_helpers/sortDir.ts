export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

function isSortDir(sortDir: string): sortDir is SortDirection {
  return (SORT_DIRECTIONS as readonly string[]).includes(sortDir);
}

export function getSortDir(searchParams?: {
  sort: string | string[];
}): SortDirection {
  const defaultSortDir = "asc";

  if (!searchParams) {
    return defaultSortDir;
  }

  const sortDir =
    searchParams.sort instanceof Array
      ? searchParams.sort[0]!
      : searchParams?.sort;

  return isSortDir(sortDir) ? sortDir : defaultSortDir;
}
