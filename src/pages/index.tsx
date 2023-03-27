import { load } from "cheerio";
import Storefront from "@/components/_pages/storefront";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getFeaturedProducts } from "@/lib/api/queries/products";
import { getPosts } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";

export default Storefront;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const [featuredProducts, postsResp] = await Promise.all([
    getFeaturedProducts(),
    getPosts({
      per_page: 3,
    }),
  ]);

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
      featuredProducts: featuredProducts || [],
      blogPosts: postsData || [],
    },
  };
});

export const revalidate = 3600;
