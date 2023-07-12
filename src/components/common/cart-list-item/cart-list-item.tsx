import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/cartContext";
import QuantityPicker from "../quantity-picker/quantity-picker";

import type { CartItem } from "@/lib/types/api";
import { Fragment } from "react";
import AnimatedCurrencyCounter from "../animated-currency-counter/animated-currency-counter";

type CartItemProps = {
  cartItem: CartItem;
};

const CartListItem = (props: CartItemProps) => {
  const { updateItemQuantity } = useCart();
  return (
    <tr className="border-0 border-t border-solid border-gray-200">
      <td className="py-6 w-[60%]">
        <div className="flex items-start justify-start">
          {props.cartItem.images[0] ? (
            <Link href={`/product/${props.cartItem.id}`}>
              <Image
                className="h-20 w-20 rounded-md object-cover"
                alt={props.cartItem.images[0].alt}
                src={props.cartItem.images[0].src}
                width={100}
                height={100}
              />
            </Link>
          ) : null}
          <div className="flex flex-col ml-4">
            <Link href={`/product/${props.cartItem.id}`}>
              <h3 className="font-bold text-black tracking-wide">{props.cartItem.name}</h3>
            </Link>
            <ul className="flex items-center">
              {props.cartItem.variation.map((variation, i, arr) => (
                <Fragment key={variation.attribute}>
                  <li className="text-xs text-black">{variation.value}</li>
                  {i < arr.length - 1 ? <span className="mx-1 text-gray-500">&#x2022;</span> : null}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </td>
      <td className="h-full align-baseline w-[20%]">
        <div className="h-full py-6 text-center flex items-start justify-center">
          <QuantityPicker
            quantity={props.cartItem.quantity}
            handleUpdateQuantity={(updatedQuantity) => {
              updateItemQuantity(props.cartItem.key, updatedQuantity);
            }}
          />
        </div>
      </td>
      <td className="text-right h-full align-baseline w-[20%]">
        <div className="h-full py-6 flex items-start justify-end">
          <AnimatedCurrencyCounter
            currencyAmount={
              (props.cartItem.quantity * Number(props.cartItem.prices.price)) /
              Math.pow(10, props.cartItem.totals.currency_minor_unit)
            }
            currencyCode={props.cartItem.totals.currency_code}
          />
        </div>
      </td>
    </tr>
  );
};

export default CartListItem;
