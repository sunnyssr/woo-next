import { wpBaseClient } from "../client";

import type { BlogCategoryListItem } from "@/lib/types/api";

export const getPostCategories = async (
  params = {}
): Promise<{ totalPages: number; categories: BlogCategoryListItem[] } | void> => {
  try {
    const response = await wpBaseClient("GET", "wp/v2/categories", { ...params, _embed: true });
    const totalPages = response.headers.get("x-wp-totalpages");
    const json = await response.json();
    return { categories: json as BlogCategoryListItem[], totalPages: Number(totalPages) || 1 };
  } catch (error) {
    console.log("[getPostCategories]: error while fetching post categories" + error);
  }
};
