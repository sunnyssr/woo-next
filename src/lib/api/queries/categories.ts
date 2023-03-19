import { ProductCategoryItem, ProductListItem } from "@/lib/types/api";
import { wooClient } from "../client";
import { WOO_GET_CATEGORIES_ENDPOINT } from "../endpoints";

export const getMainCategories = async (): Promise<ProductCategoryItem[] | void> => {
  try {
    const response = await wooClient.get(WOO_GET_CATEGORIES_ENDPOINT, { parent: 0 });
    const json = await response.json();
    console.log(json);
    return json as ProductCategoryItem[];
  } catch (error) {
    console.log("[getMainCategories]: error while fetching main categories" + error);
  }
};

export const getCategoryDetailsBySlug = async (
  categorySlug: string
): Promise<ProductCategoryItem[] | void> => {
  try {
    const response = await wooClient.get(WOO_GET_CATEGORIES_ENDPOINT, { slug: categorySlug });
    const json = await response.json();
    return json as ProductCategoryItem[];
  } catch (error) {
    console.log("[getCategoryDetailsBySlug]: error while fetching category details" + error);
  }
};

export const getSubCategoriesByParentId = async (
  parentCategoryId: number
): Promise<ProductCategoryItem[] | void> => {
  try {
    const response = await wooClient.get(WOO_GET_CATEGORIES_ENDPOINT, { parent: parentCategoryId });
    const json = await response.json();
    return json as ProductCategoryItem[];
  } catch (error) {
    console.log("[getSubCategoriesByParentId]: error while fetching subcategories" + error);
  }
};
