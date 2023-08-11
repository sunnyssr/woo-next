import ProductCategoryPage from "@/components/_pages/product-category";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import {
  getCategoryDetailsBySlug,
  getSubCategoriesByParentId,
} from "@/lib/api/queries/product-categories";
import { getProductsByCategoryId } from "@/lib/api/queries/products";

import type { GetServerSideProps } from "next";

export default ProductCategoryPage;

export const PRODUCTS_PER_PAGE = 12;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (context) => {
  const categorySlug = context.params?.slug?.toString() || "";
  const pageNumber = Number(context.params?.pageNumber?.toString()) || 1;

  if (!categorySlug)
    return {
      notFound: true,
    };

  const category = await getCategoryDetailsBySlug(categorySlug);
  if (!category?.[0]?.id)
    return {
      notFound: true,
    };

  const [subCategories, productsResponse] = await Promise.all([
    getSubCategoriesByParentId(category[0].id),
    getProductsByCategoryId(category[0].id, {
      per_page: PRODUCTS_PER_PAGE,
      page: pageNumber,
    }),
  ]);

  return {
    props: {
      products: productsResponse?.products || [],
      categories: subCategories || [],
      totalPages: productsResponse?.totalPages,
      pageNumber: pageNumber,
      perPage: PRODUCTS_PER_PAGE,
      hasNextPage: pageNumber !== productsResponse?.totalPages,
      categorySlug: categorySlug,
    },
  };
});
