export interface Variants {
  id?: string | number;
  $id:string;
    productId:string;
  price: number;
  weight: number;
  sale_price: number;
  stock: number;
  months:number;
  image?: string;
  additionalImages?:string[];
};
export interface Collections{
  name:string;
  description:string;
  products:Product[];
  $id:string;
}

export interface Product {
 $id:string,
  name: string;
  description: string;
  rating:number;
  category: string;
  weight: number;
  image: string;
  additionalImages: string[];
  stock: number;
  price: number;
  sale_price?: number;  
  tags:string[];
  ingredients:string;
  slug:string;
  variants?:Variants[];
  collections?:Collections[];
}

export interface Weight {
  id: number | string;
  weight_Value: number;
  original_Price: number;
  sale_Price: number;
}