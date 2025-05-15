export default function WelcomeMessage() {
  return (
    // <div className="py-12 px-6 text-center max-w-3xl mx-auto">
    //   <h2 className="text-2xl md:text-3xl font-semibold">
    //     Ayurveda was never meant to be confusing. Our blog explains it clearly for real women.
    //   </h2>
    // </div>

    <div className="relative bg-white py-16 px-6 md:px-10 text-center overflow-hidden">
  {/* Heading Text */}
  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug max-w-4xl mx-auto text-gray-900">
    Ayurveda was never meant to be confusing. <br />
    <span className="text-pink-600">Our blog</span> explains it clearly for <span className="text-green-600">real women</span>.
  </h2>
</div>

  );
}
