const articles = [
  {
    title: 'How to Treat PCOD Naturally (Ayurveda vs. Hormone Pills)',
    example: 'Priya reversed her PCOD symptoms in 6 months through personalized herbs and yoga.',
    grantha: 'Sushruta Samhita, Ch. 24',
    image: 'https://images.pexels.com/photos/6766221/pexels-photo-6766221.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'What is Triphala and Why You Need It Now',
    example: 'A 45-year-old teacher found relief from chronic bloating with daily Triphala use.',
    grantha: 'Charaka Samhita, Sutrasthana 4',
    image: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Food as Ritual: Ayurvedic Meal Tips by Dosha',
    example: 'Vata types thrive on grounding stews and warm drinks, as seen in our community study.',
    grantha: 'Charaka Samhita, Ch. 5',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: '7 Ayurvedic Rules for Women’s Cycles',
    example: 'Tracking the cycle with dosha fluctuations helped one client reduce cramps by 80%.',
    grantha: 'Sushruta Samhita, Sharira Sthana 3',
    image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export default function FeaturedArticles() {
  return (
    <section className="px-4 md:px-12 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Articles</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg hover:-translate-y-1"
          >
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600 italic">Story: {article.example}</p>
              <p className="text-sm text-gray-500">Grantha: {article.grantha}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800">
                  Shop the Right Kit
                </button>
                <button className="px-4 py-2 text-sm border border-black rounded-full hover:bg-black hover:text-white">
                  Book a Free Consult
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
