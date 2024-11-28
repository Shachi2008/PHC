import React from 'react';

const Map = () => {
  

  return (
    <div className="w-full  px-4 sm:pt-10 pt-5 md:pt-8">
      <div className=" md:h-[780px]">
        <div className="w-full md:w-[610px] mx-auto my-10 flex flex-col gap-3">
          <div className="text-black text-[30px]  md:text-[45px] font-bold  text-center">
            Our Global Reach
          </div>
          <p className="text-[#00000066] font-f_3 text-[18px] md:text-[24px] text-center leading-[22px] md:leading-[28px]">
            Discover the destinations we offer around the world.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-12 w-full md:w-[810px] mx-auto my-10">
          <img src="/map.png" alt="Map" className="w-full md:w-auto" />
          </div>
      </div>
    </div>
  );
};

export default Map;
