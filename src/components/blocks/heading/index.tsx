import React from "react";
import { Block } from "..";

type HeadingProps = {
  block: Block;
};

const getFontSizeBySizeName = (size: string) => {
  switch (size) {
    case "small":
      return "1.5rem";
    case "medium":
      return "2.25rem";
    case "large":
    default:
      return "3rem";
  }
};

const Heading = (props: HeadingProps) => {
  const text = props.block.attrs?.["text"];
  const color = props.block.attrs?.["color"];
  const size = props.block.attrs?.["size"];
  const style = {
    color,
    fontSize: getFontSizeBySizeName(size || "large"),
  };

  switch (size) {
    case "small":
      return <h3 style={style} dangerouslySetInnerHTML={{ __html: text }}></h3>;

    case "medium":
      return <h2 style={style} dangerouslySetInnerHTML={{ __html: text }}></h2>;

    case "large":
    default:
      return <h1 style={style} dangerouslySetInnerHTML={{ __html: text }}></h1>;
  }
};

export default Heading;
