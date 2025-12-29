'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PrizesComponent() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    const cardsTimer = setTimeout(() => setCardsVisible(true), 600);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  // Inject professional animated styles
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.getElementById("professional-prize-styles")) {
      const professionalCSS = `
        .professional-gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 33, 71, 0.1), rgba(59, 130, 246, 0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 33, 71, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .professional-gradient-border::before {
          content: "";
          position: absolute;
          inset: -1px;
          padding: 1px;
          background: linear-gradient(135deg, #002147, transparent, #002147);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .professional-gradient-border:hover::before {
          opacity: 1;
        }
        
        .professional-gradient-border:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 33, 71, 0.25);
          border-color: rgba(0, 33, 71, 0.4);
        }
        
        .prize-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 33, 71, 0.2) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `;
      
      const styleElement = document.createElement("style");
      styleElement.id = "professional-prize-styles";
      styleElement.type = "text/css";
      styleElement.appendChild(document.createTextNode(professionalCSS));
      document.head.appendChild(styleElement);
    }
  }, []);

  const prizes = [
    {
      position: 1,
      title: "1st Prize",
      amount: "₹25,000",
      image: '/first.png'
    },
    {
      position: 2,
      title: "2nd Prize",
      amount: "₹15,000",
      image: '/second.png'
    },
    {
      position: 3,
      title: "3rd Prize",
      amount: "₹10,000",
      image: '/third.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-SUSE">
      {/* Header Section */}
      <div className="relative overflow-hidden py-6 sm:py-10 lg:py-16">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="block text-[#002147]">Prizes</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full flex-wrap">
          {prizes.map((prize, index) => {
            const mobileSize = 140;
            const smSize = 160;
            const mdSize = 200;
            const lgSize = 240;

            return (
              <div
                key={prize.position}
                className={`flex flex-col items-center transition-all duration-700 ease-out ${
                  cardsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Prize Image Frame */}
                <div className="mb-4 flex justify-center">
                  <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    style={{
                      width: isMobile ? `${mobileSize}px` : 'auto',
                      height: isMobile ? `${mobileSize}px` : 'auto'
                    }}>
                    <Image
                      src={prize.image}
                      alt={`${prize.title} Prize`}
                      width={isMobile ? mobileSize : lgSize}
                      height={isMobile ? mobileSize : lgSize}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Prize Title */}
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-600 mb-2">
                  {prize.title}
                </p>

                {/* Prize Amount */}
                <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-[#002147]">
                  {prize.amount}
                </p>
              </div>
            );
          })}
        </div>

        {/* Inspiration Section */}
        <div className="mt-10 sm:mt-14 lg:mt-20">
          <div className="professional-gradient-border rounded-2xl p-6 sm:p-10 lg:p-12 text-center">
            <div className="mx-auto max-w-4xl">
              <blockquote className="text-base sm:text-lg md:text-xl italic leading-relaxed text-gray-700">
                "Creativity is just connecting things — stay hungry, stay foolish."
              </blockquote>
              <p className="mt-4 text-[#002147] font-semibold text-sm sm:text-base md:text-lg">— Steve Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}