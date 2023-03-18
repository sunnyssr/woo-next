import CategoryItem from "../category-item/category-item";

import type { ProductCategoryItem } from "@/lib/types/api";

type CategoriesListProps = {
  categories: ProductCategoryItem[];
};
const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
