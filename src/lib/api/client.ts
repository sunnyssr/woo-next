import { WooConsumerKey, WooConsumerSecret, WPBaseUrl } from "@/lib/constants";
import axios, { AxiosRequestConfig } from "axios";
import createHmac from "create-hmac";
import OAuth from "oauth-1.0a";


const isHttps = false;
const getConfig = (url: string, method: string): AxiosRequestConfig["params"] => {
  if (!WooConsumerKey || !WooConsumerSecret) {
    throw new Error("[wooClient.getConfig]: WooCommerce consumer key or secret missing!")
  }
  return isHttps ?
    {
      consumer_key: WooConsumerKey,
      consumer_secret: WooConsumerSecret
    } :
    new OAuth({
      consumer: {
        key: WooConsumerKey,
        secret: WooConsumerSecret
      },
      signature_method: "HMAC-SHA256",
      hash_function: (base, key) => {
        return createHmac("sha256", key)
          .update(base)
          .digest("base64");
      }
    }).authorize({
      url,
      method,
    })

}

export const createRequest = (method: string, endpoint: string, data: any, request: AxiosRequestConfig) => {
  let url = `${WPBaseUrl}/wp-json/wc/v3/${endpoint}`;
  if (Object.keys(request.params).length > 0) {
    url = url + "?" + new URLSearchParams(request.params).toString();
  }
  const config = {
    ...request,
    params: {
      ...getConfig(url, method),
    },
    url,
  }
  if (data) {
    config.data = JSON.stringify(data)
  }
  return axios(config)
}


export const wooClient = {
  get: (endpoint: string, params = {}) => {
    return createRequest("get", endpoint, null, { params });
  },
  post: (endpoint: string, data: any, params = {}) => {
    return createRequest("post", endpoint, data, { params });
  },
  put: (endpoint: string, data: any, params = {}) => {
    return createRequest("put", endpoint, data, { params });
  },
  delete: (endpoint: string, params = {}) => {
    return createRequest("delete", endpoint, null, { params });
  },
  options: (endpoint: string, params = {}) => {
    return createRequest("options", endpoint, null, { params });
  }
}