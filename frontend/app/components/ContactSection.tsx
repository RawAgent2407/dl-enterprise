/** @format */

"use client";

import { CONTACT_DETAILS } from "@/lib/constant";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const contactInfo = [
    {
      type: "Call",
      value: CONTACT_DETAILS.phone.value,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="#A60006" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 6.83185C15.4232 7.43624 16.5638 8.57677 17.1682 10M14.654 2C18.1912 3.02076 20.9791 5.80852 22 9.34563" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      link: CONTACT_DETAILS.phone.link,
    },
    {
      type: "Mail",
      value: CONTACT_DETAILS.email.value,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="#A60006" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="#A60006" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      link: CONTACT_DETAILS.email.link,
    },
    {
      type: "Address",
      value: CONTACT_DETAILS.address.value,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5Z" stroke="#A60006" strokeWidth="1.5" />
          <path d="M12 2C16.0588 2 19.5 5.42803 19.5 9.5869C19.5 13.812 16.0028 16.777 12.7725 18.7932C12.5371 18.9287 12.2709 19 12 19C11.7291 19 11.4629 18.9287 11.2275 18.7932C8.00325 16.7573 4.5 13.8266 4.5 9.5869C4.5 5.42803 7.9412 2 12 2Z" stroke="#A60006" strokeWidth="1.5" />
          <path d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      link: CONTACT_DETAILS.address.link,
    },
    {
      type: "Timing",
      value: CONTACT_DETAILS.time.value,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="13" r="9" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 19L3 21M19 19L21 21" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 9.5V13.5L14 15.5" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3.5V2" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 2H14" stroke="#A60006" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      link: CONTACT_DETAILS.time.link,
    },
  ];
  return (
    <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-20 section-gap-removeal">
      {/* LEFT CONTENT */}
      <div className='max-w-xl mx-auto flex-1 flex flex-col gap-6'>
        <h5 className='uppercase'>
          Need Assistance?
        </h5>
        <div className="flex flex-col gap-4">
          <h2>
            We’re Here To Help.
          </h2>

          <p className='subheadline text-left lg:text-left'>
            For general inquiries or questions regarding sales or press,
            please leave your contact information below and we will get back
            to you as soon as possible.
          </p>
        </div>

        {/* CONTACT INFO */}
        {
          contactInfo.map((info) => (
            <a
              key={info.type}
              href={info.link || "#"}
              target={info.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <span className="py-4 px-4  text-brand-primary"
                style={{
                  boxShadow: "1px 1px 4px 0px #A6ABBD inset",
                  background: "#EBECF000",
                }}
              >
                {info.icon}
              </span>
              <div>
                <p className="subheadline uppercase text-[12px]">
                  {info.type}
                </p>
                <p className='text-base font-medium text-gray-900'>
                  {info.value}
                </p>
              </div>
            </a>
          ))
        }
      </div>

      {/* RIGHT FORM */}
      <ContactForm />
    </section>
  );
}
