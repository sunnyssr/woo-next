import { Fragment, useState } from "react";
import Link from "next/link";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Container from "../container/container";
import { BlogIcon, CategoryIcon } from "../icons";
import { useCart } from "@/lib/context/cartContext";
import { classNames } from "@/lib/utils";

import type { ProductCategoryItem } from "@/lib/types/api";
import { useScroll, motion, useTransform } from "framer-motion";
import { PRIMARY_COLOR, SECONDARY_COLOR, HEADER_BOX_SHADOW } from "@/lib/colors";

type HeaderProps = {
  mainCategories?: ProductCategoryItem[];
  isHomepage: boolean;
};

const Header = (props: HeaderProps) => {
  const { itemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const padding = useTransform(scrollY, [0, 16], [16, 0]);
  const primaryColor = useTransform(scrollY, [0, 500], [SECONDARY_COLOR, PRIMARY_COLOR]);
  const secondaryColor = useTransform(scrollY, [0, 500], [PRIMARY_COLOR, SECONDARY_COLOR]);
  const backgroundColor = useTransform(scrollY, [0, 500], ["#FFFFFF00", "#FFFFFFFF"]);
  const boxShadow = useTransform(scrollY, (value) => (value > 16 ? HEADER_BOX_SHADOW : "none"));

  return (
    <motion.header
      style={
        props.isHomepage
          ? {
              color: primaryColor,
              background: backgroundColor,
              padding,
              boxShadow,
            }
          : { boxShadow: HEADER_BOX_SHADOW }
      }
      className={`fixed top-0 w-full z-50 bg-white transition-colors`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Logo />
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <ul className={`hidden lg:flex items-center gap-6`}>
            <li>
              <CategoryMenuItem categories={props.mainCategories || []} />
            </li>
            <li>
              <Link href="/blog" className="flex items-center py-3 font-medium tracking-wide">
                <BlogIcon className="w-4 h-4 mr-1" /> Blog
              </Link>
            </li>
            <li className="flex items-center py-3 font-medium tracking-wide">
              <Link href="/cart" className="relative">
                <ShoppingCartIcon className="h-7 w-7" />
                {itemsCount ? (
                  <motion.span
                    style={
                      props.isHomepage
                        ? {
                            color: secondaryColor,
                            background: primaryColor,
                          }
                        : {
                            color: SECONDARY_COLOR,
                            background: PRIMARY_COLOR,
                          }
                    }
                    className={`absolute -top-1 -right-1 rounded-full ${
                      itemsCount >= 10 ? "h-5 w-5 text-xxs" : "h-4 w-4 text-xs"
                    } flex items-center justify-center`}
                  >
                    {itemsCount}
                  </motion.span>
                ) : null}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <MobileNav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        categories={props.mainCategories || []}
      />
    </motion.header>
  );
};

export default Header;

const Logo = () => {
  return (
    <Link href="/" className="py-3">
      <h1 className="m-0 text-xl font-medium leading-6">WooNext</h1>
      <p className="m-0 text-sm">Next.js WooCommerce Theme</p>
    </Link>
  );
};

type CategoryMenuItemProps = {
  categories: ProductCategoryItem[];
};

const CategoryMenuItem = (props: CategoryMenuItemProps) => {
  return (
    <Popover.Group>
      <Popover className="relative">
        <Popover.Button className="flex items-center py-3 font-medium leading-6 tracking-wide">
          <CategoryIcon className="w-4 h-4 mr-1" /> Categories
          <ChevronDownIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 max-w-sm min-w-[10rem] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="">
              {props.categories.map((category) => (
                <Link
                  href={`/category/${category.slug}`}
                  key={category.slug}
                  className="relative block px-4 py-2 font-normal text-gray-900 hover:bg-gray-50"
                >
                  {category.name}
                  <span className="absolute inset-0" />
                </Link>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  );
};

type MobileNavProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
  categories: ProductCategoryItem[];
};

const MobileNav = ({ mobileMenuOpen, setMobileMenuOpen, categories }: MobileNavProps) => {
  return (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flow-root mt-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-6 space-y-2">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                      Categories
                      <ChevronDownIcon
                        className={classNames({
                          "rotate-180": open,
                          "h-5 w-5 flex-none": true,
                        })}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {categories.map((category) => (
                        <Disclosure.Button
                          key={category.slug}
                          as={Link}
                          href={`/category/${category.slug}`}
                          className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                        >
                          {category.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Link
                href="/blog"
                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Blog
              </Link>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
