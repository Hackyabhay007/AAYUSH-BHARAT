// export default function WelcomeMessage() {
//   return (
//     // <div className="py-12 px-6 text-center max-w-3xl mx-auto">
//     //   <h2 className="text-2xl md:text-3xl font-semibold">
//     //     Ayurveda was never meant to be confusing. Our blog explains it clearly for real women.
//     //   </h2>
//     // </div>

//     <div className="relative bg-white py-16 px-6 md:px-10 text-center overflow-hidden">
//   {/* Heading Text */}
//   <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug max-w-4xl mx-auto text-gray-900">
//     Ayurveda was never meant to be confusing. <br />
//     <span className="text-dark-green">Our blog</span> explains it clearly for <span className="text-green-600">real women</span>.
//   </h2>
// </div>

//   );
// }


export default function WelcomeMessage() {
  return (
    <div className="relative bg-white py-16 px-6 md:px-10 text-center overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse z-0" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse z-0" />

      {/* Heading Text */}
      <h2 className="relative z-10 text-2xl md:text-3xl lg:text-4xl uppercase font-light tracking-wider leading-snug max-w-6xl mx-auto text-gray-900">
        Ayurveda was never meant to be confusing. <br />
        <span className="text-dark-green">Our blog</span> explains it clearly for <span className="text-green-600">real women</span>.
      </h2>
    </div>
  );
}
