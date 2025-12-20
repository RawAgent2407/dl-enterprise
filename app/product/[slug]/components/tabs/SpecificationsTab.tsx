/**
 * eslint-disable react/no-unescaped-entities
 *
 * @format
 */

const SpecificationsTab = () => {
  const specsLeft = [
    { label: "Wattage", value: "Brass, steel, plastic" },
    { label: "Outer Diameter", value: "9/16 x 1g" },
    { label: "Fitting Angle", value: "45° SAE" },
    { label: "Reflector Options", value: "Made from durable Brass." },
  ];

  const specsRight = [
    {
      label: "Thread Size",
      value: `1/4" end - 7/16"-20 | NPT end - 1/8"-18 NPT`,
    },
    {
      label: "Shape",
      value: `Fits 3Kg cylinder (1/8"-18) & 1/4" charging line (7/16"-20)`,
    },
    { label: "Mounting Type", value: "R200 PSI" },
    { label: "Origin", value: "Made In India" },
  ];

  return (
    <div className='space-y-8'>
      <h2 className='text-3xl font-medium text-gray-900'>Specifications</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Left Column */}
        <div className='space-y-6'>
          {specsLeft.map((spec, index) => (
            <div key={index}>
              <h3 className='font-medium text-gray-900 mb-1'>{spec.label}</h3>
              <p className='text-gray-700'>{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          {specsRight.map((spec, index) => (
            <div key={index}>
              <h3 className='font-medium text-gray-900 mb-1'>{spec.label}</h3>
              <p className='text-gray-700'>{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTab;
