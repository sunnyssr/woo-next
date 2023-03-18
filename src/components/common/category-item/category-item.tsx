import type { ProductCategoryItem } from "@/lib/types/api";
import Image from "next/image";
import Link from "next/link";

type CategoryItemProps = {
  category: ProductCategoryItem;
};

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <article className=" rounded-md overflow-hidden shadow relative group">
      <Link href={`/category/${props.category.slug}`}>
        <Image
          className="w-full h-auto object-cover object-center aspect-product-image group-hover:scale-125 transition-transform ease-linear duration-200"
          alt={props.category.image?.alt}
          src={props.category.image?.src}
          width={400}
          height={400}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-colors ease-linear duration-200">
          <h2 className="text-3xl text-white tracking-wide">{props.category.name}</h2>
        </div>
      </Link>
    </article>
  );
};

export default CategoryItem;
