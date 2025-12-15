"use client";

import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";

const ContactUsPage = () => {


  return (
    <div className="min-h-screen bg-white">
      <ContactSection />

      {/* Map */}

      <div className=" py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white">
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

      <FAQSection />
    </div>
  );
};

export default ContactUsPage;
