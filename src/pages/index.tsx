import { getFeaturedProducts } from "@/lib/api/queries/products";
import Storefront from "@/components/_pages/storefront";
import { getMainCategories } from "@/lib/api/queries/categories";

import type { GetServerSideProps } from "next";

export default Storefront;

export const getServerSideProps: GetServerSideProps = async () => {
  const featuredProducts = await getFeaturedProducts();
  const mainCategories = await getMainCategories();
  if (!mainCategories) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      featuredProducts: featuredProducts || [],
      mainCategories:
        mainCategories
          .filter((c) => c.slug !== "uncategorized")
          .sort((a, b) => a.menu_order - b.menu_order) || [],
    },
  };
};

export const revalidate = 3600;
