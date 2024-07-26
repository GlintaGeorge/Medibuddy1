import React, { useState, useCallback, useEffect } from 'react';
import banner from '../../assets/images/top.jpg';

const names = ["BUDDY..", "HANDS.."];

const Banner: React.FC = () => {
  const [newName, setNewName] = useState<string>(names[0]);

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setNewName(names[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <div className="relative w-full h-[80vh]">
      <img
        src={banner}
        alt="Banner"
        className="flex flex-col gap-4 justify-left xl:ml-40 lg:ml-2.5 md:ml-3.5 sm:ml-60 w-full h-full px-3 md:px-0"
      />
      <div className="absolute bottom-0 left-0 w-full text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-text bg-clip-text text-fill-transparent mb-4">
          Your Trusted
        </h1>
        <h1 className="text-4xl font-extrabold bg-gradient-text bg-clip-text text-fill-transparent mb-4">
          {newName}
        </h1>
        <h2 className="text-5xl font-extrabold bg-gradient-text bg-clip-text text-fill-transparent mb-4">
          For Better Health
        </h2>
      </div>
      
    </div>
  );
};

export default Banner;
