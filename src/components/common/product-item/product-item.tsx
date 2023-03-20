import type { ProductListItem } from "@/lib/types/api";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

type ProductItemProps = {
  product: ProductListItem;
};
const cardVariants: Variants = {
  offscreen: {
    y: 100,
    rotate: -10,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ProductItem = (props: ProductItemProps) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: "some" }}
    >
      <motion.article className=" rounded-md overflow-hidden shadow" variants={cardVariants}>
        <Link href={`/product/${props.product.slug}`}>
          <Image
            className="w-full h-auto object-cover object-center aspect-product-image"
            alt={props.product.images[0]?.alt}
            src={props.product.images[0]?.src}
            width={400}
            height={400}
          />
          <span className="sr-only">{props.product.name}</span>
        </Link>

        <div className="px-4 pt-2 pb-4 ">
          <ul className="text-xs flex justify-start">
            {props.product.categories.map((category, i, arr) => (
              <li key={category.id}>
                {category.name}
                {i !== arr.length - 1 ? <span className="mx-1">•</span> : ""}
              </li>
            ))}
          </ul>
          <Link href={`/product/${props.product.slug}`}>
            <h3 className="font-semibold">{props.product.name}</h3>
          </Link>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: props.product.price_html }}></p>
          <button className="mt-1 transition-colors duration-200 text-black border border-solid border-black text-sm px-4 py-1 rounded-full hover:bg-black hover:text-white">
            Add to Cart
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default ProductItem;
