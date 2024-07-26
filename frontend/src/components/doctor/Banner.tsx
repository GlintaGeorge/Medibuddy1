import React from 'react';
import doctorbanner from '../../assets/images/docbg1.png';

const Banner: React.FC = () => {
  return (
    <>
      <div className="relative w-full h-[90vh]">
        <img src={doctorbanner} alt="Banner Image" className="w-full h-full bottom-0 left-0 text-center" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl absolute bottom-4 gradient-text mb-4 animate-fadeIn">Simplify Your Day, Focus on Healing.</h1>
        </div>
      </div>
    </>
  );
};

export default Banner;
