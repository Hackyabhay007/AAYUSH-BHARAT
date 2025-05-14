"use client";

import Image from "next/image";

type Ingredient = {
  name: string;
  description: string;
  image: string;
};

const ingredients: Ingredient[] = [
  {
    name: "Horny Goat Weed",
    description:
      "Horny Goat Weed, also known as Epimedium, is an herb traditionally used in Chinese medicine. It is believed to have potential aphrodisiac properties and may support sexual health and vitality.",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Maca Root",
    description:
      "Maca root is a plant native to Peru and is often used as a dietary supplement. It is known for its potential to support sexual health, boost energy, and promote overall well-being.",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
  {
    name: "Safed Musli",
    description:
      "Safed Musli is an herb that is traditionally used in Ayurvedic medicine and is believed to have aphrodisiac properties. It may support male reproductive health and vitality.",
    image: "https://www.zeroharm.in/cdn/shop/files/Sesbania_Grandiflora_extract-01_600x.png?v=1707390029",
  },
];

export default function NatureIngredients() {
  return (
    <div className="py-12 px-4 md:px-16 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10">
        Sourced from Nature, Purified for Potency
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {ingredients.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              width={160}
              height={160}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-sm text-gray-700 mb-4">{item.description}</p>
            <button className="bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-md text-sm">
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
