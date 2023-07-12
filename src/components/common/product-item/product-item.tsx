import type { ProductListItem } from "@/lib/types/api";
import Image from "next/image";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { motion, Variants } from "framer-motion";
import { useCart } from "@/lib/context/cartContext";
import VariantPicker from "../variant-picker/variant-picker";

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
  const { addItemToCart } = useCart();
  const { product } = props;

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: "some" }}
    >
      <motion.article className="rounded-md shadow" variants={cardVariants}>
        <Link href={`/product/${product.slug}`}>
          <Image
            className="w-full h-auto object-cover object-center aspect-product-image rounded-t-md"
            alt={product.images[0]?.alt}
            src={product.images[0]?.src}
            width={400}
            height={400}
          />
          <span className="sr-only">{product.name}</span>
        </Link>

        <div className="px-4 pt-2 pb-4 relative">
          <ul className="text-xs flex justify-start">
            {product.categories.map((category, i, arr) => (
              <li key={category.id}>
                {category.name}
                {i !== arr.length - 1 ? <span className="mx-1">•</span> : ""}
              </li>
            ))}
          </ul>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold">{product.name}</h3>
          </Link>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: product.price_html }}></p>

          <Popover className="relative">
            <Popover.Button
              onClick={() => {
                if (product.type == "simple") {
                  addItemToCart(String(product.id), 1);
                }
              }}
              className="mt-1 transition-colors duration-200 text-black border border-solid border-black text-sm px-4 py-1 rounded-full hover:bg-black hover:text-white"
            >
              Add to Cart
            </Popover.Button>

            {product.type === "variable" ? (
              <Popover.Panel className="absolute z-10 w-full">
                <VariantPicker
                  product={product}
                  containerClassname=" px-6 py-3 bg-white border border-gray-100 border-solid rounded-md shadow-md"
                />
              </Popover.Panel>
            ) : null}
          </Popover>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default ProductItem;
