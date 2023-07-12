import CartPage from "@/components/_pages/cart";
import { getServerSidePropsWrapper } from "@/lib/getServerSidePropsWrapper";

import type { GetServerSideProps } from "next";

export default CartPage;

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(async (ctx) => {
  return {
    props: {},
  };
});
