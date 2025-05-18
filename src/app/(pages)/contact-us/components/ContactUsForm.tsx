'use client';
import { useState } from "react";
export default function ContactForm() {
  const [formData, setFormData] = useState({ fullname: "", email: "", message: "" });
  const [status,setStatus] = useState('');


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setFormData({ fullname: " ", email: " ", message: " " });
        setStatus("Message sent!");
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Failed to send message.");
      throw error;
    }
  };
  return (
    <section className="max-w-3xl mx-auto px-4 py-22 text-[#1a1a1a]">
      {/* Heading */}
      <h1 className="lg:text-4xl text-2xl font-medium text-dark-green text-center mb-8 tracking-wide uppercase">Contact</h1>

      {/* Opening Hours */}
      <div className="mb-12">
        <h2 className="text-lg font-medium mb-2">Opening hours</h2>
        <p className="text-gray-600">Monday to Friday 9am to 9pm (GMT)</p>
        <p className="text-gray-600">Saturday 10am to 6pm</p>
        <p className="text-gray-600">Sunday 10am to 4pm</p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Name</label>
            <input
              type="text"
              value={formData.fullname}
              placeholder="Name"
               onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
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
              value={formData.email}
               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Message</label>
          <textarea
            placeholder="Message"
            value={formData.message}
            rows={5}
             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
          <p>{status}</p>
        </div>
      </form>
    </section>
  );
}
