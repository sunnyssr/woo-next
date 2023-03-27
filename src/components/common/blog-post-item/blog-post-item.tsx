import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import type { BlogPostListItem } from "@/lib/types/api";

type BlogPostItemProps = {
  blogPost: BlogPostListItem;
  darkMode: boolean;
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

const BlogPostItem = (props: BlogPostItemProps) => {
  const featuredMedia = props.blogPost._embedded?.["wp:featuredmedia"]?.[0];

  const featuredMediaLargeSizeUrl = featuredMedia?.media_details?.sizes?.large?.source_url;

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: "some" }}
    >
      <motion.article className=" rounded-md overflow-hidden shadow" variants={cardVariants}>
        <Link href={`/blog/${props.blogPost.slug}`}>
          {featuredMediaLargeSizeUrl ? (
            <Image
              className="w-full h-auto object-cover object-center aspect-product-image"
              src={featuredMediaLargeSizeUrl}
              alt={featuredMedia.alt_text}
              width={400}
              height={400}
            />
          ) : null}
          <span className="sr-only">{props.blogPost.title.rendered}</span>
        </Link>

        <div
          className={`px-6 pt-4 pb-4 ${
            props.darkMode ? "bg-white bg-opacity-10 text-white" : "text-black bg-white"
          } `}
        >
          <Link href={`/blog/${props.blogPost.slug}`}>
            <h3 className="text-2xl mb-1">{props.blogPost.title.rendered}</h3>
          </Link>
          <p className="flex items-center text-sm mb-1">
            <span className="sr-only">by</span>
            <Image
              width={32}
              height={32}
              alt={props.blogPost._embedded.author?.[0]?.name}
              src={props.blogPost._embedded.author?.[0]?.avatar_urls?.[48]}
              className="h-5 w-5 rounded-full"
            />
            <span
              className={`ml-1 tracking-wide ${props.darkMode ? "text-gray-200" : "text-gray-600"}`}
            >
              {props.blogPost._embedded.author?.[0]?.name}
            </span>
          </p>
          <p className={`text-sm ${props.darkMode ? "text-gray-300" : "text-gray-500"}`}>
            {props.blogPost.excerpt.rendered.slice(0, 240)}...
          </p>
          <Link href={`/blog/${props.blogPost.slug}`}>
            <button
              className={`mt-2 transition-colors duration-200 border border-solid text-sm px-4 py-1 rounded-full ${
                props.darkMode
                  ? "text-white border-white hover:bg-white hover:text-black"
                  : "text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              Read More
            </button>
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default BlogPostItem;
