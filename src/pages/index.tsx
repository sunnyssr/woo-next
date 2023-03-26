import Storefront from "@/components/_pages/storefront";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getFeaturedProducts } from "@/lib/api/queries/products";

import type { GetServerSideProps } from "next";

export default Storefront;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  const [featuredProducts] = await Promise.all([getFeaturedProducts()]);

  return {
    props: {
      featuredProducts: featuredProducts || [],
    },
  };
});

export const revalidate = 3600;
