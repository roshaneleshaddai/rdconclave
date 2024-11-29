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
    {/* <video
      
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover z-[-1]"
    >
      <source src="/images/bg.mp4" type="video/mp4" />
    </video> */}
      <div className="flex items-center justify-evenly md:p-2 md:mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center justify-evenly space-x-0 md:space-x-4">
              <Image
            // src="/images/vrseclogo.png"
            src="/images/vr_logo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 120 : 140}
            height={isScrolled ? 120 : 140}
            className={`lg:block hidden rounded-full object-scale-down transition-all duration-300 lg:w-120 lg:h-140`}
            loading="lazy"
          />
          <Image
            // src="/images/vrseclogo.png"
            src="/images/vr_logo.png"
            alt="VRSEC Logo"
            width={isScrolled ? 120 : 140}
            height={isScrolled ? 120 : 140}
            className={`lg:hidden block rounded-full object-scale-down transition-all duration-300 w-24 h-32 `}
            loading="lazy"
          />
          <Image
              // src="/images/ITlogo.jpeg"
              src="/images/it_logoo.jpg"
              // src="/images/it_logo.jfif"
              alt="Information Technology"
              width={isScrolled ? 140 : 160}
              height={isScrolled ? 140 : 160}
              className={`hidden lg:block rounded-full object-scale-down transition-all duration-300 w-24 h-32 `}
            />
        </div>
        <div>
          <div className={`md:block md:text-center transition-all duration-300 ease-in-out ${isScrolled ? 'text-base md:text-2xl' : 'text-lg md:text-3xl'}`}>

            <h2 className="font-bold text-black">
              VELAGAPUDI RAMAKRISHNA<br></br>SIDDHARTHA ENGINEERING COLLEGE
            </h2>
            <h2
                className={`font-normal text-black ${
                  isScrolled ? 'lg:text-lg text-sm' : 'lg:text-xl text-base'
                }`}
              >
                (Deemed to be <span className="font-semibold">University</span>)
                <br />
                <span className="text-black lg:text-sm text-xs">(Under section 3 UGC Act, 1956)</span>
                <br/>
                <span className="lg:text-base text-xs"><span className="text-black">(Sponsored by <span className="font-semibold">Siddhartha Academy of General & Technical Education</span>), Vijayawada, A.P, India.</span></span>
                {/* <span className={`${isScrolled ? 'text-xs lg:text-sm' : 'hidden'}`}> */}
                  {/* <span className="text-black text-sm lg:text-base">
                  (Sponsored by <span className="font-semibold">Siddhartha Academy of General & Technical Education</span>)
                  <span className="hidden lg:inline"><br /></span>
                  Vijayawada, A.P, India.
                </span> */}
        {/* </span> */}

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
          <div className="hidden md:block">
            <Image
              src="https://www.stthomaskannur.ac.in/stm2/img/static/ieee.png"
              alt="ieee"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full bg-white"
            />
          </div>
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
              src="/images/rclogo.png"
              alt="Research conclave"
              width={isScrolled ? 90 : 100} 
              height={isScrolled ? 90 : 100}
              className="rounded-full border-2 border-yellow-300"
              objectFit="contain"
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
          TechTrek
        </Link></li>
        <li><Link
          href="/journalpublications"
          className="" onClick={toggleMenu}>
          Journal Publications
        </Link></li>
        <li><Link
          href="/regi"
          className="" onClick={toggleMenu}>
          Registration
        </Link></li>
        <li>
          <select
            className="text-black w-3/4 rounded p-2 bg-white shadow-md focus:ring-2 focus:ring-blue-500 text-lg"
            defaultValue=""
            onChange={(e) => {
              toggleMenu();
              downloadFile(e.target.value);
              e.target.value = "";
            }}
          >
            <option value="" disabled>
              Download
            </option>
            {fileNames.map((fileName, index) => (
              <option key={index} value={index} className="text-sm">
                {fileName}
              </option>
            ))}
          </select>
        </li>

              <li><Link
          href="/contact_us"
          className="" onClick={toggleMenu}>
          Contact Us
        </Link></li>
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
          TechTrek
        </Link>
        <Link
          href="/journalpublications"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Journal Publications
        </Link>
        <Link
          href="/regi"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
          Registration
        </Link>
        <select
        className={`cursor-pointer m-0.5 bg-[#604CC3] text-white border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${
          isScrolled ? 'text-sm py-1 px-4 w-24' : 'text-base py-1 px-2 w-24'
        } hover:bg-[#FF6600]/10 hover:text-black hover:shadow-lg truncate`}
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
            className="hover:bg-[#FF6600]/10 w-36 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {fileName}
          </option>
        ))}
      </select>
      <Link
          href="/contact_us"
          className={`cursor-pointer m-0.5 bg-[#604CC3] text-white  border-[#1A1A1A] text-[#213555] font-semibold transition-all duration-300 ease-in-out ${isScrolled ? 'text-sm py-1 px-4' : 'text-base py-1 px-2'} hover:bg-[#FF6600]/10  hover:text-black hover:shadow-lg`}
        >
         Contact Us
        </Link>

      </nav>
    </header>
      </div>
  );
};

export default Header;
