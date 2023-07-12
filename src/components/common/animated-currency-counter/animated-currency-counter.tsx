import { useEffect } from "react";
import { useMotionValue, motion, animate, useTransform } from "framer-motion";

function AnimatedCurrencyCounter({
  currencyAmount,
  currencyCode,
}: {
  currencyAmount: number;
  currencyCode: string;
}) {
  const count = useMotionValue(currencyAmount);

  useEffect(() => {
    animate(count, currencyAmount, { duration: 0.4 });
  }, [count, currencyAmount]);

  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString("en-US", {
      style: "currency",
      currency: currencyCode,
    })
  );

  return <motion.span>{rounded}</motion.span>;
}

export default AnimatedCurrencyCounter;
