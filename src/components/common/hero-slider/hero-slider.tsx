import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type HeroSliderProps = {
  className?: string;
  slides: {
    image: {
      id: number;
      src: string;
      name: string;
      alt: string;
    };
    title: string;
    description: string;
  }[];
};

const HeroSlider = (props: HeroSliderProps) => {
  const [width, setWidth] = useState(0);
  const innerCarouselRef = useRef<HTMLDivElement>(null as never);

  useEffect(() => {
    if (!innerCarouselRef.current) return;
    setWidth(innerCarouselRef.current?.scrollWidth - innerCarouselRef.current?.offsetWidth);
  }, [props.slides]);

  return (
    <motion.div
      className={`w-full h-screen mx-auto overflow-hidden cursor-grab ${props.className || ""}`}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="flex max-w-max h-full"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={innerCarouselRef}
      >
        {props.slides.map((slide) => (
          <motion.div className={`min-w-full h-full relative`} key={slide.image.id}>
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0))" }}
            />
            <Image
              width={500}
              height={600}
              src={slide.image.src}
              alt={slide.image.alt}
              className="object-cover w-full h-full pointer-events-none select-none aspect-product-image"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSlider;
