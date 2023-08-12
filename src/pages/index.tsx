import { load } from "cheerio";
import Storefront from "@/components/_pages/storefront";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getFeaturedProducts } from "@/lib/api/queries/products";
import { getPosts, getSlideshows } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";

export default Storefront;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const [featuredProducts, postsResp, slideshowsResp] = await Promise.all([
    getFeaturedProducts(),
    getPosts({
      per_page: 3,
    }),
    getSlideshows({ context: "edit" }),
  ]);

  if (!postsResp) {
    return {
      notFound: true,
    };
  }

  const postsData = await Promise.all(
    (postsResp.posts || []).map((post) => {
      post.excerpt.rendered = load(post.excerpt.rendered).text();
      return post;
    })
  );

  return {
    props: {
      featuredProducts: featuredProducts || [],
      blogPosts: postsData || [],
      slideshow: slideshowsResp?.slideshows?.[0] || null,
    },
  };
});

export const revalidate = 3600;
