import { useEffect, useRef } from "react";
import { SlideshowItem } from "@/lib/types/api";
import { parse } from "@wordpress/block-serialization-default-parser";
import RenderBlocks from "@/components/blocks";

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

  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({
    left: 0,
    x: 0,
  });

  const lastStablePosition = useRef(0);

  useEffect(() => {
    const mouseMoveHandler = function (e: MouseEvent) {
      if (!slidesContainerRef.current) return null;

      const dx = e.clientX - pos.current.x;
      slidesContainerRef.current.scrollLeft = pos.current.left - dx;
    };

    const mouseUpHandler = function (_: MouseEvent) {
      let endPosition = null;
      const slideWidth = slidesContainerRef.current?.clientWidth;
      if (!slideWidth) return null;
      if (Math.abs(slidesContainerRef.current?.scrollLeft - pos.current.left) < slideWidth / 16) {
        endPosition = Math.round(slidesContainerRef.current?.scrollLeft / slideWidth) * slideWidth;
      } else {
        if (slidesContainerRef.current?.scrollLeft - pos.current.left > 0) {
          endPosition = (Math.round(pos.current.left / slideWidth) + 1) * slideWidth;
        } else {
          endPosition = (Math.round(pos.current.left / slideWidth) - 1) * slideWidth;
        }
      }
      if (!slidesContainerRef.current) return null;
      slidesContainerRef.current.scroll({
        behavior: "smooth",
        left: endPosition,
      });

      lastStablePosition.current = slidesContainerRef.current?.scrollLeft!;
      slidesContainerRef.current.style.removeProperty("cursor");
      slidesContainerRef.current.style.removeProperty("user-select");
      // ele.current.style.removeProperty("scroll-snap-type");
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };

    const mouseDownHandler = function (e: MouseEvent) {
      if (!slidesContainerRef.current) return null;
      pos.current = {
        left: slidesContainerRef.current.scrollLeft,
        x: e.clientX,
      };
      slidesContainerRef.current.style.cursor = "grabbing";
      slidesContainerRef.current.style.userSelect = "none";
      slidesContainerRef.current.style.scrollSnapType = "none";
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
    };

    if (!slidesContainerRef.current) return;
    const slidesContainer = slidesContainerRef.current;
    slidesContainer.addEventListener("mousedown", mouseDownHandler);
    return () => {
      slidesContainer.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div className="w-full flex overflow-hidden w-screen h-screen" ref={slidesContainerRef}>
      <RenderBlocks blocks={parsedSlides} />
    </div>
  );
};

export default HeroSlider;
