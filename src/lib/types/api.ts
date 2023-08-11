export type WCv3ApiProductListItem = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: {}[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: boolean;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
  }[];
};

export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  price_html: string;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: {
      min_amount: string;
      max_amount: string;
    };
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };

  average_rating: string;
  review_count: number;
  images: {
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }[];
  categories: { id: number; name: string; slug: string; link: string }[];
  tags: [];
  attributes: {
    id: number;
    name: string;
    taxonomy: string;
    has_variations: boolean;
    terms: {
      id: number;
      name: string;
      slug: string;
      default: boolean;
    }[];
  }[];
  variations: {
    id: number;
    attributes: [
      {
        name: string;
        value: string;
      }
    ];
  }[];
  has_options: true;
  is_purchasable: true;
  is_in_stock: true;
  is_on_backorder: false;
  low_stock_remaining: null;
  sold_individually: false;
  add_to_cart: {
    text: string;
    description: string;
    url: string;
    minimum: number;
    maximum: number;
    multiple_of: number;
  };
  extensions: {};
};

export type ProductCategoryItem = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  menu_order: number;
  count: number;
  image: {
    id: number;
    src: string;
    name: string;
    alt: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
  };
};

export type BlogPostMedia = {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
};

export type BlogFeaturedMedia = {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: BlogPostMedia;
      large: BlogPostMedia;
      thumbnail: BlogPostMedia;
      medium_large: BlogPostMedia;
      "1536x1536": BlogPostMedia;
      "2048x2048": BlogPostMedia;
      woocommerce_thumbnail: BlogPostMedia;
      woocommerce_single: BlogPostMedia;
      woocommerce_gallery_thumbnail: BlogPostMedia;
      full: BlogPostMedia;
    };
    image_meta: Record<string, any>;
    original_image: string;
  };
  source_url: string;
};

export type BlogPostListItem = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    raw?: string;
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: false;
  template: string;
  format: string;
  // meta: [];
  categories: number[];
  tags: string[];

  _embedded: {
    author: {
      id: number;
      name: string;
      url: string;
      description: string;
      link: string;
      slug: string;
      avatar_urls: {
        "24": string;
        "48": string;
        "96": string;
      };
    }[];
    "wp:term": {
      id: number;
      link: string;
      name: string;
      slug: string;
      taxonomy: string;
    }[][];
    "wp:featuredmedia": BlogFeaturedMedia[];
  };
};

export type SlideshowItem = BlogPostListItem & {};

export type BlogTaxonomyListItem = {
  id: number;
  count: number;
  description: string;
  slug: string;
  name: string;
  taxonomy: string;
};

export type BlogCategoryListItem = BlogTaxonomyListItem & {
  parent: number;
};

export type Coupon = {};
export type ShippingRate = {};
export type Address = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
};
export type CartItem = {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: boolean | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: {
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }[];
  variation: {
    attribute: string;
    value: string;
  }[];
  item_data: [];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: string | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  catalog_visibility: string;
  extensions: {};
};

export type Cart = {
  coupons: Coupon[];
  shipping_rates: ShippingRate[];
  shipping_address: Address;
  billing_address: Address;
  items: CartItem[];
  items_count: number;
  items_weight: number;
  cross_sells: [];
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  fees: {}[];
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string | null;
    total_shipping_tax: string | null;
    total_price: string;
    total_tax: string;
    tax_lines: {}[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  errors: string[];
  payment_methods: [];
  payment_requirements: string[];
  extensions: {};
};

export type GetCartResponse = { cart: Cart };
