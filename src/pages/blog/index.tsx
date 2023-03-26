import { load } from "cheerio";
import BlogsListPage from "@/components/_pages/blog";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getPosts } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";

export default BlogsListPage;

const POSTS_PER_PAGE = 3;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const pageNumber = Number(ctx.params?.pageNumber?.toString()) || 1;
  const postsResp = await getPosts({
    per_page: POSTS_PER_PAGE,
    page: pageNumber,
  });
  if (!postsResp) {
    return {
      notFound: true,
    };
  }
  const postsData = await Promise.all(
    postsResp.posts.map((post) => {
      post.excerpt.rendered = load(post.excerpt.rendered).text();
      return post;
    })
  );
  return {
    props: {
      posts: postsData || [],
      pageNumber: pageNumber,
      perPage: POSTS_PER_PAGE,
      hasNextPage: pageNumber !== postsResp.totalPages,
    },
  };
});
