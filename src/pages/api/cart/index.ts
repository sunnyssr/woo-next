import { Cart } from "@/lib/types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  cart: Cart;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const existingCartToken = String(req.headers["cart-token"]);

  console.log(existingCartToken);
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (existingCartToken) {
    headers.append("Cart-Token", existingCartToken);
  }
  const response = await fetch("http://woocommercenextjsrestapi.local/wp-json/wc/store/v1/cart", {
    headers: headers,
  });

  const newCartToken = response.headers.get("Cart-Token");
  res.setHeader("Cart-Token", newCartToken!);

  const nonce = response.headers.get("Nonce");
  res.setHeader("Nonce", nonce!);

  const json = (await response.json()) as Cart;

  res.status(200).json({ cart: json });
}
