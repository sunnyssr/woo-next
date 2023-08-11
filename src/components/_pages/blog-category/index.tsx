import Container from "@/components/common/container/container";
import Layout from "@/components/common/layout/layout";
import BlogPostsList from "@/components/common/blog-posts-list/blog-posts-list";
import Pagination from '@/components/common/pagination/pagination';

import type { BlogCategoryListItem, BlogPostListItem } from "@/lib/types/api";

type BlogCategoryPageProps = {
  posts: BlogPostListItem[];
  pageNumber: number;
  perPage: number;
  hasNextPage: boolean;
  categorySlug: string;
  category: BlogCategoryListItem;
};

const BlogCategoryPage = (props: BlogCategoryPageProps) => {
  return (
    <Layout>
      <div className="w-full py-12 bg-black">
        <Container>
          <h2 className="text-3xl font-bold tracking-wide text-center text-white">Blog</h2>
        </Container>
      </div>
      <main>
        <Container className="w-full py-8">
          <h3 className="text-4xl font-light mb-8">Category: {props.category.name}</h3>
          <BlogPostsList blogPosts={props.posts} />
          <Pagination
            pageNumber={props.pageNumber}
            commonPath={`/blog/category/${props.categorySlug}`}
            hasNextPage={props.hasNextPage}
          />
        </Container>
      </main>
    </Layout>
  );
};

export default BlogCategoryPage;
