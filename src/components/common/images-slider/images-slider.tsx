import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ImagesSliderProps = {
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
};

const ImagesSlider = (props: ImagesSliderProps) => {
  const [width, setWidth] = useState(0);
  const innerCarouselRef = useRef<HTMLDivElement>(null as never);

  useEffect(() => {
    if (!innerCarouselRef.current) return;
    setWidth(innerCarouselRef.current?.scrollWidth - innerCarouselRef.current?.offsetWidth);
  }, [props.images]);
  return (
    <motion.div
      className="w-full mx-auto overflow-hidden cursor-grab"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="flex gap-x-6"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={innerCarouselRef}
      >
        {props.images.map((image) => (
          <motion.div
            className={`min-w-[80%] ${props.images.length === 1 ? "w-full" : ""}`}
            key={image.id}
          >
            <Image
              width={500}
              height={600}
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full rounded-lg pointer-events-none select-none aspect-product-image"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImagesSlider;
