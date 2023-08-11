import React from "react";
import { Block } from "..";

type ParagraphProps = {
  block: Block;
};

const getFontSizeBySizeName = (size: string) => {
  switch (size) {
    case "small":
      return "1rem";
    case "medium":
      return "1.5rem";
    case "large":
    default:
      return "2rem";
  }
};

const Paragraph = (props: ParagraphProps) => {
  const text = props.block.attrs?.["text"];
  const color = props.block.attrs?.["color"];
  const size = props.block.attrs?.["size"];

  return (
    <p
      style={{
        color: color || "#000000",
        display: "block",
        zIndex: 2,
        fontSize: getFontSizeBySizeName(size || "medium"),
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    ></p>
  );
};

export default Paragraph;
