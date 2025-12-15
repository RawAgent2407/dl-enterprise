/* eslint-disable @next/next/no-img-element */
"use client";

export default function PromoSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/img_kitchen.png"
            alt="Modern Kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex flex-col mx-auto  justify-center md:px-12">
          <h2 className="lg:absolute top-20 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ">
            Save Up To <br className="hidden sm:block" />
            35% On Your <br className="hidden sm:block" />
            New Lights...
          </h2>

          <div className="lg:absolute bottom-10 ">
            <div className=" w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12 ">
              {/* Text Section */}
              <div className="flex-1 text-white">
                <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-md">
                  We are often asked how it is done it is possible that we are
                  so beneficial. This is because we all needless have removed
                  margin from our prices.
                </p>
              </div>

              {/* Button Section */}
            </div>
          </div>
          <div className="mt-4 lg:absolute bottom-10  right-20 shrink-0">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
