import { ShieldCheck, BadgeCheck } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "AYUSH Certified",
      icon: <ShieldCheck className="lg:w-8 lg:h-8 h-6 w-6  text-white" />,
      description:
        "Approved by the Ministry of AYUSH, our formulas are rooted in classical texts and safe for daily use.",
    },
    {
      title: "GMP Compliant",
      icon: <BadgeCheck className="lg:w-8 lg:h-8 h-6 w-6 text-white" />,
      description:
        "Manufactured in certified Good Manufacturing Practice (GMP) facilities ensuring purity and safety.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-24 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="lg:text-4xl text-2xl font-medium uppercase text-center mb-16 text-dark-green tracking-wider">
        Our Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="bg-light rounded-2xl border border-transparent hover:border-dark-green shadow-xl hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="bg-dark-green p-4 rounded-full shadow-lg group-hover:rotate-6 transition-all duration-300">
                {cert.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-medium tracking-wide text-dark-green uppercase  group-hover:text-dark-green">
                {cert.title}
              </h3>
            </div>
            <p className="text-dark leading-relaxed text-base font-extralight">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
