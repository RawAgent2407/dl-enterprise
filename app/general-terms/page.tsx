/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { FaFileContract, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const GeneralTermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">General Terms</h1>
          <p className="text-lg sm:text-xl">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Acceptance of Terms */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaFileContract /> 1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using DL Enterprise's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Products and Services */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Products and Services</h2>
            <p className="text-gray-700 mb-4">
              DL Enterprise manufactures and supplies LED lighting solutions including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>LED Tube Lights</li>
              <li>COB Lights and Spotlights</li>
              <li>Panel Lights</li>
              <li>Street Lights</li>
              <li>LED Drivers and Controllers</li>
              <li>Lighting Accessories</li>
            </ul>
          </div>

          {/* Pricing and Payment */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Pricing and Payment</h2>
            <p className="text-gray-700">
              All prices are subject to change without notice. Payment terms are net 30 days from invoice date unless otherwise agreed upon in writing. Late payments may incur additional charges as permitted by law.
            </p>
          </div>

          {/* Order Acceptance */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Order Acceptance</h2>
            <p className="text-gray-700">
              All orders are subject to acceptance by DL Enterprise. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or problems identified by our credit or fraud departments.
            </p>
          </div>

          {/* Delivery and Shipping */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Delivery and Shipping</h2>
            <p className="text-gray-700">
              Delivery dates are estimates only and are not guaranteed. DL Enterprise will not be liable for any delays in delivery. Risk of loss and title for products pass to the customer upon delivery to the carrier.
            </p>
          </div>

          {/* Returns and Exchanges */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Returns and Exchanges</h2>
            <p className="text-gray-700">
              Products may be returned within 30 days of delivery, subject to our return policy. Items must be in original condition and packaging. Custom or specially ordered items are not returnable unless defective.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of DL Enterprise and is protected by copyright and other intellectual property laws.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              DL Enterprise's liability for any claim arising from the use of our products or services shall not exceed the purchase price of the specific product or service giving rise to the claim.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaPhone /> 10. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">For questions about these terms, please contact us at:</p>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-gray-700 space-y-1">
              <p><FaMapMarkerAlt className="inline mr-2 text-red-600" /><strong>DL Enterprise</strong></p>
              <p>78 Gajsinani Industrial Park</p>
              <p>Near America Tubemill Compound</p>
              <p>Vatva, Ahmedabad - 382440</p>
              <p>Gujarat, India</p>
              <p><FaPhone className="inline mr-2 text-red-600" />+91-49260-51745</p>
              <p><FaEnvelope className="inline mr-2 text-red-600" />info@dlent04.com</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default GeneralTermsPage;
