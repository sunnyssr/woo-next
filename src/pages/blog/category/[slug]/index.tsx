import { load } from "cheerio";
import BlogCategoryPage from "@/components/_pages/blog-category";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getPosts } from "@/lib/api/queries/posts";

import type { GetServerSideProps } from "next";
import { getCategoryDetailsBySlug } from "@/lib/api/queries/product-categories";
import { getPostCategories } from "@/lib/api/queries/post-categories";

export default BlogCategoryPage;

const POSTS_PER_PAGE = 6;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const pageNumber = Number(ctx.params?.pageNumber?.toString()) || 1;
  const categorySlug = ctx.params?.slug?.toString();

  const categoryResp = await getPostCategories({
    per_page: 1,
    slug: categorySlug,
  });
  if (!categoryResp || !categoryResp.categories?.[0]) {
    return {
      notFound: true,
    };
  }

  const postsResp = await getPosts({
    per_page: POSTS_PER_PAGE,
    page: pageNumber,
    categories: categoryResp.categories[0].id,
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
      categorySlug: categorySlug,
      category: categoryResp.categories[0],
    },
  };
});
