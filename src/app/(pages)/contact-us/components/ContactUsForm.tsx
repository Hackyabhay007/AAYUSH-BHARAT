export default function ContactForm() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-22 text-[#1a1a1a]">
      {/* Heading */}
      <h1 className="text-4xl font-medium text-dark-green text-center mb-8 tracking-wide uppercase">Contact</h1>

      {/* Opening Hours */}
      <div className="mb-12">
        <h2 className="text-lg font-medium mb-2">Opening hours</h2>
        <p className="text-gray-600">Monday to Friday 9am to 9pm (GMT)</p>
        <p className="text-gray-600">Saturday 10am to 6pm</p>
        <p className="text-gray-600">Sunday 10am to 4pm</p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Message</label>
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-black text-white tracking-widest text-sm uppercase px-6 py-3 hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
