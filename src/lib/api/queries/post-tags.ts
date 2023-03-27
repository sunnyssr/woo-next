import { wpBaseClient } from "../client";

import type { BlogTaxonomyListItem } from "@/lib/types/api";

export const getPostTags = async (
  params = {}
): Promise<{ totalPages: number; tags: BlogTaxonomyListItem[] } | void> => {
  try {
    const response = await wpBaseClient("GET", "wp/v2/tags", { ...params, _embed: true });
    const totalPages = response.headers.get("x-wp-totalpages");
    const json = await response.json();
    return { tags: json as BlogTaxonomyListItem[], totalPages: Number(totalPages) || 1 };
  } catch (error) {
    console.log("[getPostTags]: error while fetching post tags" + error);
  }
};
