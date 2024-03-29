type IconProps = {
  className?: string;
};
export const CategoryIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className || ""}
      viewBox="0 0 24 24"
      version="1.1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Iconly/Light/Category"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="Category"
          transform="translate(2.999141, 3.000000)"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M0.000858865205,3.5 C0.000858865205,0.874787053 0.0289681101,0 3.50085887,0 C6.9727494,0 7.00085887,0.874787053 7.00085887,3.5 C7.00085887,6.12521295 7.01193168,7 3.50085887,7 C-0.010214169,7 0.000858865205,6.12521295 0.000858865205,3.5 Z"
            id="Stroke-1"
            fill="currentColor"
          ></path>
          <path
            d="M11.0008589,3.5 C11.0008589,0.874787053 11.0289681,0 14.5008589,0 C17.9727494,0 18.0008589,0.874787053 18.0008589,3.5 C18.0008589,6.12521295 18.0119317,7 14.5008589,7 C10.9897858,7 11.0008589,6.12521295 11.0008589,3.5 Z"
            id="Stroke-3"
            fill="currentColor"
          ></path>
          <path
            d="M0.000858865205,14.5 C0.000858865205,11.8747871 0.0289681101,11 3.50085887,11 C6.9727494,11 7.00085887,11.8747871 7.00085887,14.5 C7.00085887,17.1252129 7.01193168,18 3.50085887,18 C-0.010214169,18 0.000858865205,17.1252129 0.000858865205,14.5 Z"
            id="Stroke-5"
            fill="currentColor"
          ></path>
          <path
            d="M11.0008589,14.5 C11.0008589,11.8747871 11.0289681,11 14.5008589,11 C17.9727494,11 18.0008589,11.8747871 18.0008589,14.5 C18.0008589,17.1252129 18.0119317,18 14.5008589,18 C10.9897858,18 11.0008589,17.1252129 11.0008589,14.5 Z"
            id="Stroke-7"
            fill="currentColor"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const BlogIcon = (props: IconProps) => {
  return (
    <svg className={props.className || ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
      />
    </svg>
  );
};

export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      fill="none"
      className={props.className || ""}
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
    </svg>
  );
};

export const MinusIcon = (props: IconProps) => {
  return (
    <svg
      fill="none"
      className={props.className || ""}
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"></path>
    </svg>
  );
};
