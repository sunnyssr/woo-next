import { ProductListItem } from "@/lib/types/api";
import { wpBaseClient } from "../client";
import { WOO_GET_PRODUCTS_ENDPOINT } from "../endpoints";

export const getProducts = async (
  query: Record<string, any> = {}
): Promise<{ totalPages: number; products: ProductListItem[] } | void> => {
  try {
    const response = await wpBaseClient("GET", WOO_GET_PRODUCTS_ENDPOINT, query);
    const json = await response.json();
    const totalPages = response.headers.get("x-wp-totalpages");
    return { products: json, totalPages: Number(totalPages) || 1 };
  } catch (error) {
    console.log("[getProducts]: error while fetching products" + error);
  }
};

export const getFeaturedProducts = async (
  query: Record<string, any> = {}
): Promise<ProductListItem[] | void> => {
  const productsResponse = await getProducts({ ...query, featured: true });
  return productsResponse?.products;
};

export const getProductsByCategoryId = async (
  categoryId: number,
  query: Record<string, any> = {}
): Promise<{ totalPages: number; products: ProductListItem[] } | void> => {
  return getProducts({ ...query, category: categoryId });
};

export const getProductBySlug = async (productSlug: string): Promise<ProductListItem[] | void> => {
  const productsResponse = await getProducts({ slug: productSlug });
  return productsResponse?.products;
};

export const getProductById = async (id: string): Promise<ProductListItem | void> => {
  try {
    const response = await wpBaseClient("GET", `${WOO_GET_PRODUCTS_ENDPOINT}/${id}`, {});
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("[getProductBySlug]: error while fetching featured products" + error);
  }
};

export const getRelatedProducts = async (id: number): Promise<ProductListItem[] | void> => {
  try {
    const response = await wpBaseClient("GET", `hw/v1/products/related/`, {
      id,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("[getProductBySlug]: error while fetching featured products" + error);
  }
};
