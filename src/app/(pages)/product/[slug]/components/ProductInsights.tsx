import Image from "next/image";

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
    title: "Improved Nails & Hair Health",
    description:
      "Biotin improves damaged hair and nail health by enhancing keratin production.",
    icon: "https://www.zeroharm.in/cdn/shop/files/skin_will_look_radient-01_400x.png?v=1703318894",
  },
  {
    month: "Month 2",
    title: "Prominent Results in Damaged Hair",
    description:
      " Continued biotin use leads to more prominent hair repair and scalp circulation.",
    icon: "https://www.zeroharm.in/cdn/shop/files/prominent_results_in_the_damaged_hair-01_400x.png?v=1703318894",
  },
  {
    month: "Month 3",
    title: "Radiant Skin",
    description:
      "Radiant skin due to biotin's repair of dermis and collagen production.",
    icon:"https://www.zeroharm.in/cdn/shop/files/improvement_in_the_nails_and_hair_health-01_fbd989e1-90ce-43a1-8ade-55767f5708e1_400x.png?v=1703318894",
  },
];

export default function ProductInsights() {
  return (
    <div className="bg-dark-green py-8">
      {/* Consumer Studies */}
      <div className="max-w-6xl  text-light mx-auto px-4 py-10 space-y-16">
        <h2 className="text-center text-4xl  font-medum tracking-wide uppercase mb-8">Consumer Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consumerStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-gray-100 h-64 flex items-start flex-col justify-center rounded-xl p-6 text-left shadow-sm"
            >
              <div className="text-4xl font-bold text-dark-green mb-6">
                {study.percentage}
              </div>
              <p className="text-base text-dark">{study.description}</p>
            </div>
          ))} 
        </div>
      </div>

      {/* What To Expect */}
      <div className="max-w-6xl  text-light mx-auto px-4 py-10 space-y-16">
        <h2 className="text-center text-4xl  font-medum tracking-wide uppercase mb-8">What To Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatToExpect.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 h-64 flex items-start flex-col justify-center rounded-xl p-6 text-left shadow-sm"
            >
              <div className="text-2xl mb-2"><Image width={500} height={500} src={item.icon} alt="" className="h-16" /> </div>
              <p className="text-sm font-medium text-dark mb-1">{item.month}</p>
              <h3 className=" text-lg text-dark-green mb-2">{item.title}</h3>
              <p className="text-sm text-dark">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
