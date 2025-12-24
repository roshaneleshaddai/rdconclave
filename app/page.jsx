'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import "./globals.css";
import { useRouter } from 'next/router';

export default function Home() {
  const images = [
    { src: "/images/immeeting.jpg", alt: "Image 1" },
    { src: "/images/hackathonn.jpg", alt: "Image 2" },
    { src: "/images/pubimg.jpg", alt: "Image 3" },
  ];
  const researchimages = [
    { src: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/VRSEC-Web-Slide458.png", alt: "Image 1" },
    { src: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/VRSEC-_-Web-Slide-53.png", alt: "Image 2" },
    { src: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/VRSEC-_-Web-Slide-54.png", alt: "Image 3" },
    { src: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/VRSEC-_-Web-Slide-52.png", alt: "Image 4" },
  ];

  const aluminiimages = [
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2022/08/NFORMATION-ECHNOLOGY-1024x577.jpg", alt: "Image 1" },
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2022/08/NFORMATION-ECHNOLOGY-1-1024x577.jpg", alt: "Image 2" },
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2022/07/it2.png", alt: "Image 3" },
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2022/07/it3.png", alt: "Image 4" },
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2022/07/it5.png", alt: "Image 5"},
    { src: "https://www.vrsiddhartha.ac.in/it/wp-content/uploads/2021/11/12-1024x683.png", alt: "Image 6"},
  ];
  // Assuming you're using Next.js for Image component

function HorizontalImageScroller({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    
    <div className="relative w-full flex flex-col justify-center items-center p-4">
      {/* Image and Arrows Container */}
      <div className="relative flex justify-center items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
        >
          &#10094;
        </button>

        {/* Image slider */}
        <div className="relative w-full h-100 flex overflow-hidden justify-center items-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full flex justify-center items-center">
                 <div style={{ position: 'relative', width: '850px', height: '250px' }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover" }} // Ensures the image covers the entire area
                />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
        >
          &#10095;
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`cursor-pointer w-3 h-3 rounded-full mx-1 ${
              currentIndex === index ? 'bg-black' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}


  const ClickableCircles = () => {
    // Function to handle redirects
   const handleRedirect = (url) => {
  window.location.href=url;
};
    return (
<div className="" >
        <div
          className="bg-[#002147]/10 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 text-center"
        >
          <h1 className="text-4xl font-extrabold text-[#002147]">Research Conclave 2026</h1>
          <h2 className="text-2xl font-bold mt-2 text-[#002147]">Organized by Research & Development Cell</h2>
          <h3 className="text-xl font-semibold mt-1 text-[#002147]">Departments of CSE, ECE, IT & MBA</h3>
          <h3 className="text-xl font-semibold mt-1 text-[#002147]">VR SIDDHARTHA SCHOOL OF ENGINEERING</h3>
          <h1 className="text-3xl font-extrabold mt-4 text-[#00D700] drop-shadow-[0_0_10px_white]">January 23rd - 24th, 2026</h1>
          <h2 className="text-2xl font-bold mt-2 text-[#00D700] drop-shadow-[0_0_10px_white]">1 Lakh worth Cash Prizes</h2>
          <p className="text-md mt-1 text-gray-700">Accommodation, Food and Swags</p>
          <p className="text-lg font-bold mt-2 text-black">Registrations Open</p>
          <p className="text-md font-semibold mt-1 text-black">Mode: Offline (In-Person Only)</p>
          <p className="text-lg font-semibold mt-1 text-black">Venue: V. R. Siddhartha School of Engineering</p>
        </div>

<div className="flex flex-col items-center lg:flex-row lg:justify-center min-h-full p-4 ">
  {/* Track 1: Industry-Academic Meet */}
  <div
    onClick={() => handleRedirect("/meet")}
    className="mt-5 bg-[#002147]/5 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FFD700]/10 flex flex-col items-center justify-center h-[32rem] lg:w-[23rem] w-[22rem] border-t-4 border-[#002147]"
  >
    <div className="flex-0.5 flex items-center justify-center">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#002147]">
        Track 1:<br/>Industry-Academic Meet
      </h1>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center font-bold mt-4 space-y-2">
       <div className="flex flex-wrap justify-center gap-2 text-center">
          <p className="text-sm text-gray-600">AT&T, TCS, POWERLAB, AMUN, Tech Mahindra, OSRAM, RODIS, HCL, PEGA, Persistent, Avantel, SPARK</p>
       </div>
      <button className="p-2 m-2 bg-[#002147] text-white text-lg rounded-full hover:bg-[#003366]">
        Know more..
      </button>
    </div>
  </div>

  {/* Track 2, 3: inSAHEthon */}
  <div
    onClick={() => handleRedirect("/hackathon")}
    className="mt-5 bg-[#002147]/5 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FFD700]/10 flex flex-col items-center justify-center h-[32rem] lg:w-[23rem] w-[22rem] border-t-4 border-[#002147]"
  >
    <div className="flex-0.5 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#002147]">
        Track 2, 3:<br/>inSAHEthon
      </h1>
      <p className="text-center text-sm font-semibold text-gray-600">(CodeFusion, TechEmbed)</p>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center font-bold text-sm mt-2">
      <p className="text-center">Registration Deadline:<br/><span className="text-[#002147] text-base">5th January 2026</span></p>
      <p className="text-center mt-2">Final Round Notification:<br/><span className="text-[#002147] text-base">8th January 2026</span></p>
      <p className="text-center mt-2">Final Round:<br/><span className="text-[#002147] text-base">Jan 23rd - 24th, 2026</span></p>
      <div className="flex gap-4 mt-2 text-[#00D700] text-xl font-extrabold drop-shadow-[0_0_10px_white]">
        <span>₹25,000</span>
        <span>₹15,000</span>
        <span>₹10,000</span>
      </div>
      <button className="p-2 m-2 bg-[#002147] text-white text-lg rounded-full hover:bg-[#003366]">
        Know more..
      </button>
    </div>
  </div>

  {/* Track 4: Scopus Publications */}
  <div
    onClick={() => handleRedirect("/journalpublications")}
    className="mt-5 bg-[#002147]/5 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FFD700]/10 flex flex-col items-center justify-center h-[32rem] lg:w-[23rem] w-[22rem] border-t-4 border-[#002147]"
  >
    <div className="flex-0.5 flex items-center justify-center">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#002147]">
        Track 4:<br/>Scopus Publications
      </h1>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center font-bold text-sm mt-2">
      <p className="text-center">Submission Deadline:<br/><span className="text-[#002147] text-base">December 30th, 2025</span></p>
      <p className="text-center mt-2">Acceptance Notification:<br/><span className="text-[#002147] text-base">January 5th, 2026</span></p>
      <p className="text-center mt-2">Registration Deadline:<br/><span className="text-[#002147] text-base">December 30th, 2025</span></p>
      <p className="text-center mt-2">Registration Fee:<br/><span className="text-[#002147] text-base">₹12,000</span></p>
      <p className="text-center mt-2 text-gray-500">Springer</p>
      <button className="p-2 m-2 bg-[#002147] text-white text-lg rounded-full hover:bg-[#003366]">
        Know more..
      </button>
    </div>
  </div>
</div>

      </div>
    );
  };
  
  const About = () => {
    const aboutText = [
      "The Research Conclave is a multidisciplinary event designed to bridge the gap between industry, academia, and students while promoting innovative research and collaboration.",
      "The program is structured to facilitate meaningful interactions and knowledge exchange among industry experts, academic professionals, and students.",
      "The event comprises three key components: an Industry-Academia Meet, inSAHEthon, and Journal Publication."
      ];
    const [visibleLines, setVisibleLines] = useState([]);

    // Immediately reveal content to avoid blank section
    useEffect(() => {
      const all = aboutText.map((_, i) => i);
      setVisibleLines(all);
    }, []);
  
    return (
      <section id="about" className="p-10 flex  justify-center items-center bg-[#002147]/10 bg-opacity-50 mt-5">
        
        <div className="md:px-12">
        <div className="text-3xl font-bold text-[#002147] underline-offset-8">
          About Research Conclave
          <hr className="h-1 my-4 bg-[#002147] border-0  w-1/3" />

        </div>
        <div className=" font-medium sm:text-xl">
          {aboutText.map((line, index) => (
            <p
              key={index}
              className={`text-lg text-justify px-2 transition-opacity duration-300 ${
                visibleLines.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
       <div className="flex gap-2 mt-4">
         {/* <button className="bg-[#213555] font-bold text-white p-4 rounded-md hover: border-2 hover:border-[#213555]">Registration  &#10095;</button> */}
        </div>
        </div>
        
      </section>
    );
  };
  
  function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Infinite scrolling effect
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className=" w-full">
        <div
          className="relative w-full h-[620px]"  
          style={{ scrollBehavior: "smooth" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 m-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              
              <Image
                src={image.src}
                alt={image.alt}
                fill  
                className="object-cover"  
                priority={currentIndex === index} 
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`cursor-pointer w-3 h-3 rounded-full mx-1 ${
                currentIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    );
  }


  const InfoSection = () => {
    const [videoVisible, setVideoVisible] = useState(true);
    const [visibleObjectives, setVisibleObjectives] = useState([]);
  
    const objectives = [
      
"Paper Publications in Journals",
"Sponsored Projects Handled ",
"Collaborative Projects Handled",
"Patents",
"R&D Consultancy"
    ];
  
    useEffect(() => {
      // Immediately mark video/objectives as visible to avoid blank content
      objectives.forEach((_, index) => {
        setTimeout(() => {
          setVisibleObjectives((prevObjectives) => [
            ...new Set([...prevObjectives, index]),
          ]);
        }, index * 300);
      });
    }, []);
  
    return (
      <section id="research" className="p-5 flex flex-col justify-center items-center md:mx-10">
        <div className="container flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:basis-2/3  p-4">
            <h2 className="text-3xl font-bold text-[#002147]">
              Research@SAHE
              <hr className="h-1 my-8 bg-[#002147] border-0 w-1/2 " />
            </h2>
            <p className="mb-4 font-medium sm:text-xl text-lg text-justify">
            The wing will carry out R&D review of every department once or more in every semester and give guidelines for corrective action and improvement in R&D activities of departments. R&D activities are quantified and R&D index of the departments is computed and compared. Further, this is brought to the notice of all the HODs through ppt presentation. Also the report so generated is forwarded to the academy.
            <br></br>The principle components of R&D for computation of R&D index are:

            </p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              {objectives.map((objective, index) => (
                <li
                  key={index}
                  className={`font-medium transition-opacity duration-500 ${
                    visibleObjectives.includes(index) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {objective}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:basis-1/3 p-4">
          <motion.div
      initial={{ opacity: 0, translateY: 100 }} // Start fully transparent and below
      animate={videoVisible ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: 100 }} // Fade in and move up
      transition={{ duration: 1 }} // Adjust the duration for smoothness
      className="relative"
    >
      <iframe
        id="info-video"
        width="100%"
        height="405"
        src="https://www.youtube.com/embed/-uFY1md-knE"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>

          </div>
        </div>
      </section>
    );
  };
  
  const ResearchNames = () => {
    // Array of researchers' names and image paths
    const [isVisible, setIsVisible] = useState(true);
    const Patrons = [
      { name: 'Sri K.V Chowdary, IRS', imgSrc: 'https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Chancellor-K-V-Chowdary.jpg', position: 'Chancellor, SAHE' },
      { name: 'Sri M. Rajaiah', imgSrc: 'https://www.siddharthaacademy.ac.in/img/team/rajaiah.png', position: 'President, SAGTE' },
      { name: 'Sri P. Lakshmana Rao', imgSrc: 'https://www.siddharthaacademy.ac.in/img/team/lakshmana%20rao.png', position: 'Secretary, SAGTE' },
      { name: 'Prof. P. Venkateswara Rao', imgSrc: 'https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg', position: 'Vice Chancellor, SAHE' },
      { name: 'Prof. A. V. Ratna Prasad', imgSrc: 'https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg', position: 'Pro-Vice Chancellor, SAHE' },
    ];

  const topResearcher = Patrons[0];
  const bottomResearchers = Patrons.slice(1);
  
    useEffect(() => {
      // Ensure section is visible on initial render
      setIsVisible(true);
    }, []);
    
  
    return (
      <section
        id="research-names"
        className={`flex flex-col justify-center items-center bg-[#002147] bg-opacity-50 p-6 md:p-10 shadow-lg 
          transition-transform duration-700 ease-in-out md:m-10 my-10
          ${isVisible ? 'transform scale-105 opacity-100' : 'transform scale-90 opacity-0'}
          `}
      >
        <div className="container p-4 md:p-10 bg-white rounded-lg shadow-md transition-transform duration-500 ease-in-out">
          {/* Introduction Text */}
          <p className="text-3xl font-bold text-[#002147] text-center">
           Chief Patron
        </p>

        <div className="flex flex-col items-center m-6">
          <Image
            src={topResearcher.imgSrc}
            alt={topResearcher.name}
            width={200}
            height={200}
            className="m-4 w-[150px] h-[150px] object-cover"
          />
          <p className="text-lg text-[#002147] font-bold">{topResearcher.name}</p>
          <p className="text-sm text-gray-600">{topResearcher.position}</p>
        </div>
        <p className="text-3xl font-bold text-[#002147] text-center">
           Patrons
        </p>
        <ul className="list-none flex flex-col md:flex-row justify-center items-center text-lg text-gray-800">
          {bottomResearchers.map((researcher, index) => (
            <li key={index} className="flex flex-col items-center p-2 m-2 rounded-md">
              <Image
                src={researcher.imgSrc}
                alt={researcher.name}
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-cover"
              />
              <p className="text-md text-center text-[#002147] font-bold">{researcher.name}</p>
              <p className="text-sm text-center text-gray-600">{researcher.position}</p>
            </li>
          ))}
        </ul>
        </div>
      </section>
    );
  };


const CoordinatorsSection = () => {
  // Convenors data and rendering
  const Convenors = [
    {
      name: 'Dr. D. Venkata Rao',
      title: 'Dean, Velagapudi Ramakrishna Siddhartha School of Engineering,\nSchool of Management, School of LAW, School of Sciences,\nSchool of Arts & Commerce',
      role: 'Professor & Head, ECE',
      imgSrc: '/images/venkata-rao.jpg',
    },
    {
      name: 'Dr. D. Rajeswara Rao',
      title: 'Dean, Industry Relations, Training & Placements',
      role: 'Professor & Head, CSE',
      imgSrc: '/images/rajeswara-rao.jpg',
    },
    {
      name: 'Dr. M. Suneetha',
      title: 'Dean, Research & Technology Development',
      role: 'Professor & Head, IT',
      imgSrc: '/images/HODIT.jpg',
    },
    {
      name: 'Dr. A. Sree Ram',
      title: '',
      role: 'Professor & Head, MBA',
      imgSrc: '',
    },
  ];

  const Coordinators = [
    { name: 'Dr. G. Surya Narayana', position: 'Associate Professor (ECE)' },
    { name: 'Dr. K. Raghuveer', position: 'Associate Professor (MBA)' },
    { name: 'Dr. V. Radhesyam', position: 'Associate Professor (IT)' },
    { name: 'Dr. Ashutosh Satapathy', position: 'Asst. Professor (Selection Grade) (CSE)' },
    ];

    
  const bottomCoordinators = Coordinators.slice(0);
  return (
    <div className="flex flex-col justify-center mt-16 items-center p-6 border border-gray-300 rounded-lg shadow-md bg-white ">
      {/* Convenors Section */}
      <div className="w-full mb-6">
        <h2 className="text-[#002147] font-bold text-xl text-center mb-4">Convenors</h2>
        <ul className="list-none flex flex-col md:flex-row justify-center items-start text-lg text-gray-800 flex-wrap gap-6">
          {Convenors.map((conv, idx) => (
            <li key={idx} className="flex flex-col items-center p-3 rounded-md w-52 min-h-[300px]">
              {conv.imgSrc ? (
                <Image
                  src={conv.imgSrc}
                  alt={conv.name}
                  width={150}
                  height={160}
                  className="w-[150px] h-[160px] object-cover rounded mb-2"
                />
              ) : (
                <div className="w-[150px] h-[160px] bg-gray-100 flex items-center justify-center text-4xl font-bold text-[#002147] mb-2 rounded shadow-inner">
                  {conv.name.split(' ').pop().charAt(0)}
                </div>
              )}
              <p className="text-base text-center text-[#002147] font-bold leading-tight">{conv.name}</p>
              {conv.title && (
                <p className="text-sm text-center text-gray-700 whitespace-pre-line leading-snug">
                  {conv.title}
                </p>
              )}
              <p className="text-sm text-center text-gray-600 leading-snug">{conv.role}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Coordinators Section moved below Convenors */}
      <div className="w-full">
        <h2 className="text-[#002147] font-bold text-lg text-center">Coordinators</h2>
        <ul className="list-none flex flex-col md:flex-row justify-center items-center text-lg text-gray-800 flex-wrap mt-2">
          {bottomCoordinators.map((coordinator, index) => (
            <li key={index} className="flex flex-col items-center p-2 m-2 rounded-md">
              <div className="w-[150px] h-[160px] bg-gray-100 flex items-center justify-center text-4xl font-bold text-[#002147] mb-2 rounded shadow-inner">
                {coordinator.name.split(' ').pop().charAt(0)}
              </div>
              <p className="text-base text-center text-[#002147] font-bold">{coordinator.name}</p>
              <p className="text-sm text-center text-gray-600">{coordinator.position}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Queries Section */}
      <div className="w-full text-center border-t border-gray-300 pt-4 mt-4">
        <p className="text-[#002147] font-bold text-md">Any Queries (Registrations):</p>
        <p className="text-black font-bold text-md">Dr. C. Subba Reddy (IT) - 9985082007, Dr. M. Vani Pujitha (CSE) - 8074809058</p>
      </div>
    </div>
  );
};

  
  
  return (
    <>
    {/* <div className="relative w-screen overflow-hidden">
    <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] bg-url[('/images.hackathon_back.jpeg')]"
      >
        <source src="/images/hackathon_background.mp4" type="video/mp4" />
      </video>
      </div> */}
      
      <div className="mt-48 md:mt-64 w-screen"></div>
      <ClickableCircles />
      {/* <ImageCarousel /> */}
      <div className="w-full text-center mt-8">
        <h2 className="text-3xl font-bold text-[#002147]">Glimpses of innovation</h2>
      </div>
      <HorizontalImageScroller images={researchimages}/>
      <About/>
      <InfoSection/>
      <ResearchNames/> 
      <CoordinatorsSection/>
      
      {/* <div className="mt-20 bg-[#4F709C]/25 bg-opacity-20 p-4 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 mb-4">
        <h1 className="text-4xl  font-bold text-center text-black">Placements</h1>
      <HorizontalImageScroller images={aluminiimages}/>
      </div> */}
    </>
  );
}
