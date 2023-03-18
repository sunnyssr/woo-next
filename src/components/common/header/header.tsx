import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Container from "../container/container";
import Link from "next/link";
import { BlogIcon, CategoryIcon } from "../icons";

const Header = () => {
  return (
    <header className="shadow-sm">
      <Container className="flex justify-between items-center">
        <div className="py-3">
          <Link href="/">
            <h1 className="font-medium m-0 text-xl leading-6">WooNext</h1>
            <p className="m-0 text-sm">Next.js WooCommerce Theme</p>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li className="flex items-center font-medium tracking-wide">
              <CategoryIcon className="h-4 w-4 mr-1" /> Categories
            </li>
            <li className="flex items-center font-medium tracking-wide">
              <BlogIcon className="h-4 w-4 mr-1" /> Blog
            </li>
            <li>
              <ShoppingCartIcon className="h-7 w-7 text-black" />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
