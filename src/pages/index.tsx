import { GetServerSideProps } from "next";
import { getFeaturedProducts } from "@/lib/api/queries/products";
import Storefront from "@/components/_pages/storefront";

export default Storefront

export const getServerSideProps: GetServerSideProps = async () => {
  const featuredProducts = await getFeaturedProducts()
  return {
    props: {
      featuredProducts: featuredProducts || [],
    },
  };
};
