import React from "react";
import Image from "next/image";

import Container from "@/components/common/container/container";

import RenderBlocks, { type Block } from "..";

type SlideProps = {
  block: Block;
};

const getInnerContentContainerClasses = (attrs: Block["attrs"]) => {
  const align = attrs?.["align"] || "left";

  const classes: string[] = []
  const alignAttributeToStyle: Record<string, string> = {
    "left": "text-left",
    "center": "text-center",
    "right": "text-right",
  }
  classes.push(alignAttributeToStyle[align])
  return classes.join(" ")
}

const Slide = (props: SlideProps) => {
  const imageUrl = props.block.attrs?.["imageUrl"];
  const alt = props.block.attrs?.["alt"];
  // const align = props.block.attrs?.["align"] || "left";
  const innerContentContainerClasses = getInnerContentContainerClasses(props.block.attrs)

  return <div className="min-w-full h-full relative pointer-events-none select-none">
    <div
      className="absolute top-0 left-0 h-full w-full"
      style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0))" }}
    />
    {imageUrl ? (
      <Image
        width={500}
        height={600}
        src={imageUrl}
        alt={alt}
        className="object-cover w-full h-full pointer-events-none select-none aspect-product-image"
      />
    ) : null}
    <div className="absolute top-0 left-0 h-full w-full px-8 py-8 flex justify-center items-center flex-col">
      <Container className={`px-6 ${innerContentContainerClasses}`}>
        <RenderBlocks blocks={props.block.innerBlocks} />
      </Container>
    </div>
  </div>

};

export default Slide;
