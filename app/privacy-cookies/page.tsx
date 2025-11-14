/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import {
  FaCookieBite,
  FaUserShield,
  FaExclamationTriangle,
} from "react-icons/fa";

const PrivacyCookiesPage = () => {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for basic website functionality",
    },
    {
      name: "Performance Cookies",
      description: "Help us understand how visitors interact with our website",
    },
    {
      name: "Functional Cookies",
      description: "Remember your preferences and settings",
    },
    {
      name: "Marketing Cookies",
      description: "Used to deliver relevant advertisements",
    },
  ];

  const rights = [
    "Access to your personal information",
    "Correction of inaccurate data",
    "Deletion of your personal information",
    "Restriction of processing",
    "Data portability",
    "Objection to processing",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy & Cookies Policy
          </h1>
          <p className="text-lg sm:text-xl">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Introduction */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700">
              DL Enterprise ("we," "our," or "us") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-gray-800 mb-2">
                Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Name and contact information (email, phone, address)</li>
                <li>Company information and job title</li>
                <li>Purchase history and preferences</li>
                <li>Communication preferences</li>
                <li>
                  Payment information (processed securely through third-party
                  providers)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-800 mb-2">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website information</li>
              </ul>
            </div>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Processing orders and providing customer service</li>
              <li>Improving our products and services</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Analyzing website usage and performance</li>
              <li>Complying with legal obligations</li>
              <li>Preventing fraud and ensuring security</li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-gray-800 mb-2 flex items-center gap-2">
                <FaCookieBite /> What Are Cookies?
              </h3>
              <p className="text-gray-700">
                Cookies are small text files stored on your device when you
                visit our website. They help us provide a better user experience
                and analyze how our website is used.
              </p>
            </div>

            <h3 className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FaCookieBite /> Types of Cookies We Use
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {cookieTypes.map((cookie) => (
                <div
                  key={cookie.name}
                  className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform"
                >
                  <h4 className="font-semibold text-gray-800">{cookie.name}</h4>
                  <p className="text-gray-600">{cookie.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-medium text-gray-800 mb-2">
              Managing Cookies
            </h3>
            <p className="text-gray-700">
              You can control cookies through your browser settings. However,
              disabling certain cookies may affect website functionality.
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserShield /> 8. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaExclamationTriangle /> 13. Contact Us
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
              <p>
                <strong>Privacy Officer</strong>
              </p>
              <p>DL Enterprise</p>
              <p>78 Gajsinani Industrial Park</p>
              <p>Near America Tubemill Compound</p>
              <p>Vatva, Ahmedabad - 382440</p>
              <p>Gujarat, India</p>
              <p>Phone: +91-49260-51745</p>
              <p>Email: privacy@dlent04.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyCookiesPage;
