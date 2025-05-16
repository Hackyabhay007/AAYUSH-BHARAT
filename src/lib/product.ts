export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'smartphone',
    name: 'Smartphone',
    description: 'A powerful smartphone with great features.',
    price: 699,
    imageUrl: '/images/smartphone.jpg',
  },
  {
    id: '2',
    slug: 'laptop',
    name: 'Laptop',
    description: 'A sleek laptop for productivity and gaming.',
    price: 999,
    imageUrl: '/images/laptop.jpg',
  },
  {
    id: '3',
    slug: 'headphones',
    name: 'Headphones',
    description: 'Noise-cancelling over-ear headphones.',
    price: 199,
    imageUrl: '/images/headphones.jpg',
  },
]
