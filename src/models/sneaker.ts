import { Gender, ShoeCondition } from '.';

export interface Sneaker {
  id: number;
  box_condition: string;
  brand_name: string;
  category: string[];
  collection_slugs: string[];
  color: string;
  designer: string;
  details: string;
  gender: Gender[];
  grid_picture_url: string;
  has_picture: boolean;
  has_stock: boolean;
  keywords: string[];
  main_picture_url: string;
  midsole: string;
  name: string;
  nickname: string;
  original_picture_url: string;
  product_template_id: number;
  release_date: string;
  release_date_unix: number;
  release_year: number;
  retail_price_cents: number;
  shoe_condition: ShoeCondition;
  silhouette: string;
  size_range: number[];
  sku: string;
  status: string;
  slug: string;
  story_html: string;
  upper_material: string;
}
