import CategoryPage from "@/components/_pages/category";
import { getCategoryDetailsBySlug, getSubCategoriesByParentId } from "@/lib/api/queries/categories";
import { getProductsByCategoryId } from "@/lib/api/queries/products";

import type { GetServerSideProps } from "next";

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const subCategories = await getSubCategoriesByParentId(category[0].id);

  const products = await getProductsByCategoryId(category[0].id);

  return {
    props: {
      products: products || [],
      categories: subCategories || [],
    },
  };
};
