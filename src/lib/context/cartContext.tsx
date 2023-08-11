import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, GetCartResponse } from "../types/api";

type ICartContext = {
  cartItems: CartItem[];
  itemsCount: number;
  addItemToCart: (productId: string, quantity: number) => Promise<void>;
  updateItemQuantity: (cartItemKey: string, quantity: number) => Promise<void>;
};

export const CartContext = createContext<ICartContext>(null as never);

export const useCart = () => useContext(CartContext);
export const CartContextProvider = React.memo(function CartContextProvider({
  children,
}: React.PropsWithChildren) {
  const [cartToken, setCartToken] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemsCount, setItemsCount] = useState(0);

  const fetchCart = async () => {
    setIsLoadingCart(true);
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      if (cartToken || window.localStorage?.getItem("__WOO_CART_TOKEN")) {
        headers.append(
          "cart-token",
          (cartToken || window.localStorage?.getItem("__WOO_CART_TOKEN"))!
        );
      }
      const response = await fetch("/api/cart", {
        headers: headers,
      });

      const newCartToken = response.headers.get("Cart-Token");
      setCartToken(newCartToken);
      localStorage.setItem("__WOO_CART_TOKEN", newCartToken!);

      const nonce = response.headers.get("Nonce");
      setNonce(nonce);

      const json = (await response.json()) as GetCartResponse;
      if (json.cart.items) {
        setCartItems(json.cart.items);
        setItemsCount(json.cart.items_count || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCart(false);
    }
  };

  const addItemToCart = async (productId: string, quantity: number = 1) => {
    setIsAddingToCart(true);
    if (!cartToken || !nonce) return;
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        "cart-token": cartToken,
        nonce,
      });
      const response = await fetch(`/api/cart/add-item?id=${productId}&quantity=${quantity}`, {
        headers: headers,
        method: "POST",
      });

      const json = (await response.json()) as GetCartResponse;
      if (json.cart.items) {
        setCartItems(json.cart.items);
        setItemsCount(json.cart.items_count || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const updateItemQuantity = async (cartItemKey: string, quantity: number = 1) => {
    setIsAddingToCart(true);
    if (!cartToken || !nonce) return;
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        "cart-token": cartToken,
        nonce,
      });
      const response = await fetch(
        `/api/cart/update-item?key=${cartItemKey}&quantity=${quantity}`,
        {
          headers: headers,
          method: "POST",
        }
      );

      const json = (await response.json()) as GetCartResponse;
      if (json.cart.items) {
        setCartItems(json.cart.items);
        setItemsCount(json.cart.items_count || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      setCartToken(window.localStorage?.getItem("__WOO_CART_TOKEN"));
    }
    fetchCart();
  }, []);

  const cartService = useMemo<ICartContext>(() => {
    return {
      cartItems,

      itemsCount,

      addItemToCart,

      updateItemQuantity,

      removeItemFromCart: () => {},
    };
  }, [cartItems]); //eslint-disable-line react-hooks/exhaustive-deps

  return <CartContext.Provider value={cartService}>{children}</CartContext.Provider>;
});