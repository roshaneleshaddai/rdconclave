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
  ];

  const fileNames = [
    "Authors ORCID Information.doc",
    "PES Copyright Agreement Form.doc",
    "PES TEmplate.docx"
  ];

  const downloadFiles = () => {
    files.forEach((fileUrl, index) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileNames[index]); // Set the download attribute with the file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the DOM
    });
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
    <header className={`fixed w-full top-0 z-50 h-30 transition-all duration-300 ease-in-out  bg-[#F5F5F5] ${isScrolled ? 'py-0 md:py-2' : 'py-2 md:py-4'}`}>
    {/* <video
      
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover z-[-1]"
    >
      <source src="/images/bg.mp4" type="video/mp4" />
    </video> */}
      <div className="flex items-center justify-between md:p-2 md:mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center space-x-0 md:space-x-4">
          <Image
              src="/images/vrseclogo.png"
              alt="VRSEC Logo"
              width={isScrolled ? 100 : 120}
              height={isScrolled ? 100 : 120}
              className="rounded-full object-contain transition-all duration-300"
              loading="lazy"
          />
          <div className={`md:block md:text-center transition-all duration-300 ease-in-out ${isScrolled ? 'text-xs md:text-2xl' : 'text-xl md:text-4xl'}`}>

            <h2 className="font-bold text-black">
              Velagapudi Ramakrishna Siddhartha Engineering College
            </h2>
            <h2 className={`text-sm text-black   font-normal ${isScrolled ? 'text-xs md:text-base' : 'text-lg md:text-xl'}`}>
              (Deemed to be University)<br></br>
              Kanuru, Vijayawada, Andhra Pradesh, 520007.
            </h2>
          </div>
        </div>
        <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'space-x-2' : 'space-x-4'}`}>
        <div className="hidden md:block">
            <Image
              src="/images/ITlogo.jpeg"
              alt="Information Technology"
              width={isScrolled ? 80 : 100} 
              height={isScrolled ? 80 : 100}
              className="rounded-full"
            />
    
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/s.jpeg"
              alt="springer"
              width={isScrolled ? 80 : 100} 
              height={isScrolled ? 80 : 100}
              className="rounded-full"
            />
          </div>
          <div className="hidden  md:block">
            <Image
              src="/images/rclogo.png"
              alt="Research conclave"
              width={isScrolled ? 80 : 100} 
              height={isScrolled ? 80 : 100}
              className="rounded-full border-2 border-yellow-300"
              objectFit="contain"
            />
          </div>
          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <FaBars onClick={toggleMenu} className="text-2xl cursor-pointer" />
          </div>

          {/* Full Logo for Desktop */}
          <div className="hidden md:block">
            <Image
              src="/images/vikshitbharat.png"
              alt="Azadi ka Amrit Mahostav"
              width={isScrolled ? 80 : 100} 
              height={isScrolled ? 80 : 100}
              className="rounded-full"
            />
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
        className={`fixed left-0 top-0 w-full h-full bg-[#604CC3] text-white text-xl flex flex-col justify-center items-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="space-y-6 text-center ">
        <li><Link
        href="/#home"
        className="" onClick={toggleMenu}>
      Home
      </Link>
      </li>
      <li><Link
      href="/#about"
      className="" onClick={toggleMenu}>
        About
        </Link></li>

        <li><Link
          href="/meet"
          className="" onClick={toggleMenu}>
          Industry-Academic Meet
        </Link></li>
        <li><Link
          href="/hackathon"
          className="" onClick={toggleMenu}>
          HackWeb Challenge
        </Link></li>
        <li><Link
          href="/journalpublications"
          className="" onClick={toggleMenu}>
          Journal Publications
        </Link></li>
        <li><Link
          href="/"
          className="" onClick={toggleMenu}>
          Registration
        </Link></li>
        <li><a
          onClick={()=>{toggleMenu();downloadFiles();}}
          className="" >
          Download
        </a></li>
        </ul>
      </nav>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex items-center justify-center ">
      <Link
        href="/#home"
        className={`cursor-pointer m-0.5 bg-[#604CC3]  border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
      Home
      </Link>
      <Link
      href="/#about"
      className={`cursor-pointer m-0.5 bg-[#604CC3]  border-[#1A1A1A] text-white font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
        About
        </Link>

        <Link
          href="/meet"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Industry-Academic Meet
        </Link>
        <Link
          href="/hackathon"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          HackWeb Challenge
        </Link>
        <Link
          href="/journalpublications"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Journal Publications
        </Link>
        <Link
          href="/"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Registration
        </Link>
        <button
          onClick={downloadFiles}
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Download
        </button>
      </nav>
    </header>
      </div>
  );
};

export default Header;
