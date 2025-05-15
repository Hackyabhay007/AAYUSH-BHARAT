import Image from "next/image";

const products = [
  {
    title: "Grantha-Based Classical Formulas No Chemicals",
    img: 'https://sahara-cosmetics-digifist.myshopify.com/cdn/shop/files/Facialexfoliant-Front.jpg?v=1689776745&width=360',
    price: "₹879"
  },
  {
    title: "3-Capsule Ritual: Balance • Detox • Regulate",
    img: 'https://sahara-cosmetics-digifist.myshopify.com/cdn/shop/files/Facialexfoliant-Front.jpg?v=1689776745&width=360',
    price: "₹709"
  },
  {
    title: "Backed by AYUSH & GMP Certified Facilities",
    img: 'https://sahara-cosmetics-digifist.myshopify.com/cdn/shop/files/Facialexfoliant-Front.jpg?v=1689776745&width=360',
    price: "₹900"
  },
];

const FeaturedProducts = () => (
  <div className="bg-beige">
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-4xl uppercase font-semibold mb-8 tracking-wider text-dark-green text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-light text-center rounded-lg p-4 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
          >
            <div className="overflow-hidden rounded-md">
              <Image
                width={500}
                height={500}
                src={product.img}
                alt={product.title || 'Product Image'}
                className="w-full h-48 object-cover rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="text-yellow-500 text-sm flex justify-center items-center space-x-1">
              <span>★★★★☆</span>
              <span className="text-gray-600 text-xs">(1027)</span>
            </div>

            <h3 className="text-base uppercase font-light">{product.title}</h3>

            <div className="text-sm my-3">
              <span className="line-through text-dark mr-2">₹1,050</span>
              <span className="font-bold text-dark-green mr-2">{product.price}</span>
              <span className="text-red-600 font-bold">| SAVE ₹51</span>
            </div>

            <button className="uppercase px-8 cursor-pointer py-2 text-base rounded border font-medium border-dark text-dark  hover:text-primary hover:bg-dark-green transition-all duration-300">
              Show Now
            </button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default FeaturedProducts;
