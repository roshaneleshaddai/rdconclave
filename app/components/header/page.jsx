'use client';  // Ensure this is at the very top of the file

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import close icon
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scrolling
  const router = useRouter();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to navigate to the home page and scroll to a specific section
  const scrollToSection = (section) => {
    if (router.pathname !== '/') {
      router.push(`/#${section}`);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Only Springer-Template zip file
  const springerFileName = "Springer-Template";
  const springerZipPath = "/Springer-Template.zip";

  const downloadSpringerZip = () => {
    const link = document.createElement('a');
    link.href = springerZipPath;
    link.setAttribute('download', springerFileName + ".zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Add event listener to detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);  // When scrolled past 100px, set to true
      } else {
        setIsScrolled(false); // Otherwise, set to false
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
  <div className="relative w-full h-full">
    <header className={`fixed w-full top-0 z-50 h-30 transition-all duration-300 ease-in-out  bg-[#F5F5F5] ${isScrolled ? 'py-1 md:py-1' : 'py-1 md:py-1'}`}>
      <div className="w-full bg-[#002147] text-[#FFD700] text-center py-1 font-bold text-sm md:text-base">
        Golden Jubilee Year of Siddhartha Academy of General & Technical Education, Vijayawada
      </div>
    {/* <video
      
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover z-[-1]"
    >
      <source src="/images/bg.mp4" type="video/mp4" />
    </video> */}
      <div className="flex items-center justify-evenly md:p-2 md:mx-10 max-w-8xl">
        {/* Logo Section */}
        <div className="flex items-center justify-evenly space-x-0 md:space-x-4 mx-2">
              <Image
            // src="/images/vrseclogo.png"
            src="/images/sahelogo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 70 : 90}
            height={isScrolled ? 70 : 90}
            className={`lg:block hidden object-scale-down transition-all duration-300 lg:w-120 lg:h-90`}
            loading="lazy"
          />
          <Image
            // src="/images/vrseclogo.png"
            src="/images/sahelogo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 110 : 120}
            height={isScrolled ? 110 : 120}
            className={`lg:hidden block object-scale-down transition-all duration-300 w-24 h-32 `}
            loading="lazy"
          />
          {/* <Image
              // src="/images/ITlogo.jpeg"
              src="/images/it_logoo.jpg"
              // src="/images/it_logo.jfif"
              alt="Information Technology"
              width={isScrolled ? 140 : 160}
              height={isScrolled ? 140 : 160}
              className={`hidden lg:block  object-scale-down transition-all duration-300 w-24 h-32 `}
            /> */}
            

        </div>

        <div className="">
          <div className={`md:block md:text-center transition-all duration-300 ease-in-out ${isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>

            <h2 className={`font-bold text-black text-5xl ${isScrolled ? 'hidden' : ''}`}>
            SIDDHARTHA
            </h2>
            <div className={`border-b-2 border-[#002147] mx-auto ${isScrolled ? 'hidden' : ''}`} style={{width: '100%'}}></div>

            <h2 className={`font-bold text-black ${isScrolled ? 'hidden' : ''}`}>
            ACADEMY OF HIGHER EDUCATION
            </h2>
            <h2 className={`font-bold text-black  ${isScrolled ? '' : 'hidden'}`}>
            SIDDHARTHA ACADEMY OF HIGHER EDUCATION
            </h2>

            <h2
                className={`font-normal text-black ${
                  isScrolled ? 'lg:text-sm text-xs' : 'lg:text-xs text-base'
                }`}
              >
                An Institution Deemed to be <span className="font-semibold">University</span>
                <br />
                <span className="text-black lg:text-xs text-xs">(Under Section 3 of UGC Act, 1956)</span>
                <br/>
                <span className="lg:text-xs text-xs"><span className="text-black">Kanuru, Vijayawada - 520 007, AP. www.vrsiddhartha.ac.in</span></span>
              </h2>
            </div>
          </div>
        <div>
        <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'space-x-2' : 'space-x-4'}`}>
        <div className="hidden md:block">
            {/* <Image
              src="/images/ITlogo.jpeg"
              alt="Information Technology"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full"
            /> */}
    
          </div>
          {/* <div className="hidden md:block">
            <Image
              src="https://www.stthomaskannur.ac.in/stm2/img/static/ieee.png"
              alt="ieee"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full bg-white"
            />
          </div> */}
          <div className="hidden md:block">
            <Image
              src="/images/s.jpeg"
              alt="springer"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full"
            />
          </div>
          <div className="hidden  md:block">
          <Image
              src="/images/rclogo1.png"
              alt="Research conclave"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full"
              
            />
          </div>
          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <FaBars onClick={toggleMenu} className="text-2xl cursor-pointer" />
          </div>

          {/* Full Logo for Desktop */}
          {/* <div className="hidden md:block">
            <Image
              src="/images/vikshitbharat.png"
              alt="Azadi ka Amrit Mahostav"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full"
            />
          </div> */}
        </div>
        </div>
          <div className="md:hidden">
          {isOpen ? (
            <FaTimes onClick={toggleMenu} className="text-xl cursor-pointer z-50 absolute right-6 top-8" /> 
          ) : (
            <FaBars onClick={toggleMenu} className="text-xl cursor-pointer absolute right-6 top-8"/>
          )}
        </div>
      </div>
      

      {/* Mobile Navigation Menu */}
      <nav
        className={`fixed left-0 top-0 w-full h-full bg-[#002147] text-white text-xl flex flex-col justify-center items-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="space-y-6 text-center ">
          {/* ...existing code... */}
          <li>
            <button
              className="text-black w-3/4 rounded p-2 bg-white shadow-md focus:ring-2 focus:ring-blue-500 text-lg"
              onClick={() => {
                toggleMenu();
                downloadSpringerZip();
              }}
            >
              Download Springer-Template
            </button>
          </li>
          {/* ...existing code... */}
      </nav>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex items-center justify-center ">
      <Link
        href="/#home"
        className={`cursor-pointer m-0.5 bg-[#002147]  border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
      Home
      </Link>
      <Link
      href="/#about"
      className={`cursor-pointer m-0.5 bg-[#002147]  border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
        About
        </Link>

        <Link
          href="/meet"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
          Industry-Academia Meet
        </Link>
        <Link
          href="/hackathon"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
          inSAHEthon
        </Link>
        <Link
          href="/journalpublications"
            className={`cursor-pointer m-0.5 bg-[#002147] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
          >
            Conference Themes
          </Link>
       
        <Link
          href="/speakers"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
          Speakers
        </Link>
        <Link
          href="/schedule"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
          Schedule
        </Link>
        <button
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${
            isScrolled ? 'text-sm py-1 px-4 w-28' : 'text-base py-1 px-2 w-28'
          } hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg truncate`}
          onClick={downloadSpringerZip}
        >
          Download Springer-Template
        </button>
      <Link
          href="/contact_us"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20  hover:text-black hover:shadow-lg`}
        >
         Contact us
        </Link>

      </nav>
    </header>
      </div>
  );
};

export default Header;
