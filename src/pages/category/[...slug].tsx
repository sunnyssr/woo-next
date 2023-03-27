import CategoryPage from "@/components/_pages/category";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import {
  getCategoryDetailsBySlug,
  getSubCategoriesByParentId,
} from "@/lib/api/queries/product-categories";
import { getProductsByCategoryId } from "@/lib/api/queries/products";

import type { GetServerSideProps } from "next";

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (context) => {
  const categorySlug = context.params?.slug?.[context.params?.slug?.length - 1];

  if (!categorySlug)
    return {
      notFound: true,
    };

  const category = await getCategoryDetailsBySlug(categorySlug);
  if (!category?.[0]?.id)
    return {
      notFound: true,
    };

  const [subCategories, products] = await Promise.all([
    getSubCategoriesByParentId(category[0].id),
    getProductsByCategoryId(category[0].id),
  ]);

  return {
    props: {
      products: products || [],
      categories: subCategories || [],
    },
  };
});
