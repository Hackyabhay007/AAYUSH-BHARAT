// components/Banner.tsx
export default function Banner() {
  return (
    <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1739845/pexels-photo-1739845.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}>
        <div className=" bg-opacity-50 w-full h-full absolute inset-0" />
        <h1 className="relative text-white text-4xl md:text-6xl font-bold text-center px-4 z-10">
          Built from Granthas. <br className="hidden md:block" />Designed for Her.
        </h1>
      </section>
  );
}
