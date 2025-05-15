"use client";
export default function FounderNote() {
  return (
    <main className=" text-dark-green">
      <section className="relative py-6 px-6 md:px-24 bg-[#fdf9ef] overflow-hidden">
        {/* Decorative SVG blob background */} 
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-full h-full fill-green-200">
            <path d="M0,100 C200,200 600,0 800,100 L800,400 L0,400 Z" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col-reverse justify-center md:flex-row items-center max-w-6xl mx-auto gap-6 z-10">
          {/* Text Content */}
          <div className="md:w-1/2 animate-fade-in">
            <h2 className="text-4xl uppercase md:text-5xl font-medium leading-snug tracking-wider text-dark-green ">
              Why I Started <br className="hidden md:block" /> Ayudh Bharat
            </h2>
            <div className="mt-6 text-lg leading-relaxed text-gray-700 relative">
              <span className="text-4xl absolute -top-6 -left-4 text-green-400 ">“</span>
              I started Ayudh Bharat because I saw my mother and grandmother use Ayurvedic wisdom that worked. Not capsules, but rituals. This is more than a brand — it's a legacy I want to preserve and pass on to the modern Indian woman.
              <span className="text-4xl absolute -bottom-4 right-2 text-green-400 ">”</span>
            </div>
            <p className="mt-8 text-green-700  text-xl">— [Founder’s Name]</p>
          </div>

          {/* Founder Image in blob shape */}
          <div className="md:w-1/3 animate-slide-in-up">
            <div className="w-full max-w-sm mx-auto relative">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Founder"
                className="w-full h-auto object-cover mask-blob shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tailwind animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }

        .animate-slide-in-up {
          animation: slide-in-up 1.2s ease-out both;
        }

       
        .mask-blob {
          clip-path: path(
            "M365,273Q342,306,309.5,337.5Q277,369,237,381Q197,393,153.5,386Q110,379,92,338.5Q74,298,59,257.5Q44,217,64.5,183.5Q85,150,107,118Q129,86,168,71Q207,56,246.5,57Q286,58,321.5,77Q357,96,370.5,133Q384,170,384,208Q384,246,365,273Z"
          );
        }
      `}</style>
    </main>
  );
}
