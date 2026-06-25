/** @format */
"use client";

import {
  LuMail,
  LuMapPin,
  LuPhone,
  LuInstagram,
  LuYoutube,
  LuFacebook,
  LuTwitter
} from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_DETAILS, FooterLinks, Links } from "@/lib/constant";
import { SVGICONS } from "../static";

const Footer = () => {

  const contactInfo = [
    {
      icon: <LuPhone size={16} />,
      text: CONTACT_DETAILS.phone.value,
      link: CONTACT_DETAILS.phone.link
    },
    {
      icon: <LuMail size={16} />,
      text: CONTACT_DETAILS.email.value,
      link: CONTACT_DETAILS.email.link
    },
    {
      icon: <LuMapPin size={16} />,
      text: CONTACT_DETAILS.address.value,
      link: CONTACT_DETAILS.address.link
    }
  ];

  return (
    <footer className='w-full bg-[#F3F3F3] '>
      {/* TOP SECTION */}
      <div className=' flex flex-col lg:flex-row gap-12 section-gap-removeal '>
        {/* LEFT – RED IMAGE */}
        <div className="relative basis-[4/12] bg-brand-primary footer-padding-x footer-padding-y"
          style={{
            boxShadow: "145px 6px 90px 0px rgba(0, 0, 0, 0.08)"
          }}
        >
          <div className="absolute inset-0 bg-[url('/images/footer-red-background.png')] bg-cover bg-center  opacity-30"></div>
          {/* CONTENT OVER IMAGE */}
          <div className='relative inset-0 z-10 flex flex-col items-start justify-center  gap-8 text-white'>
            <Image
              src='/logo.svg'
              alt='DL Enterprises'
              width={188}
              height={48}
            />

            {
              contactInfo.map((info, index) => (
                <a key={index} href={info.link} target="_blank" rel="noopener noreferrer">
                  <div key={index} className='flex items-center cursor-pointer gap-3 text-base leading-relaxed'>
                    {info.icon}
                    <span className="whitespace-pre-wrap">{info.text}</span>
                  </div>
                </a>
              ))
            }
          </div>
        </div>

        {/* RIGHT – LINKS */}

        <div className='basis-[8/12] footer-padding-x footer-padding-y mx-auto'>
          <div className="flex flex-row gap-10 items-start justify-evenly">
            {
              Object.entries(FooterLinks).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-4">
                  <h4 className='text-base font-medium text-gray-500 uppercase tracking-wider mb-4'>
                    {title}
                  </h4>
                  <ul className='flex flex-col flex-nowrap gap-4 text-base text-gray-700'>
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className='border-t border-gray-400 flex flex-col md:flex-row md:justify-between items-center gap-6 mx-10 sm:mx-20 py-8 text-center text-base text-gray-500'>
        <p>
          © 2025 DL Enterprise. All rights reserved are registered trademarks.
          <Link href={Links.legal} className='underline'>
            Legal information
          </Link>
        </p>

        <div className='flex justify-center gap-4'>
          <Link href={Links.instagram} target="_blank" rel="noopener noreferrer" >
            <SVGICONS.instagram scale={{ width: "24", height: "24" }} />
          </Link>
          <Link href={Links.facebook} target="_blank" rel="noopener noreferrer" >
            <SVGICONS.facebook scale={{ width: "24", height: "24" }} />
          </Link>
          <Link href={Links.twitterX} target="_blank" rel="noopener noreferrer" >
            <SVGICONS.trwitterX scale={{ width: "24", height: "24" }} />
          </Link>
          <Link href={Links.linkdin} target="_blank" rel="noopener noreferrer" >
            <SVGICONS.linkdin scale={{ width: "24", height: "24" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
