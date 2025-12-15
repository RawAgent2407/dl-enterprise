"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const products = [
  { label: "LED Tube Lights", href: "/product/led-tube-lights" },
  { label: "COB Lights", href: "/product/cob-lights" },
  { label: "LED Profiles", href: "/product/led-profiles" },
  { label: "Panel Lights", href: "/product/panel-lights" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-black shadow-sm">
      {/* TOP BAR */}
      <div className="">
        <div className="w-full  mx-auto  px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="D.L. Enterprises"
                width={160}
                height={40}
                priority
                className="w-[130px] sm:w-[150px]"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
              <Link href="/" className="nav-link">
                Home
              </Link>

              {/* PRODUCTS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                {/* Trigger */}
                <button
                  className="
      flex items-center gap-1
      text-sm font-medium text-gray-800
      hover:text-red-600
      transition-colors
    "
                  aria-haspopup="true"
                  aria-expanded={isProductsOpen}
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`
      absolute left-0 top-full mt-3 w-60
      rounded-xl border border-gray-100
      bg-white shadow-lg
      transition-all duration-200 ease-out
      ${
        isProductsOpen
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-2 invisible"
      }
    `}
                >
                  <ul className="py-2">
                    {products.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="
              block px-4 py-2.5
              text-sm text-gray-700
              hover:bg-red-50 hover:text-red-600
              transition-colors
            "
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/catalog" className="nav-link">
                Catalogue
              </Link>
              <Link href="/about-us" className="nav-link">
                About
              </Link>
              <Link href="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact-us"
                className="hidden sm:inline-flex  bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 transition"
              >
                Contact Us
              </Link>

              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* DRAWER */}
        <div
          className={`absolute left-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 shadow-sm">
            <Image src="/logo.svg" alt="Logo" width={120} height={30} />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>

          {/* CONTENT */}
          <div className="py-4 space-y-2 px-2 overflow-y-auto h-[calc(100vh-80px)]">
            {/* HOME */}
            <div className="group bg-gray-50 px-4 py-3  transition-all shadow-sm hover:bg-red-50">
              <Link
                href="/"
                className="block text-base font-medium text-black group-hover:text-red-600 transition-colors"
              >
                Home
              </Link>
            </div>

            {/* PRODUCTS */}
            <div className="group bg-gray-50 px-4 py-3  transition-all shadow-sm hover:bg-red-50">
              <button
                className="w-full flex items-center justify-between text-base font-medium text-black group-hover:text-red-600 transition-colors"
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileProductsOpen
                      ? "rotate-180 text-red-600"
                      : "group-hover:text-red-600"
                  }`}
                />
              </button>

              {isMobileProductsOpen && (
                <div className="mt-3 space-y-2 border-l-2 border-red-500 pl-4">
                  {products.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block text-sm text-gray-700 hover:text-red-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CATALOGUE */}
            <div className="group bg-gray-50 px-4 py-3  transition-all shadow-sm hover:bg-red-50">
              <Link
                href="/catalog"
                className="block text-base font-medium text-black group-hover:text-red-600 transition-colors"
              >
                Catalogue
              </Link>
            </div>

            {/* ABOUT */}
            <div className="group bg-gray-50 px-4 py-3  transition-all shadow-sm hover:bg-red-50">
              <Link
                href="/about-us"
                className="block text-base font-medium text-black group-hover:text-red-600 transition-colors"
              >
                About
              </Link>
            </div>

            {/* ABOUT */}
            <div className="group bg-gray-50 px-4 py-3  transition-all shadow-sm hover:bg-red-50">
              <Link
                href="/contact-us"
                className="block text-base font-medium text-black group-hover:text-red-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* CTA */}
            <div className="group">
              <Link
                href="/contact-us"
                className="block  bg-black text-white text-center py-3 font-medium mt-4
               hover:bg-red-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
