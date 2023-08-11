import React from "react";
import { Block } from "..";
import { classNames } from "@/lib/utils";

type HeadingProps = {
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

const Button = (props: HeadingProps) => {
  const text = props.block.attrs?.["text"];
  const size = props.block.attrs?.["size"] || "medium";
  const primaryColor = props.block.attrs?.["primaryColor"] || "#000000";
  const secondaryColor = props.block.attrs?.["secondaryColor"] || "#ffffff";
  const buttonType = props.block.attrs?.["buttonType"] || "primary";

  const style = {
    fontSize: getFontSizeBySizeName(size || "medium"),
    backgroundColor: secondaryColor,
    ...(buttonType === "primary"
      ? { color: primaryColor, borderColor: secondaryColor }
      : { color: primaryColor, borderColor: primaryColor }),
  };
  return (
    <button
      style={style}
      className={classNames({
        "": buttonType === "primary",
        "rounded-full": buttonType === "secondary",
        "border-2 border-solid py-2 px-6 mt-4": true,
      })}
      dangerouslySetInnerHTML={{ __html: text }}
    ></button>
  );
};

export default Button;
