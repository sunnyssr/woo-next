import { Cart } from "@/lib/types/api";
import { WPBaseUrl } from "@/lib/constants"

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  cart: Cart | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(404).json({ cart: null });

  const existingCartToken = String(req.headers["cart-token"]);
  const existingNonce = String(req.headers["nonce"]);

  const productId = String(req.query["id"]);
  const quantity = String(req.query["quantity"]);

  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (existingCartToken) {
    headers.append("Cart-Token", existingCartToken);
  }
  if (existingNonce) {
    headers.append("Nonce", existingNonce);
  }
  const response = await fetch(
    `${WPBaseUrl}/wp-json/wc/store/v1/cart/add-item?id=${productId}&quantity=${quantity}`,
    {
      headers: headers,
      method: "POST",
    }
  );

  const newCartToken = response.headers.get("Cart-Token");
  res.setHeader("Cart-Token", newCartToken!);

  const nonce = response.headers.get("Nonce");
  res.setHeader("Nonce", nonce!);

  const json = (await response.json()) as Cart;

  res.status(200).json({ cart: json });
}
