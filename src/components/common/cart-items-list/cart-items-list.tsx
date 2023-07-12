import CartListItem from "../cart-list-item/cart-list-item";

import type { CartItem } from "@/lib/types/api";

type CartItemsListProps = {
  cartItems: CartItem[];
};
const CartItemsList = ({ cartItems }: CartItemsListProps) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="">
          <th className="py-3 text-xs uppercase text-left text-gray-400 font-medium">Product</th>
          <th className="py-3 text-xs uppercase text-center text-gray-400 font-medium">Quantity</th>
          <th className="py-3 text-xs uppercase text-right text-gray-400 font-medium">Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartListItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </tbody>
    </table>
  );
};

export default CartItemsList;
