export default function FounderNote() {
  return (
    <main className="text-gray-900">
     
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl mx-auto gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-dark-green font-medium mb-4">Why I Started Ayudh Bharat</h2>
            <p className="text-dark font-light tracking-wide mb-4">
              I started Ayudh Bharat because I saw my mother and grandmother use Ayurvedic wisdom that worked. Not capsules, but rituals. This is more than a brand — it's a legacy I want to preserve and pass on to the modern Indian woman.
            </p>
            <p className="italic text-green-600">— [Founder's Name]</p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Founder"
              className="rounded-xl h-124 shadow-md"
            />
          </div>
        </div>
      </section>

    
    </main>
  );
}
