import ProductCategoryPage from "@/components/_pages/product-category";
import { getServerSideProps as _getServerSideProps } from "@/pages/category/[slug]";

export default ProductCategoryPage;

export const getServerSideProps = _getServerSideProps;
