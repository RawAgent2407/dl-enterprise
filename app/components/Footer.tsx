import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  X,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        {/* LEFT – RED IMAGE */}
        <div className="relative  h-[375px] sm:h-[400px]  lg:h-[500px]  2xl:h-[580px]">
          {/* Mobile */}
          <Image
            src="/images/Frame375.png"
            alt="Footer background"
            fill
            className=" md:hidden"
            priority
          />

          {/* Tablet */}
          <Image
            src="/images/Frame680.png"
            alt="Footer background"
            fill
            className=" hidden md:block lg:hidden"
            priority
          />
          {/* Tablet */}
          <Image
            src="/images/Frame500.png"
            alt="Footer background"
            fill
            className=" hidden lg:block 2xl:hidden"
            priority
          />

          {/* Desktop / Large */}
          <Image
            src="/images/Frame720.png"
            alt="Footer background"
            fill
            className=" hidden 2xl:block"
            priority
          />

          {/* CONTENT OVER IMAGE */}
          <div className="absolute inset-0 z-10 flex flex-col items-start justify-center p-8 sm:p-20   gap-8 text-white">
            <Image
              src="/logo.svg"
              alt="DL Enterprises"
              width={188}
              height={48}
            />

            <div className="flex items-center gap-3 text-base">
              <Phone size={16} />
              <span>+91-94260-51745</span>
            </div>

            <div className="flex items-center gap-3 text-base">
              <Mail size={16} />
              <span>info@dlent04.com</span>
            </div>

            <div className="flex items-start gap-3 text-base leading-relaxed">
              <MapPin size={18} className="mt-1" />
              <span>
                78 Gajanand Industrial Park,
                <br />
                Near Ambica Tubemill Compound,
                <br />
                Vatva, Ahmedabad – 382440,
                <br />
                Gujarat, India
              </span>
            </div>
          </div>

          {/* Optional overlay for readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* RIGHT – LINKS */}

        <div className="mx-auto max-w-2xl items-center  flex justify-between flex-row gap-10 p-8  w-full h-full">
          {/* PRODUCTS */}
          <div>
            <h4 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2  md:space-y-4 lg:space-y-6 text-base text-gray-700">
              <li>Tube Lights</li>
              <li>Panel Lights</li>
              <li>COB Down Lights</li>
              <li>High Bay Lights</li>
              <li>Street Lights</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-4 lg:space-y-6 text-base text-gray-700">
              <li>
                <Link href="/company">Company</Link>
              </li>
              <li>
                <Link href="/custom-solutions">Custom Solutions</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
              <li>
                <Link href="/design-help">loose high kitchen cabinets</Link>
              </li>
              <li>
                <Link href="/design-help">Help with Design</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-400  md:flex md:justify-between items-center mx-10 sm:mx-20 py-8 text-center text-base text-gray-500">
        <p>
          © 2025 DL Enterprise. All rights reserved are registered trademarks.
          <Link href="/legal" className="underline">
            Legal information
          </Link>
        </p>

        <div className="flex justify-center gap-4 mt-6 md:mt-0">
          <Instagram size={25} />
          <X size={25} />
          <Facebook size={25} />
          <Youtube size={25} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
