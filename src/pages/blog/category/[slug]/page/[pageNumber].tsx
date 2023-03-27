import BlogCategoryPage from "@/components/_pages/blog-category";
import { getServerSideProps as _getServerSideProps } from "@/pages/blog/category/[slug]";

export default BlogCategoryPage;

export const getServerSideProps = _getServerSideProps;
