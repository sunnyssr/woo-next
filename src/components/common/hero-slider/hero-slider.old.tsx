import { useEffect, useRef, useState } from "react";
import { MotionValue, PanInfo, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SlideshowItem } from "@/lib/types/api";
import { parse } from "@wordpress/block-serialization-default-parser";
import RenderBlocks from "@/components/blocks";
import Container from "../container/container";

type HeroSliderProps = {
  slideshow: SlideshowItem;
  className?: string;
};

const HeroSlider = (props: HeroSliderProps) => {
  const parsedSlides = [
    ...parse(props.slideshow.content.raw || "").filter(
      (block) => block.blockName === "headless-woo/slide"
    ),
    ...parse(props.slideshow.content.raw || "").filter(
      (block) => block.blockName === "headless-woo/slide"
    ),
  ];
  console.log(parsedSlides);

  // return <RenderBlocks blocks={parsedSlides} />;

  const [activeSlide, setActiveSlide] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);

  const innerCarouselRef = useRef<HTMLDivElement>(null as never);
  const carouselContainerRef = useRef<HTMLDivElement>(null as never);

  useEffect(() => {
    setDragPosition(-(activeSlide - 1) * slideWidth);
  }, [activeSlide]);

  const paginate = (change: number) => {
    setActiveSlide((activeSlide) =>
      Math.max(Math.min(activeSlide + change, parsedSlides.length), 1)
    );
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < 0) {
      paginate(1);
    } else {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (!innerCarouselRef.current) return;
    setSlideWidth(innerCarouselRef.current?.offsetWidth);
  }, [props.slides]);

  return (
    <motion.div
      ref={carouselContainerRef}
      className={`w-full h-screen mx-auto overflow-hidden cursor-grab ${props.className || ""}`}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="flex max-w-max h-full"
        drag="x"
        dragConstraints={{
          right: -Math.max(activeSlide - 2, 0) * slideWidth,
          left: -Math.min(activeSlide, parsedSlides.length - 1) * slideWidth,
        }}
        ref={innerCarouselRef}
        dragElastic={0}
        animate={{ x: dragPosition, y: 0 }}
        onDragEnd={handleDragEnd}
      >
        {parsedSlides.map((slide, i) => (
          <motion.div className={`min-w-full h-full relative`} key={i}>
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0))" }}
            />
            {slide.attrs && slide.attrs?.["imageUrl"] ? (
              <Image
                width={500}
                height={600}
                src={slide.attrs["imageUrl"]}
                alt={slide.attrs["alt"]}
                className="object-cover w-full h-full pointer-events-none select-none aspect-product-image"
              />
            ) : null}
            <div className="absolute top-0 left-0 h-full w-full px-8 py-8 flex justify-center items-center flex-col">
              <Container className="px-6">
                <RenderBlocks blocks={slide.innerBlocks} />
              </Container>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSlider;
