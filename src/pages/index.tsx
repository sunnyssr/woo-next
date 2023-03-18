import { getFeaturedProducts } from "@/lib/api/queries/products";
import Storefront from "@/components/_pages/storefront";

import type { GetServerSideProps } from "next";
import { getMainCategories } from "@/lib/api/queries/categories";

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
