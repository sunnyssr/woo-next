import { ProductCategoryItem } from "@/lib/types/api";
import Header from "../header/header";

const Layout = (props: { children: any; categories?: ProductCategoryItem[] }) => {
  return (
    <>
      <Header mainCategories={props.categories || []} />
      {props.children}
    </>
  );
};

export default Layout;
