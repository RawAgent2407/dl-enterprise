/**
 * eslint-disable react/no-unescaped-entities
 *
 * @format
 */

"use client";
import { LuCircleCheck, LuClock } from "react-icons/lu";

const WarrantyConditionsPage = () => {
  const warranties = [
    { name: "LED Tube Lights", period: "3 years" },
    { name: "COB Lights & Spotlights", period: "2 years" },
    { name: "Panel Lights", period: "3 years" },
    { name: "Street Lights", period: "5 years" },
    { name: "LED Drivers", period: "2 years" },
    { name: "Accessories", period: "1 year" },
  ];

  const whatsCovered = [
    "Manufacturing defects in materials and workmanship",
    "Premature LED failure under normal operating conditions",
    "Driver circuit failures",
    "Housing and fixture defects",
    "Color temperature variations beyond specified tolerances",
  ];

  const notCovered = [
    "Damage due to misuse, abuse, or improper installation",
    "Damage from power surges or electrical issues",
    "Normal wear and tear or gradual dimming over time",
    "Damage from environmental factors (moisture, extreme temperatures)",
    "Products modified or repaired by unauthorized personnel",
    "Cosmetic damage that doesn't affect functionality",
  ];

  const performanceStandards = [
    "Minimum 80% lumen maintenance after 25,000 hours",
    "Color temperature variation within ±200K",
    "Power factor ≥0.9 for all LED drivers",
    "Operating temperature range: -20°C to +50°C",
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-red-600 to-red-700 text-white py-20'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>
            Warranty Conditions
          </h1>
          <p className='text-lg sm:text-xl'>
            Comprehensive warranty coverage for all DL Enterprise LED products
          </p>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-medium text-gray-800 mb-6'>
            Warranty Coverage
          </h2>
          <p className='text-gray-600 mb-8'>
            DL Enterprise provides comprehensive warranty coverage for all our
            LED lighting products. Our warranty terms vary by product category
            and are designed to ensure your complete satisfaction with our
            products.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12'>
            {warranties.map((w) => (
              <div
                key={w.name}
                className='bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:scale-105 transition-transform'
              >
                <span className='text-gray-800 font-medium'>{w.name}</span>
                <span className='text-red-600 font-medium'>{w.period}</span>
              </div>
            ))}
          </div>

          {/* What's Covered */}
          <div className='mb-12'>
            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              What's Covered
            </h3>
            <ul className='space-y-2'>
              {whatsCovered.map((item) => (
                <li
                  key={item}
                  className='flex items-center gap-2 text-green-700'
                >
                  <LuCircleCheck className='flex-shrink-0' /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Not Covered */}
          <div className='mb-12'>
            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              What's Not Covered
            </h3>
            <ul className='space-y-2'>
              {notCovered.map((item) => (
                <li key={item} className='flex items-center gap-2 text-red-700'>
                  <LuCircleCheck className='flex-shrink-0' /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Warranty Claims Process */}
          <div className='mb-12'>
            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              Warranty Claims Process
            </h3>
            <ol className='list-decimal list-inside space-y-2 text-gray-700'>
              <li>
                Contact our customer service team at{" "}
                <strong>+91-49260-51745</strong> or{" "}
                <strong>info@dlent04.com</strong>
              </li>
              <li>Provide proof of purchase (invoice or receipt)</li>
              <li>Describe the issue and provide photos if requested</li>
              <li>Our technical team will assess the claim</li>
              <li>
                If approved, we will provide repair, replacement, or refund as
                appropriate
              </li>
            </ol>
          </div>

          {/* Installation Requirements */}
          <div className='mb-12'>
            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              Installation Requirements
            </h3>
            <p className='text-gray-700'>
              To maintain warranty coverage, all products must be installed by
              qualified electricians in accordance with local electrical codes
              and our installation guidelines. Improper installation may void
              the warranty.
            </p>
          </div>

          {/* Performance Standards */}
          <div className='mb-12 bg-red-50 p-6 rounded-lg'>
            <h3 className='text-red-800 font-medium text-xl mb-4'>
              LED Performance Standards
            </h3>
            <ul className='space-y-2 text-red-700 list-disc list-inside'>
              {performanceStandards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Extended Warranty & International */}
          <div className='mb-12'>
            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              Extended Warranty Options
            </h3>
            <p className='text-gray-700 mb-6'>
              Extended warranty plans are available for purchase at the time of
              product purchase. Contact our sales team for details on extended
              coverage options and pricing.
            </p>

            <h3 className='text-2xl font-medium text-gray-800 mb-4'>
              International Warranty
            </h3>
            <p className='text-gray-700'>
              For products sold outside India, warranty service is provided
              through our authorized distributors. Contact your local
              distributor for warranty claims and service.
            </p>
          </div>

          {/* Contact */}
          <div className='bg-gray-100 p-6 rounded-lg text-gray-800'>
            <h3 className='text-2xl font-medium mb-4'>
              Contact for Warranty Service
            </h3>
            <p>
              <strong>Warranty Department</strong>
            </p>
            <p>DL Enterprise</p>
            <p>Phone: +91-49260-51745</p>
            <p>Email: warranty@dlent04.com</p>
            <p>Service Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarrantyConditionsPage;
