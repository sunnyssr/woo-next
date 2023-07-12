import { CartContextProvider } from "@/lib/context/cartContext";
import { interFont } from "@/lib/fonts";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CartContextProvider>
      <main className={interFont.className}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </main>
    </CartContextProvider>
  );
}
