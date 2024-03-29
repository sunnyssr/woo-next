import ProductPage from "@/components/_pages/product";
import {
  getProductById,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/api/queries/products";

import type { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { getStaticPropsWrapper } from "@/lib/getStaticPropsWrapper";

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const productsResponse = await getProducts({ per_page: 100 });

  return {
    paths: productsResponse?.products?.map((product) => ({
      params: {
        // Todo:  change to slug
        slug: product.slug,
      },
    })),
    fallback: "blocking",
  } as GetStaticPathsResult;
};

export const getStaticProps: GetStaticProps = getStaticPropsWrapper(async (context) => {
  const productSlug = context.params?.slug?.toString() || "";
  const products = await getProductBySlug(productSlug);

  const product = products?.[0];

  if (!product && !Number.isNaN(Number(productSlug))) {
    const product = await getProductById(productSlug);
    if (product) {
      return { redirect: { destination: `product/${product.slug}` }, props: {} };
    }
  }
  if (!product) {
    return {
      notFound: true,
    };
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return {
    props: {
      product: product,
      relatedProducts: relatedProducts || [],
    },
    revalidate: 15 * 60,
  };
});
