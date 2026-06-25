/** @format */

"use client";

export default function StatsSection() {
  const stats = [
    { value: "10M+", label: "Valves shipped" },
    { value: "99.9%", label: "Quality compliance" },
    { value: "5k+", label: "Happy customers" },
    { value: "100+", label: "4.5-star reviews" },
  ];

  return (
    <section className='flex flex-col align-start justify-start md:align-center md:justify-center gap-10 lg:gap-20 section-gap-removeal'>
        {/* Header */}
        <div className='text-center mx-auto'>
          <h2>
            Proven Excellence in Every Valve Shipped
          </h2>
          <p className='subheadline mt-4 text-center max-w-full md:max-w-[60%] mx-auto'>
            Delivering unmatched reliability, quality compliance, and customer satisfaction through every product we create. Our commitment to excellence is reflected in the trust of our customers and industry recognition
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className='
            grid 
            grid-cols-2 
            md:grid-cols-4 
            
            gap-8 
            sm:gap-10 
            lg:gap-14
            text-center sm:text-left
          '
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className='
                flex flex-col items-center sm:items-start
                border-b-2 border-[#A60006] pb-2 sm:pb-4
              '
            >
              <h3 className='text-[28px] sm:text-[40px] lg:text-[52px]  font-medium text-[#A60006] leading-tight'>
                {stat.value}
              </h3>
              <p className='text-[15px] sm:text-[16px] lg:text-[18px]  text-[#050b16] mt-2'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}
