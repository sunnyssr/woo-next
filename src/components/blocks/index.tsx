import Button from "./button";
import Heading from "./heading";
import Paragraph from "./paragraph";
import Slide from "./slide";

export type Block = {
  attrs: Record<string, any> | null;
  blockName: string | null;
  innerBlocks: Block[];
  innerHTML: string;
  innerContent: (string | null)[];
};
type RenderBlocksProps = {
  blocks: Block[];
};

type RenderBlockProps = {
  block: Block;
};

export const RenderBlock = (props: RenderBlockProps) => {
  switch (props.block.blockName) {
    case "headless-woo/heading":
      return <Heading block={props.block} />;
    case "headless-woo/paragraph":
      return <Paragraph block={props.block} />;
    case "headless-woo/slide":
      return <Slide block={props.block} />;
    case "headless-woo/button":
      return <Button block={props.block} />;
    default:
      return null;
  }
};

export const RenderBlocks = (props: RenderBlocksProps) => {
  return (
    <>
      {props.blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </>
  );
};

export default RenderBlocks;
