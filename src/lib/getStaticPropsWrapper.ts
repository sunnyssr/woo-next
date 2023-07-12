import type { GetStaticProps } from "next";
import { getMainCategories } from "./api/queries/product-categories";

const getWrappedStaticProps: GetStaticProps = async () => {
  const mainCategories = await getMainCategories();
  if (!mainCategories) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mainCategories:
        mainCategories
          .filter((c) => c.slug !== "uncategorized")
          .sort((a, b) => a.menu_order - b.menu_order) || [],
    },
  };
};

export const getStaticPropsWrapper = (gspFunc: GetStaticProps): GetStaticProps => {
  return async (ctx) => {
    const [gspFuncProps, wrappedServerSideProps] = await Promise.all([
      gspFunc(ctx),
      getWrappedStaticProps(ctx),
    ]);

    // @ts-ignore
    if (gspFuncProps.props) {
      // @ts-ignore
      gspFuncProps.props = { ...gspFuncProps.props, ...(wrappedServerSideProps?.props || {}) };
    }
    return gspFuncProps;
  };
};
