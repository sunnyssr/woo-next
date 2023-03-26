import type { GetServerSideProps } from "next";
import { getMainCategories } from "./api/queries/categories";

const getWrappedServerSideProps: GetServerSideProps = async () => {
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

export const getServerSidePropsWrapper = (gsspFunc: GetServerSideProps): GetServerSideProps => {
  return async (ctx) => {
    const [gsspFuncProps, wrappedServerSideProps] = await Promise.all([
      gsspFunc(ctx),
      getWrappedServerSideProps(ctx),
    ]);

    // @ts-ignore
    if (gsspFuncProps.props) {
      // @ts-ignore
      gsspFuncProps.props = { ...gsspFuncProps.props, ...(wrappedServerSideProps?.props || {}) };
    }
    return gsspFuncProps;
  };
};
