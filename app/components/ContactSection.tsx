/** @format */

"use client";

import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiTimerFill } from "react-icons/ri";

export default function ContactSection() {
  return (
    <section className="w-full bg-white  py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 font=['Instrument Sans']">
      <div className='mx-auto py-4 sm:py-6 lg:py-8'>
        {/* GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center '>
          {/* LEFT CONTENT */}
          <div className='space-y-6 max-w-xl mx-auto'>
            <p className='text-xs font-medium tracking-widest  uppercase'>
              Need Assistance?
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-['Instrument Sans']">
              We’re Here To Help.
            </h2>

            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              For general inquiries or questions regarding sales or press,
              please leave your contact information below and we will get back
              to you as soon as possible.
            </p>

            {/* CONTACT INFO */}
            <div className='grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-1 items-center  gap-y-3 space-y-4 xl:space-y-4 pt-4 px-4'>
              <div className='flex items-center gap-3'>
                <span className='p-3.5 rounded-sm  text-[#A60006] inset-shadow-sm inset-shadow-gray-400/50'>
                  <FaPhoneVolume size={20} />
                </span>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-extrabold'>
                    Call
                  </p>
                  <p className='text-base font-semi text-gray-900'>
                    +91-94260-51745
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <span className='p-3.5 rounded-sm  text-[#A60006] inset-shadow-sm inset-shadow-gray-400/50'>
                  <MdEmail size={22} />
                </span>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-extrabold'>
                    Mail
                  </p>
                  <p className='text-base font-medium text-gray-900'>
                    info@dlent04.com
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='p-3.5 rounded-sm  text-[#A60006] inset-shadow-sm inset-shadow-gray-400/50'>
                  <RiTimerFill size={22} />
                </span>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-extrabold'>
                    Timing
                  </p>
                  <p className='text-base font-medium text-gray-900'>
                    10 AM to 7 PM
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='p-3.5 rounded-sm  text-[#A60006] inset-shadow-sm inset-shadow-gray-400/50'>
                  <FaLocationDot size={22} />
                </span>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-extrabold'>
                    Address
                  </p>
                  <p className='text-base font-medium text-gray-900'>
                    304 - Pride Square, Pushkardham Road, Rajkot-360005,
                    Gujarat, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className='w-full max-w-lg mx-auto  lg:mx-0'>
            <div className='bg-white rounded-xl border border-white shadow-xl p-6 sm:p-8'>
              <form className='space-y-5'>
                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    placeholder='Your Name'
                    className='mt-1 w-full border-b border-gray-300 focus:border-red-600 outline-none py-2 text-sm'
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    placeholder='Your Email'
                    className='mt-1 w-full border-b border-gray-300 focus:border-red-600 outline-none py-2 text-sm'
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Phone number
                  </label>
                  <input
                    type='tel'
                    placeholder='Your Number'
                    className='mt-1 w-full border-b border-gray-300 focus:border-red-600 outline-none py-2 text-sm'
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Message
                  </label>
                  <textarea
                    placeholder='Add Your Message Here'
                    rows={1}
                    className='mt-1 w-full border-b border-gray-300 focus:border-red-600 outline-none py-2 text-sm resize-none'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3  transition'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
