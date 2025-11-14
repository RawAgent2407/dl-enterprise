/* eslint-disable @next/next/no-img-element */
"use client";

export default function CustomSolutionsSection() {
  const solutions = [
    {
      icon: "/images/solution1.png",
      title: "Design\nCustomization",
      description: "Custom HVAC designs ensure precision, optimal performance.",
      bgColor: "bg-white",
    },
    {
      icon: "/images/solution2.png",
      title: "Production \nProcess",
      description:
        "Advanced techniques ensure consistent quality, efficient production, and adherence.",
      bgColor: "bg-white",
    },
    {
      icon: "/images/solution3.png",
      title: "Custom \nLogistics",
      description:
        "Superior material selection ensures exceptional durability, reliability.",
      bgColor: "bg-white",
    },
    {
      icon: "/images/solution4.png",
      title: "Material \nSelection",
      description:
        "Efficient logistics systems ensure accurate scheduling, timely delivery.",
      bgColor: "bg-[#b10503]",
      isSpecial: true,
    },
  ];

  return (
    <section className="w-full bg-[#f3f3f3] py-12 sm:py-16 lg:py-20 flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <h2 className="text-[22px] sm:text-[32px] lg:text-[44px] font-['Plus_Jakarta_Sans'] font-semibold leading-tight sm:leading-snug text-[#050b16] text-center sm:text-left mb-10">
          Custom Lights Solutions, <br className="hidden sm:block" />
          From Concept to Creation.
        </h2>

        {/* Solutions Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-4 
            sm:gap-6 
            lg:gap-8
          "
        >
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-start items-start  shadow-sm transition-all duration-300 hover:shadow-md border border-[#e6f0f8] ${solution.bgColor} p-5 sm:p-7 lg:p-8`}
            >
              {/* Special Card Corner */}
              {solution.isSpecial && (
                <div className="absolute top-0 right-0 bg-[#b10503]">
                  <div className="flex justify-end items-center">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white" />
                    <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#242424]" />
                  </div>
                  <div className="flex justify-end items-center">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white" />
                  </div>
                </div>
              )}

              {/* Icon and Title */}
              <div className="flex flex-col gap-2 w-full">
                <img
                  src={solution.icon}
                  alt={solution.title}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                />
                <h3
                  className={`whitespace-pre-line text-[18px] sm:text-[20px] lg:text-[22px] font-['General_Sans'] font-medium leading-snug ${
                    solution.isSpecial ? "text-white" : "text-[#050b16]"
                  }`}
                >
                  {solution.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className={`mt-3 text-[14px] sm:text-[15px] lg:text-[16px] font-['Montserrat'] leading-relaxed ${
                  solution.isSpecial ? "text-white" : "text-[#4d5555]"
                }`}
              >
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
