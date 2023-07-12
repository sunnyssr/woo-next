import BlogPostItem from "../blog-post-item/blog-post-item";

import type { BlogPostListItem } from "@/lib/types/api";

type BlogPostsListProps = {
  blogPosts: BlogPostListItem[];
  darkMode?: boolean;
};
const BlogPostsList = ({ blogPosts, darkMode = false }: BlogPostsListProps) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogPosts.map((blogPost) => (
        <BlogPostItem key={blogPost.id} blogPost={blogPost} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default BlogPostsList;
