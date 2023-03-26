import { interFont } from "@/lib/fonts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={interFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
