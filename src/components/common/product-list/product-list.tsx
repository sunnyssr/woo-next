import ProductItem from "../product-item/product-item";

import type { ProductListItem } from "@/lib/types/api";

type ProductsListProps = {
  products: ProductListItem[];
};
const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
