/** @format */

"use client";

import { LuMenu, LuX } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMegaMenu from "./MobileMegaMenu";
interface HeaderProps {
  megaMenuData: any[];
}
const Header: React.FC<HeaderProps> = ({ megaMenuData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup (important when navigating pages)
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  return (
    <header className='sticky top-0 z-50 bg-white text-black shadow-sm'>
      {/* TOP BAR */}
      <div className=''>
        <div className='w-full  mx-auto  px-4 sm:px-6 lg:px-12 xl:px-20'>
          <div className='flex h-20 items-center justify-between'>
            {/* LOGO */}
            <Link href='/' className='flex items-center'>
              <Image
                src='/logo.svg'
                alt='D.L. Enterprises'
                width={160}
                height={40}
                priority
                className='w-[130px] sm:w-[150px]'
              />
            </Link>

            {/* DESKTOP NAV */}
            <DesktopMenu megaMenuData={megaMenuData} />

            {/* RIGHT */}
            <div className='flex items-center gap-4'>
              <Link
                href='/contact-us'
                className='hidden md:inline-flex  bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 transition'
              >
                Contact Us
              </Link>
              {/* MOBILE MENU BUTTON */}
              {
                isMobileMenuOpen ? (
                  <button
                    className='md:hidden'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LuX />
                  </button>
                ) : (
                  <button
                    className='md:hidden'
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <LuMenu />
                  </button>
                )
              }
            </div>
          </div>
        </div>
        {/* MOBILE DRAWER */}

        <MobileMegaMenu
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          megaMenuData={megaMenuData}
        />
      </div>
    </header>
  );
};

export default Header;
