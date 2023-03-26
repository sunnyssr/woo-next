import BlogPostItem from "../blog-post-item/blog-post-item";

import type { BlogPostListItem } from "@/lib/types/api";

type BlogPostsListProps = {
  blogPosts: BlogPostListItem[];
};
const BlogPostsList = ({ blogPosts }: BlogPostsListProps) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogPosts.map((blogPost) => (
        <BlogPostItem key={blogPost.id} blogPost={blogPost} />
      ))}
    </div>
  );
};

export default BlogPostsList;
