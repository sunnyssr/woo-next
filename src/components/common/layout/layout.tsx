import { ProductCategoryItem } from "@/lib/types/api";
import Header from "../header/header";
import { motion } from "framer-motion";

const Layout = (props: {
  isHomepage?: boolean;
  children: any;
  categories?: ProductCategoryItem[];
}) => {
  return (
    <>
      <Header isHomepage={props.isHomepage || false} mainCategories={props.categories || []} />
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {!props.isHomepage ? <div className="mb-[4.25rem]"></div> : null}
        {props.children}
      </motion.div>
    </>
  );
};

export default Layout;
