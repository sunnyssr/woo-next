import type { ProductListItem } from "@/lib/types/api";
import Image from "next/image";

type ProductItemProps = {
  product: ProductListItem;
};

const ProductItem = (props: ProductItemProps) => {
  return (
    <article className=" rounded-md overflow-hidden shadow">
      <Image
        className="w-full h-auto object-cover object-center aspect-product-image"
        alt={props.product.images[0]?.alt}
        src={props.product.images[0]?.src}
        width={400}
        height={400}
      />

      <div className="px-4 py-2 ">
        <h3 className="">{props.product.name}</h3>

        <p>{props.product.short_description.replace(/<[^>]+>/g, "")}</p>
      </div>
    </article>
  );
};

export default ProductItem;
