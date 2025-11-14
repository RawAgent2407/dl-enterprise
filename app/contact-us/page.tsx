"use client";
import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-red-500 text-white py-28 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Have a question or want to work with us? Fill out the form below or
          reach us through our contact details.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaMapMarkerAlt className="text-red-600 text-3xl" />,
            title: "Address",
            desc: (
              <>
                78 Gajsinani Industrial Park
                <br />
                Near America Tubemill Compound
                <br />
                Vatva, Ahmedabad - 382440, Gujarat, India
              </>
            ),
          },
          {
            icon: <FaPhone className="text-red-600 text-3xl" />,
            title: "Phone",
            desc: "+91-49260-51745",
          },
          {
            icon: <FaEnvelope className="text-red-600 text-3xl" />,
            title: "Email",
            desc: "info@dlent04.com",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-start gap-4 hover:shadow-2xl transition"
          >
            {item.icon}
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Contact Form + Sidebar Info */}
      <section className="py-14 max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <FaEnvelope /> Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", placeholder: "Your Name", type: "text" },
              { name: "email", placeholder: "Your Email", type: "email" },
              { name: "subject", placeholder: "Subject", type: "text" },
            ].map((input) => (
              <input
                key={input.name}
                type={input.type}
                name={input.name}
                value={formData[input.name as keyof typeof formData]}
                onChange={handleChange}
                required
                placeholder={input.placeholder}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              />
            ))}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
            <FaClock className="text-red-600 text-3xl" />
            <h3 className="text-xl font-semibold">Working Hours</h3>
            <p>Monday : 9:00 AM - 6:00 PM IST</p>
            <p>Tuesday : 9:00 AM - 6:00 PM IST</p>
            <p>Wednesday : 9:00 AM - 7:00 PM IST</p>
            <p>Thursday : 9:00 AM - 6:00 PM IST</p>
            <p>Friday : 9:00 AM - 6:00 PM IST</p>
            <p>Saturday : 9:00 AM - 4:00 PM IST</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
            <FaQuestionCircle className="text-red-600 text-3xl" />
            <h3 className="text-xl font-semibold">FAQs</h3>
            <p>
              Check our FAQs section on the website for quick answers to common
              questions.
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Find Us Here
          </h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="DL Enterprise Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.503262384615!2d72.63170407501191!3d23.04588198490052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84e1f8296f41%3A0x6c894b7d1b0f1e59!2sDL%20Enterprise!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
