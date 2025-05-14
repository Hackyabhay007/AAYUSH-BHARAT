const consumerStudies = [
  {
    percentage: "76%",
    description:
      "Users experienced increased energy levels and a heightened desire to perform after using our Back To Teens supplement.",
  },
  {
    percentage: "76%",
    description:
      "Our Back To Teens supplement led to improvements in physical performance for users.",
  },
  {
    percentage: "86%",
    description:
      "Users noticed enhancements in sperm and semen quality with the use of our Back To Teens supplement.",
  },
];

const whatToExpect = [
  {
    month: "Month 1",
    title: "Cranks Up Your Desire",
    description:
      "Notice a significant improvement in your stamina, allowing you to prolong your performance and satisfaction in the bedroom.",
    icon: "🧍‍♂️",
  },
  {
    month: "Month 2",
    title: "Keeps You Going Longer",
    description:
      "Enjoy sustained performance that lasts longer than ever before, ensuring you and your partner experience heightened pleasure and intimacy.",
    icon: "⏱️",
  },
  {
    month: "Month 3",
    title: "Amplifies Your Pleasure",
    description:
      "Notice a continued amplification of pleasure, leading to more satisfying and gratifying intimate encounters.",
    icon: "💚",
  },
];

export default function ProductInsights() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Consumer Studies */}
      <div>
        <h2 className="text-center text-2xl font-semibold mb-8">Consumer Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consumerStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-green-700 mb-2">
                {study.percentage}
              </div>
              <p className="text-sm text-gray-600">{study.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What To Expect */}
      <div>
        <h2 className="text-center text-2xl font-semibold mb-8">What To Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatToExpect.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl p-6 shadow-sm"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-gray-500 mb-1">{item.month}</p>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
