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


  const files = [
    "/Authors_ORCID_Information.doc",
    "/PES_Copyright_Agreement_Form.doc",
    "/PES_template.docx",
    "IEEE conference-template-a4.docx",
    "Springer-Template.doc",  
    "Netherlands Press Template-Nanotechnology Perceptions.docx",
    "Journal of Infrastructure, Policy and Development--JIPD-template.docx",
  ];

  const fileNames = [
    "Authors ORCID Information",
    "PES Copyright Agreement Form",
    "PES TEmplate",
    "IEEE conference-template",
    "Springer-Template",  
    "Netherlands Press Template-Nanotechnology Perceptions",
    "Journal of Infrastructure, Policy and Development--JIPD-template",
  ];

  const downloadFile = (index) => {
    if (index === '') return; 
    const link = document.createElement('a');
    link.href = files[index];
    link.setAttribute('download', fileNames[index]); 
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
      <div className="flex items-center justify-between md:justify-evenly md:p-2 md:mx-10 max-w-8xl px-2">
        {/* Hamburger Menu Icon - Mobile Only (Left Side) */}
        <div className="md:hidden flex items-center">
          {isOpen ? (
            <FaTimes onClick={toggleMenu} className="text-2xl cursor-pointer z-50 text-white bg-[#1a3a5c] p-2 rounded" /> 
          ) : (
            <FaBars onClick={toggleMenu} className="text-2xl cursor-pointer text-white bg-[#1a3a5c] p-2 rounded"/>
          )}
        </div>

        {/* Logo Section */}
        <div className="flex items-center justify-center md:justify-evenly space-x-0 md:space-x-4 mx-auto md:mx-0">
              <Image
            // src="/images/vrseclogo.png"
            src="/images/sahelogo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 60 : 70}
            height={isScrolled ? 60 : 70}
            className={`hidden lg:block object-scale-down transition-all duration-300`}
            loading="lazy"
          />
          <Image
            // src="/images/vrseclogo.png"
            src="/images/sahelogo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 70 : 80}
            height={isScrolled ? 70 : 80}
            className={`lg:hidden block object-scale-down transition-all duration-300`}
            loading="lazy"
          />

        </div>

        <div className="flex-1 md:flex-none">
          <div className={`md:block md:text-center transition-all duration-300 ease-in-out text-center md:text-center ${isScrolled ? 'text-xs md:text-base' : 'text-sm md:text-lg'}`}>

            <h2 className={`font-bold text-black ${isScrolled ? 'text-2xl' : 'text-2xl md:text-4xl'} ${isScrolled ? 'hidden' : ''}`}>
            SIDDHARTHA
            </h2>
            <div className={`border-b-2 border-[#002147] mx-auto ${isScrolled ? 'hidden' : ''}`} style={{width: '80%'}}></div>

            <h2 className={`font-bold text-black text-xs md:text-sm ${isScrolled ? 'hidden' : ''}`}>
            ACADEMY OF HIGHER EDUCATION
            </h2>
            <h2 className={`font-bold text-black text-xs md:text-sm ${isScrolled ? '' : 'hidden'}`}>
            SIDDHARTHA ACADEMY OF HIGHER EDUCATION
            </h2>

            <h2
                className={`font-normal text-black text-xs md:text-sm ${
                  isScrolled ? 'text-xs' : 'text-xs md:text-xs'
                }`}
              >
                An Institution Deemed to be <span className="font-semibold">University</span>
                <br />
                <span className="text-black text-xs">( Under Section 3 of UGC Act, 1956)</span>
                <br/>
                <span className="text-xs"><span className="text-black">Kanuru, Vijayawada - 520 007</span></span>
              </h2>
            </div>
          </div>
        <div>
        <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'space-x-2' : 'space-x-3'}`}>
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
              width={isScrolled ? 70 : 80} 
              height={isScrolled ? 70 : 80}
              className="rounded-full"
            />
          </div>
          <div className="hidden  md:block">
          <Image
              src="/images/rclogo1.png"
              alt="Research conclave"
              width={isScrolled ? 70 : 80} 
              height={isScrolled ? 70 : 80}
              className="rounded-full"
              
            />
          </div>
        </div>
        </div>
      </div>
      
      {/* Mobile Sidebar Navigation (Left Side) */}
      <div
        className={`fixed left-0 top-0 w-64 h-screen bg-[#002147] text-white transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button in Sidebar */}
        <div className="flex justify-end p-4 border-b border-[#FFD700]">
          <FaTimes 
            onClick={toggleMenu} 
            className="text-2xl cursor-pointer text-[#FFD700]" 
          />
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex flex-col">
          <Link
            href="/#home"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/meet"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Industry-Academia Meet
          </Link>
          <Link
            href="/hackathon"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            inSAHEthon
          </Link>
          <Link
            href="/journalpublications"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Journal Publication
          </Link>
          <Link
            href="/speakers"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Speakers
          </Link>
          <Link
            href="/schedule"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Schedule
          </Link>

          {/* Download Dropdown in Sidebar */}
          <div className="px-6 py-4 border-b border-gray-700">
            <label className="block text-sm font-semibold text-[#FFD700] mb-2">
              Download Templates
            </label>
            <select
              className="w-full bg-white text-black rounded p-2 font-semibold focus:ring-2 focus:ring-[#FFD700]"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value !== "") {
                  downloadFile(e.target.value);
                }
                e.target.value = "";
              }}
            >
              <option value="" disabled>
                Select a template
              </option>
              {fileNames.map((fileName, index) => (
                <option key={index} value={index} className="text-sm">
                  {fileName}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/contact_us"
            className="px-6 py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-200 font-semibold"
            onClick={toggleMenu}
          >
            Contact us
          </Link>
        </nav>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}

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
          Journal Publication
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
        <select
        className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${
          isScrolled ? 'text-sm py-1 px-4 w-28' : 'text-base py-1 px-2 w-28'
        } hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg truncate`}
        value=""
        onChange={(e) => {
          downloadFile(e.target.value);
          e.target.value = ""; // Reset the select to "Download"
        }}
      >
        <option value="" disabled>
          Download
        </option>
        {fileNames.map((fileName, index) => (
          <option
            key={index}
            value={index}
            className="hover:bg-[#FFD700]/20 w-36 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {fileName}
          </option>
        ))}
      </select>
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