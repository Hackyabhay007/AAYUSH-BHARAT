import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

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
];

export default function BlogArticle() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-22 text-[#1a1a1a] font-serif">
      {/* Header */}
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-2 uppercase tracking-wide">
        Revitalize and Rejuvenate Your Skin Naturally: 5 Tips
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Posted by Lucas Verbeek on July 14, 2023
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 pt-6 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-1 pt-12">
          <h2 className="text-lg font-semibold mb-4 uppercase tracking-wide text-gray-700">Related Articles</h2>
          <div className="space-y-6">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                <Image width={500} height={500} src={article.image} alt={article.title} className="w-full h-36 object-cover" />
                <div className="p-4 bg-white space-y-2">
                  <h3 className="text-md font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-600 italic">{article.example}</p>
                  <p className="text-xs text-gray-500">Grantha: {article.grantha}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button className="px-3 py-1 text-xs bg-black text-white rounded-full hover:bg-gray-800 transition">
                      Shop the Right Kit
                    </button>
                    <button className="px-3 py-1 text-xs border border-black rounded-full hover:bg-black hover:text-white transition">
                      Book a Free Consult
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Blog Content */}
        <article className="md:col-span-3 space-y-6 text-sm leading-7 text-gray-800">
          <Image
          width={500} height={500}
            src="https://images.pexels.com/photos/6766221/pexels-photo-6766221.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Glowing skin"
            className="w-full rounded-md shadow-lg"
          />

          <p>
            Rejuvenating your skin doesn’t have to involve harsh treatments or invasive procedures. Nature holds a
            plethora of secrets for natural skincare. This blog explores ways to embrace those.
          </p>

          <ol className="list-decimal ml-5 space-y-3">
            <li>
              <strong>Get Your Beauty Sleep:</strong> Adequate sleep is essential for skin rejuvenation.
            </li>
            <li>
              <strong>Sun Protection Is a Must:</strong> Protecting your skin from harmful UV rays is crucial.
            </li>
          </ol>

          <p>
            <strong>Conclusion:</strong> Embrace the power of natural skincare and reveal your inner radiance. Stay
            hydrated, get rest, and trust in time-tested wisdom.
          </p>

          {/* Social & Navigation */}
          <div className="text-left space-y-4 mt-10">
            <div className="flex gap-5 text-xl text-gray-600">
              <a href="#" className="hover:text-[#4267B2] transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-[#1DA1F2] transition"><FaTwitter /></a>
              <a href="#" className="hover:text-[#C13584] transition"><FaInstagram /></a>
              <a href="#" className="hover:text-[#E60023] transition"><FaPinterestP /></a>
            </div>
            <a
              href={"/blog"}
              className="inline-block text-xs uppercase tracking-widest text-gray-500 hover:text-black transition"
            >
              &larr; Back to Blog
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
