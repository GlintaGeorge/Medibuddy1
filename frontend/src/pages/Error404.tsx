import React from 'react';
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container relative w-full h-screen overflow-hidden">
      <div className="container-star absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#292256] via-[#8446cf] to-[#a871d6]">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star-1-${i}`}
            className={`star-1 absolute rounded-full bg-white animate-twinkle w-1 h-1`}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star-2-${i}`}
            className={`star-2 absolute rounded-full bg-white animate-twinkle w-1 h-1`}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="container-bird perspective-[2000px] absolute w-full h-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`bird-${i}`} className={`bird bird-anim absolute w-[50px] h-[40px] left-1/2 top-1/2`} />
        ))}
      </div>
      <div className="container-title flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
        <div className="title text-[200px] flex">
          <span className="number text-shadow-lg px-2">4</span>
          <div className="moon relative rounded-full w-[160px] h-[160px] bg-white shadow-md animate-rotate flex justify-center items-center">
            <div className="face absolute top-[60%] left-[47%] flex flex-col items-center">
              <div className="mouth bg-[#5c3191] w-[25px] h-[25px] rounded-full animate-snore transform rotate-45 shadow-inner"></div>
              <div className="eyes absolute top-[-30px] left-[-30px] flex">
                <div className="eye-left w-[30px] h-[15px] border-b-4 border-[#5c3191] rounded-b-[100px]"></div>
                <div className="eye-right w-[30px] h-[15px] border-b-4 border-[#5c3191] rounded-b-[100px] ml-[50px]"></div>
              </div>
            </div>
          </div>
          <span className="number text-shadow-lg px-2">4</span>
        </div>
        <div className="subtitle text-[25px] mt-[1.5em] font-lato text-shadow-sm">Oops. Looks like you took a wrong turn.</div>
        <button  onClick={() => navigate(-1)} className="mt-[1.5em] px-[1em] py-[0.5em] text-[22px] text-white bg-transparent border-2 border-white rounded-md cursor-pointer hover:opacity-70 focus:outline-none">
          Go back
          
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
