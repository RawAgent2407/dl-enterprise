"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-lg border-b shadow-sm text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
              DL
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              className="text-gray-700 hover:text-red-600 transition-colors"
              href="/"
            >
              Home
            </Link>

            {/* PRODUCTS DROPDOWN */}
            <div className="relative">
              <button
                className="group flex items-center text-gray-700 hover:text-red-600 transition-colors"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                Products
                <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {isProductsOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white border shadow-lg rounded-md z-50 "
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <Link
                    href="/product/led-tube-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    LED Tube Lights
                  </Link>
                  <Link
                    href="/product/cob-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    COB Lights
                  </Link>
                  <Link
                    href="/product/led-profiles"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    LED Profiles
                  </Link>
                  <Link
                    href="/product/panel-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    Panel Lights
                  </Link>
                </div>
              )}
            </div>

            <Link
              className="text-gray-700 hover:text-red-600 transition-colors"
              href="/about-us"
            >
              About Us
            </Link>

            <Link
              className="text-gray-700 hover:text-red-600 transition-colors"
              href="/catalog"
            >
              Catalog
            </Link>
          </nav>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-4">
            {/* CART BUTTON */}
            {/* <button className="p-2 text-gray-500 hover:text-red-600 transition">
              <ShoppingCart className="w-6 h-6" />
            </button> */}

            {/* CONTACT BUTTON */}
            <Link
              href="/contact-us"
              className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Contact Us
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {/* MOBILE NAV */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>

            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="flex justify-between items-center gap-1 px-3 py-2 text-gray-700 hover:bg-gray-50 w-full"
              >
                Products
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isMobileProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Product menu */}
              {isMobileProductsOpen && (
                <div className="ml-4 mt-1 border-l border-gray-200 pl-4 space-y-2">
                  <Link
                    href="/product/led-tube-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    LED Tube Lights
                  </Link>
                  <Link
                    href="/product/cob-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    COB Lights
                  </Link>
                  <Link
                    href="/product/led-profiles"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    LED Profiles
                  </Link>
                  <Link
                    href="/product/panel-lights"
                    className="block px-4 py-2 text-gray-700 hover:text-red-600"
                  >
                    Panel Lights
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about-us"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              About Us
            </Link>

            <Link
              href="/catalog"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              Catalog
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
