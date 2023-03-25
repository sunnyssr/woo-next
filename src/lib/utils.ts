export const classNames = (classes: Record<string, boolean>) => {
  return Object.keys(classes)
    .filter((className) => classes[className])
    .join(" ");
};
