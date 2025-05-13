import React from 'react';

const RitualKits = () => {
  return (
    <section className="justify-center bg-beige py-12 my-6 flex flex-col gap-6 px-4">
      <h1 className='font-semibold uppercase tracking-wider text-4xl text-center'>Our Ayurvedic Ritual Kits</h1>

      {/* Grid for the kit boxes */}
      <div className="flex-1/2 max-w-5xl mt-6  mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4"> {/* Adjusted md:grid-cols-2 for better layout if only 4 items */}
        {/* Top Left Box */}
        <div className="relative rounded-2xl bg-dark-green text-beige p-8 overflow-hidden shadow-2xl flex flex-col"> {/* Added flex flex-col */}
          <h2 className="text-2xl font-bold mb-2">Heavy Flow Kit</h2> {/* Reduced mb */}
          <p className="mb-4 flex-grow">Regulates excessive flow and calms Pitta</p> {/* Added flex-grow */}
          {/* Optional: Add a button per card if needed */}
          {/* <button className='mt-auto px-4 py-2 border border-beige text-beige hover:bg-beige hover:text-dark-green transition text-sm'>
            View Kit
          </button> */}
        </div>

        {/* Top Right Box */}
        <div className="rounded-2xl bg-beige text-dark-green p-8 shadow-2xl flex flex-col">
          <h2 className="text-2xl font-bold mb-2">PCOD / PCOS Kit</h2>
          <p className="mb-4 flex-grow">Supports cyst reduction and hormonal balance</p>
        </div>

{/* Bottom left Box */}
        <div className="rounded-2xl bg-dark-green text-light p-8 shadow-2xl flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Low / Delayed Periods Kit</h2>
          <p className="mb-4 flex-grow">Restores flow and improves ovulation</p>
        </div>

{/* Bottom right Box */}
        <div className="relative rounded-2xl bg-beige text-dark-green p-8 overflow-hidden shadow-2xl flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Triphala Rasayan</h2>
          <p className="mb-4 flex-grow">Daily gut detox for clear skin and digestion</p>
        </div>
        </div>

      {/* Container for the centered "SHOP NOW" button */}
      {/* This div is now a direct child of the main section flex container */}
      <div className='flex justify-center mt-4'> {/* Added mt-8 for spacing */}
        <button className='px-8 py-3 border font-semibold border-dark-green text-dark-green hover:bg-dark-green hover:text-beige transition text-lg'>
          {/* Changed text-dark to text-dark-green for better visibility on beige, and hover state */}
          SHOP ALL KITS
        </button>
      </div>
    </section>
  );
};

export default RitualKits;
