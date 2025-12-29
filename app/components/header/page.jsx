'use client';

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    "PES Template",
    "IEEE conference-template",
    "Springer-Template",  
    "Netherlands Press Template",
    "Journal of Infrastructure, Policy and Development",
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Golden Jubilee Banner */}
      <div className="w-full bg-[#002147] text-[#FFD700] text-center py-1.5 sm:py-2 font-bold text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
        Golden Jubilee Year of Siddhartha Academy of General & Technical Education, Vijayawada
      </div>

      {/* Main Header */}
      <header className={`fixed w-full top-12 sm:top-14 md:top-16 z-50 transition-all duration-300 ease-in-out bg-[#F5F5F5] ${isScrolled ? 'py-1 md:py-1' : 'py-2 md:py-3'}`}>
        <div className="flex items-center justify-between w-full px-2 sm:px-3 md:px-4 lg:px-6">
          
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
            {isOpen ? (
              <FaTimes 
                onClick={toggleMenu} 
                className="text-xl sm:text-2xl cursor-pointer z-50 text-white bg-[#1a3a5c] p-1.5 sm:p-2 rounded" 
              /> 
            ) : (
              <FaBars 
                onClick={toggleMenu} 
                className="text-xl sm:text-2xl cursor-pointer text-white bg-[#1a3a5c] p-1.5 sm:p-2 rounded"
              />
            )}
          </div>

          {/* Logo Section */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/sahelogo.png"
              alt="SIDDHARTHA Academy Logo"
              width={isScrolled ? 50 : 60}
              height={isScrolled ? 50 : 60}
              className="hidden lg:block object-scale-down transition-all duration-300"
              loading="lazy"
            />
            <Image
              src="/images/sahelogo.png"
              alt="SIDDHARTHA Academy Logo"
              width={isScrolled ? 55 : 65}
              height={isScrolled ? 55 : 65}
              className="lg:hidden block object-scale-down transition-all duration-300"
              loading="lazy"
            />
          </div>

          {/* Header Text - Center on Mobile */}
          <div className="flex-1 text-center px-2 sm:px-3 md:px-4">
            <div className="transition-all duration-300 ease-in-out">
              <h2 className={`font-bold text-black transition-all duration-300 ${isScrolled ? 'hidden' : 'block'} ${isScrolled ? 'text-lg md:text-2xl' : 'text-lg sm:text-xl md:text-3xl lg:text-4xl'}`}>
                SIDDHARTHA
              </h2>
              <div className={`border-b-2 border-[#002147] mx-auto transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`} style={{width: '70%'}}></div>

              <h2 className={`font-bold text-black transition-all duration-300 ${isScrolled ? 'hidden' : 'block'} text-xs sm:text-sm md:text-base`}>
                ACADEMY OF HIGHER EDUCATION
              </h2>
              <h2 className={`font-bold text-black transition-all duration-300 ${isScrolled ? 'block' : 'hidden'} text-xs sm:text-sm`}>
                SIDDHARTHA ACADEMY OF HIGHER EDUCATION
              </h2>

              <h2 className="font-normal text-black text-xs sm:text-sm leading-snug sm:leading-normal">
                An Institution Deemed to be <span className="font-semibold">University</span>
                <br className="hidden sm:block" />
                <span className="text-black text-xs sm:text-sm">( Under Section 3 of UGC Act, 1956)</span>
                <br className="hidden sm:block" />
                <span className="text-xs sm:text-sm"><span className="text-black">Kanuru, Vijayawada - 520 007</span></span>
              </h2>
            </div>
          </div>

          {/* Right Side Logos - Desktop Only */}
          <div className="hidden md:flex items-center flex-shrink-0 gap-2 lg:gap-3 transition-all duration-300">
            <div className="flex-shrink-0">
              <Image
                src="/images/s.jpeg"
                alt="Springer"
                width={isScrolled ? 60 : 70}
                height={isScrolled ? 60 : 70}
                className="rounded-full transition-all duration-300"
                loading="lazy"
              />
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/rclogo1.png"
                alt="Research Conclave"
                width={isScrolled ? 60 : 70}
                height={isScrolled ? 60 : 70}
                className="rounded-full transition-all duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation - Narrow Width */}
      <div
        className={`fixed left-0 top-0 w-48 sm:w-56 h-screen bg-[#002147] text-white transition-transform duration-300 z-40 overflow-y-auto pt-28 sm:pt-32 md:pt-36 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-3 sm:p-4 border-b border-[#FFD700] absolute top-0 left-0 right-0">
          <FaTimes 
            onClick={toggleMenu} 
            className="text-xl sm:text-2xl cursor-pointer text-[#FFD700]" 
          />
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex flex-col pt-4 sm:pt-6">
          <Link
            href="/#home"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/meet"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            Industry-Academia Meet
          </Link>
          <Link
            href="/hackathon"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            inSAHEthon
          </Link>
          <Link
            href="/journalpublications"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            Journal Publication
          </Link>
          <Link
            href="/speakers"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            Speakers
          </Link>
          <Link
            href="/schedule"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] border-b border-gray-700 transition-all duration-200 font-semibold text-sm sm:text-base"
            onClick={toggleMenu}
          >
            Schedule
          </Link>

          {/* Download Dropdown */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-700">
            <label className="block text-xs sm:text-sm font-semibold text-[#FFD700] mb-2">
              Download
            </label>
            <select
              className="w-full bg-white text-black rounded p-2 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#FFD700]"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value !== "") {
                  downloadFile(e.target.value);
                }
                e.target.value = "";
              }}
            >
              <option value="" disabled>
                Select template
              </option>
              {fileNames.map((fileName, index) => (
                <option key={index} value={index} className="text-xs sm:text-sm">
                  {fileName}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/contact_us"
            className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-200 font-semibold text-sm sm:text-base"
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
      <nav className="hidden md:flex items-center justify-center bg-[#002147]">
        <Link
          href="/#home"
          className={`cursor-pointer m-0.5 bg-[#002147] border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Home
        </Link>
        <Link
          href="/#about"
          className={`cursor-pointer m-0.5 bg-[#002147] border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          About
        </Link>

        <Link
          href="/meet"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Industry-Academia Meet
        </Link>
        <Link
          href="/hackathon"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          inSAHEthon
        </Link>
        <Link
          href="/journalpublications"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Journal Publication
        </Link>
       
        <Link
          href="/speakers"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Speakers
        </Link>
        <Link
          href="/schedule"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Schedule
        </Link>
        <select
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${
            isScrolled ? 'text-sm py-1 px-4 w-28' : 'text-base py-1 px-2 w-28'
          } hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg truncate`}
          defaultValue=""
          onChange={(e) => {
            if (e.target.value !== "") {
              downloadFile(e.target.value);
            }
            e.target.value = "";
          }}
        >
          <option value="" disabled>
            Download
          </option>
          {fileNames.map((fileName, index) => (
            <option
              key={index}
              value={index}
              className="text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {fileName}
            </option>
          ))}
        </select>
        <Link
          href="/contact_us"
          className={`cursor-pointer m-0.5 bg-[#002147] text-white border-[#1A1A1A] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FFD700]/20 hover:text-black hover:shadow-lg`}
        >
          Contact us
        </Link>
      </nav>
    </div>
  );
};

export default Header;