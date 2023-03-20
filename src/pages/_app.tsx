import { interFont } from "@/lib/fonts";
import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    setReducedMotion(false);
  }, []);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "never" : "always"}>
      <main className={interFont.className}>
        <Component {...pageProps} />
      </main>
    </MotionConfig>
  );
}
