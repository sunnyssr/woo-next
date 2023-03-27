import { load } from "cheerio";
import BlogTagPage from "@/components/_pages/blog-tag";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getPostTags } from "@/lib/api/queries/post-tags";
import { getPosts } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";

export default BlogTagPage;

const POSTS_PER_PAGE = 6;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const pageNumber = Number(ctx.params?.pageNumber?.toString()) || 1;
  const tagSlug = ctx.params?.slug?.toString();

  const tagResp = await getPostTags({
    per_page: 1,
    slug: tagSlug,
  });
  if (!tagResp || !tagResp.tags?.[0]) {
    return {
      notFound: true,
    };
  }

  const postsResp = await getPosts({
    per_page: POSTS_PER_PAGE,
    page: pageNumber,
    tags: tagResp.tags[0].id,
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
      tagSlug: tagSlug,
      tag: tagResp.tags[0],
    },
  };
});
