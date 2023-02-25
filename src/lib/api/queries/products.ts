import { ProductListItem } from "@/lib/types/api";
import { wooClient } from "../client";
import { WOO_GET_PRODUCTS_ENDPOINT } from "../endpoints"

export const getFeaturedProducts = async (): Promise<ProductListItem[] | void> => {
  try {
    const response = await wooClient.get(WOO_GET_PRODUCTS_ENDPOINT, { featured: true })
    const json = response.data
    return json as ProductListItem[];
  } catch (error) {
    console.log("[getFeaturedProducts]: error while fetching featured products" + error)
  }
}

export const getProductBySlug = async (productSlug: string) => {
  try {
    const response = await wooClient.get(WOO_GET_PRODUCTS_ENDPOINT, { slug: productSlug })
    const json = response.data
    return json;
  } catch (error) {
    console.log("[getProductBySlug]: error while fetching featured products" + error)
  }
}