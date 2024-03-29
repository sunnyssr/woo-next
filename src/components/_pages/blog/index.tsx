import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Container from "@/components/common/container/container";
import Layout from "@/components/common/layout/layout";
import BlogPostsList from "@/components/common/blog-posts-list/blog-posts-list";

import type { BlogPostListItem } from "@/lib/types/api";

type BlogsListPageProps = {
  posts: BlogPostListItem[];
  pageNumber: number;
  perPage: number;
  hasNextPage: boolean;
};

const BlogsListPage = (props: BlogsListPageProps) => {
  return (
    <Layout>
      <div className="w-full py-12 bg-black">
        <Container>
          <h2 className="text-3xl font-bold tracking-wide text-center text-white">Blog</h2>
        </Container>
      </div>
      <main>
        <Container className="w-full py-12">
          <BlogPostsList blogPosts={props.posts} />
          <div className="flex items-center justify-between w-full py-6">
            {props.pageNumber !== 1 ? (
              <Link href={`/blog/page/${props.pageNumber - 1}`}>
                <button className="border shadow-sm flex py-1.5 pr-4 pl-3 rounded-md border-gray-300 items-center hover:bg-gray-50">
                  <ChevronLeftIcon className="w-5 h-5" />
                  Previous
                </button>
              </Link>
            ) : (
              <div></div>
            )}
            {props.hasNextPage ? (
              <Link href={`/blog/page/${props.pageNumber + 1}`}>
                <button className="border shadow-sm flex py-1.5 pr-3 pl-4 rounded-md border-gray-300 items-center hover:bg-gray-50">
                  Next <ChevronRightIcon className="w-5 h-5" />
                </button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export default BlogsListPage;
