import { WooConsumerKey, WooConsumerSecret, WPBaseUrl } from "@/lib/constants";
import createHmac from "create-hmac";
import OAuth from "oauth-1.0a";

const isHttps = false;
const getConfig = (
  url: string,
  method: string
): Record<string, string | number> | OAuth.Authorization => {
  if (!WooConsumerKey || !WooConsumerSecret) {
    throw new Error("[wooClient.getConfig]: WooCommerce consumer key or secret missing!");
  }
  return isHttps
    ? {
        consumer_key: WooConsumerKey,
        consumer_secret: WooConsumerSecret,
      }
    : new OAuth({
        consumer: {
          key: WooConsumerKey,
          secret: WooConsumerSecret,
        },
        signature_method: "HMAC-SHA256",
        hash_function: (base, key) => {
          return createHmac("sha256", key).update(base).digest("base64");
        },
      }).authorize({
        url,
        method,
      });
};

export const createRequest = (
  method: string,
  endpoint: string,
  data: any,
  params: string | string[][] | Record<string, string> | URLSearchParams | undefined,
  request: RequestInit
) => {
  let url = new URL(`${WPBaseUrl}/wp-json/wc/v3/${endpoint}`);
  if (typeof params == "object" && Object.keys(params).length > 0) {
    url = new URL(`${url.origin}${url.pathname}?${new URLSearchParams(params).toString()}`);
  }
  const authConfig = getConfig(url.href, method);
  url = new URL(
    `${url.origin}${url.pathname}?${new URLSearchParams([
      ...Array.from(url.searchParams.entries()),
      ...Object.entries(authConfig),
    ]).toString()}`
  );
  const config: RequestInit = { method: method.toUpperCase(), ...request };
  if (data) {
    config.body = JSON.stringify(data);
  }

  return fetch(url.href, {
    next: { revalidate: 15 * 60 },
    ...config,
  });
};

export const wooClient = {
  get: (endpoint: string, params = {}, request: RequestInit = {}) => {
    return createRequest("get", endpoint, null, params, request);
  },
  post: (endpoint: string, data: any, params = {}, request: RequestInit = {}) => {
    return createRequest("post", endpoint, data, params, request);
  },
  put: (endpoint: string, data: any, params = {}, request: RequestInit = {}) => {
    return createRequest("put", endpoint, data, params, request);
  },
  delete: (endpoint: string, params = {}, request: RequestInit = {}) => {
    return createRequest("delete", endpoint, null, params, request);
  },
  options: (endpoint: string, params = {}, request: RequestInit = {}) => {
    return createRequest("options", endpoint, null, params, request);
  },
};
