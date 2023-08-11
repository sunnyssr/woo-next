import { BlogPostListItem, SlideshowItem } from "@/lib/types/api";
import { wpBaseClient } from "../client";

export const getPosts = async (
  params = {}
): Promise<{ totalPages: number; posts: BlogPostListItem[] } | void> => {
  try {
    const response = await wpBaseClient("GET", "wp/v2/posts", { ...params, _embed: true });
    const totalPages = response.headers.get("x-wp-totalpages");
    const json = await response.json();
    return { posts: json as BlogPostListItem[], totalPages: Number(totalPages) || 1 };
  } catch (error) {
    console.log("[getAllPosts]: error while fetching featured products" + error);
  }
};

export const getSlideshows = async (
  params = {}
): Promise<{ totalPages: number; slideshows: SlideshowItem[] } | void> => {
  try {
    const response = await wpBaseClient("GET", "wp/v2/slideshow", { ...params, _embed: true });
    const totalPages = response.headers.get("x-wp-totalpages");
    const json = await response.json();
    return { slideshows: json as SlideshowItem[], totalPages: Number(totalPages) || 1 };
  } catch (error) {
    console.log("[getSlideshow]: error while fetching featured products" + error);
  }
};
