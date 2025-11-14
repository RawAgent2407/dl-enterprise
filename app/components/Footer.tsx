"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Logo */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                DL
              </div>
              <span className="ml-2 font-bold text-gray-900">Enterprise</span>
            </div>
          </div>

          {/* Contact Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider">
              Contact Company
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Tube lights</p>
              <p>Panel lights</p>
              <p>Cob down lights</p>
              <p>High Bay lights</p>
              <p>street Lights</p>
            </div>
          </div>

          {/* Configurator */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider">
              Configurator
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Company</p>
              <p>Custom Solutions</p>
              <p>FAQs</p>
              <p>loose high kitchen cabinets</p>
              <p>help with design</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91-49260-51745</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91-49260-51745</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@dlent04.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>
                  78 Gajsinani Industrial Park, Near America Tubemill Compound,
                  Vatva, Ahmedabad - 382440, Gujarat, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4 md:mb-0">
              <span>DL Enterprise</span>
             <Link href="/general-terms" className="hover:text-gray-700">
                General Terms
              </Link>
              <Link href="/warranty-conditions" className="hover:text-gray-700">
                Warranty Conditions
              </Link>
              <Link href="/faqs" className="hover:text-gray-700">
               FAQs


              </Link>
              <Link href="/privacy-cookies" className="hover:text-gray-700">
                Privacy & Cookies
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 DL Enterprise. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
