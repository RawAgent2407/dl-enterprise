/* eslint-disable @next/next/no-img-element */
const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            About DL Enterprise
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Pioneering LED lighting solutions since 2005, transforming spaces
            with innovative, energy-efficient lighting technology for homes,
            industries, and commercial spaces worldwide.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                Founded in 2005, DL Enterprise began with a simple vision: to
                revolutionize the lighting industry through innovative LED
                technology. What started as a small venture has grown into a
                leading manufacturer of premium LED lighting solutions.
              </p>
              <p>
                Our commitment to excellence drives us to continuously innovate
                and deliver products that not only meet but exceed our
                customers&apos; expectations. We believe in creating lighting
                solutions that are both environmentally responsible and
                economically viable.
              </p>
              <p>
                Today, we serve thousands of customers across various sectors,
                from residential homes to large industrial complexes, always
                maintaining our core values of quality, innovation, and customer
                satisfaction.
              </p>
            </div>
          </div>
          <div className="relative w-full flex justify-center lg:justify-end">
            <img
              src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern LED Manufacturing"
              className="rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              To provide innovative, energy-efficient LED lighting solutions
              that enhance the quality of life while contributing to a
              sustainable future. We strive to deliver exceptional value through
              cutting-edge technology and superior customer service.
            </p>
          </div>
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              To be the global leader in LED lighting technology, recognized for
              our innovation, quality, and commitment to environmental
              sustainability. We envision a world where efficient lighting
              solutions are accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              The principles that guide everything we do and shape our company
              culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                desc: "Continuously pushing boundaries to develop cutting-edge LED technologies that set industry standards.",
              },
              {
                title: "Quality",
                desc: "Maintaining the highest standards in manufacturing and testing to ensure reliable, long-lasting products.",
              },
              {
                title: "Sustainability",
                desc: "Committed to environmental responsibility through energy-efficient solutions and sustainable practices.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform transform hover:scale-110">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 lg:py-28 bg-red-50 text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-red-900">
            Ready to Work With Us?
          </h2>
          <p className="text-lg sm:text-xl text-gray-900 mb-8 leading-relaxed">
            Let&apos;s discuss how our LED lighting solutions can transform your
            space and reduce your energy costs.
          </p>
          <button className="px-8 py-4 text-white bg-red-900 font-semibold rounded-xl hover:bg-red-700 transition-colors text-lg sm:text-xl">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
