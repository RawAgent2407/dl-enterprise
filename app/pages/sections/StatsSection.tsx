"use client";

export default function StatsSection() {
  const stats = [
    { value: "10M+", label: "Valves shipped" },
    { value: "99.9%", label: "Quality compliance" },
    { value: "5k+", label: "Happy customers" },
    { value: "100+", label: "4.5-star reviews" },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-20">
          <h2 className="text-[22px] sm:text-[32px] lg:text-[42px] font-['Plus_Jakarta_Sans'] font-semibold leading-snug text-[#050b16] mb-4">
            Proven Excellence in Every Valve Shipped
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[17px]  text-[#364151] leading-relaxed">
            Delivering unmatched reliability, quality compliance, and customer
            satisfaction through every product we create. Our commitment to
            excellence is reflected in the trust of our customers and industry
            recognition.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-4 
            
            gap-8 
            sm:gap-10 
            lg:gap-14
            text-center sm:text-left
          "
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center sm:items-start
                border-b-2 border-[#e52828] pb-2 sm:pb-4
              "
            >
              <h3 className="text-[28px] sm:text-[40px] lg:text-[52px]  font-semibold text-[#e52828] leading-tight">
                {stat.value}
              </h3>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px]  text-[#050b16] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
