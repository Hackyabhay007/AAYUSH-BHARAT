export interface Variants {
  $id?: string;
  productId: string;
  weight: number;
  price: number;
  sale_price: number;
  stock: number;
  image: string;
  additionalImages: string[];
  months: number;
};

export interface Collections {
  name: string;
  description: string;
  products: Product[];
  $id: string;
}

export interface Product {
  [x: string]: string | Collections[] | Variants[] | undefined;
  $id: string;
  name: string;
  description: string;
  category: string;
  tags: string;
  ingredients: string;
  slug: string;
  collections?: Collections[];
  variants?: Variants[];
}