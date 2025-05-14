// components/Certifications.tsx
import { ShieldCheck, BadgeCheck } from "lucide-react"; // You can replace with any icons

export default function Certifications() {
  const certifications = [
    {
      title: "AYUSH Certified",
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      description:
        "Approved by the Ministry of AYUSH, our formulas are rooted in classical texts and safe for daily use.",
    },
    {
      title: "GMP Compliant",
      icon: <BadgeCheck className="w-10 h-10 text-green-600" />,
      description:
        "Manufactured in certified Good Manufacturing Practice (GMP) facilities ensuring purity and safety.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-24 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-semibold text-center mb-12">Our Certifications</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">{cert.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{cert.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
