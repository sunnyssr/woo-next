import BlogSinglePage from "@/components/_pages/blog-single";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getPosts } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";

export default BlogSinglePage;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const postSlug = ctx.params?.slug?.toString();
  if (!postSlug) {
    return {
      notFound: true,
    };
  }

  const postsResp = await getPosts({
    slug: postSlug,
  });
  if (!postsResp || !postsResp.posts?.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: postsResp.posts[0],
    },
  };
});
