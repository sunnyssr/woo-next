import ProductPage from "@/components/_pages/product";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";
import { getProductById, getProductBySlug } from "@/lib/api/queries/products";

import type { GetServerSideProps } from "next";

export default ProductPage;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (context) => {
  const productSlug = context.params?.slug?.toString() || "";
  const products = await getProductBySlug(productSlug);
  if (!products)
    return {
      notFound: true,
    };
  const productDetails = await getProductById(String(products[0]?.id));
  console.log(productDetails);
  return {
    props: {
      product: productDetails,
    },
  };
});
