export type ProductListItem = {
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
