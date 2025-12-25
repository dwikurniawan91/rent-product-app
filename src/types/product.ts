export interface ProductImage {
  id: string;
  image: string;
  product_id: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  model: string;
  type: string;
  status: string;
  price: number;
  slug: string;
  description: string | null;
  category_id: string;
  manufacturer_id: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  category: Category;
  manufacturer: Manufacturer;
  images: ProductImage[];
  default_package?: unknown;
}
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getProductImage(product: Product): string {
  if (product.images && product.images.length > 0) {
    return product.images[0].image;
  }
  return "_default.jpg"; // fallback image
}
