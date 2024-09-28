'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./globals.css";

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
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={850} // You can adjust this as needed
                  height={250} // Set a fixed height to maintain aspect ratio
                  objectFit="cover" // Ensures the image covers the entire area
                />
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
      window.location.href = url;
    };
  
    return (
<div className="" >
        <div
          className="mt-1 bg-[#604CC3]/25 bg-opacity-20 p-8 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-5xl  font-bold text-center text-[#604CC3]">Research Conclave</h1>
          
        </div>

      
      {/* <div className="flex  justify-center items-center space-x-8 w-full h-[200px]">
      
       
        <div
          onClick={() => handleRedirect("/meet")}
          className="w-40 h-40 bg-[#436FA6] rounded-full flex items-center justify-center text-border-2 text-white border-[#213555] border-2 text-xl font-bold cursor-pointer hover:bg-red-400 transition duration-300 ease-in-out"
        >
          <center>
          Industry<br></br>
          Academia<br></br>
          Meet</center>
        </div>
  
        <div
          onClick={() => handleRedirect("/hackathon")}
          className="w-40 h-40 bg-[#5D88BB] rounded-full flex items-center justify-center text-white border-[#213555] border-2 text-xl font-bold cursor-pointer hover:bg-emerald-500 transition duration-300 ease-in-out"
        >
          Hackathon
        </div>
  
        <div
          onClick={() => handleRedirect("/journalpublications")}
          className="w-40 h-40 bg-[#436FA6] rounded-full flex items-center justify-center text-white border-[#213555] border-2 text-xl font-bold cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          <center>
          journal<br></br>
          Publications</center>
        </div>
      </div> */}

<div className="flex flex-col md:flex-row justify-around min-h-full p-4 ">
  {/* Industry Academia Meet Block */}
  <div
    onClick={() => handleRedirect("/meet")}
    className="mt-5 bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FEF9D9]/25 flex flex-col items-center justify-center min-h-[25rem] md:min-w-[22rem] max-w-[25rem]"
  >
    {/* Title Section */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3]">
        Industry<br/>Academia<br/>Meet
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="p-1/2 text-center">Date: 31-12-2024</p>
      <p className="p-1/2 text-center">Time: 09:00 AM</p>
      <button className="p-2 m-2 bg-white text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
        Know more..
      </button>
    </div>  
  </div>

  {/* Hackathon Block */}
  <div
    onClick={() => handleRedirect("/hackathon")}
    className="mt-5 bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FEF9D9]/25 flex flex-col items-center justify-center min-h-[25rem] md:min-w-[22rem] max-w-[25rem]"
  >
    {/* Title Section */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3]">
        Student Hackathon
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="p-1/2 text-center">Registration Deadline: November 2, 2024</p>
      <p className="p-1/2 text-center">Final Round Notification: December 2, 2024</p>
      <p className="p-1/2 text-center">Final Round: January 24, 2024, 12 PM - January 25, 2024, 12 PM</p>
      <button className="p-2 m-2 bg-white text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
        Know more..
      </button>
    </div>
  </div>

  {/* journal Publications Block */}
  <div
    onClick={() => handleRedirect("/journalpublications")}
    className="mt-5 bg-[#604CC3]/25 bg-opacity-100 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#FEF9D9]/25 flex flex-col items-center justify-center min-h-[25rem]  md:min-w-[22rem] max-w-[25rem]"
  >
    {/* Title Section */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3]">
        Journal<br/>Publications
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold ">
      <p className="p-1/2 text-center">Submission Deadline: December 20, 2024</p>
      <p className="p-1/2 text-center">Acceptance Notification: January 5, 2025</p>
      <p className="p-1/2 text-center">Event Registration Deadline: October 10, 2025</p>
      <button className="p-2 m-2 bg-white text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
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
      "The event comprises three key components: an Industry-Academic Meet, a Student Hackathon, and Faculty Publications."
      ];
    
  
    const [visibleLines, setVisibleLines] = useState([]);
  
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      
      if (!aboutSection) {
        return; // Exit the function if the element doesn't exist
      }
    
  const headerHeight = document.querySelector('header').offsetHeight; // Adjust the selector as needed
  const sectionPosition = aboutSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  // Check if section is below the header in the viewport
  if (sectionPosition < screenPosition - headerHeight) {
    // Reveal lines one by one
    aboutText.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prevLines) => [...new Set([...prevLines, index])]);
      }, index * 300); // Delay of 300ms for each line
    });
  }
};
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <section id="about" className="p-10 flex  justify-center items-center bg-[#604CC3]/25 bg-opacity-50 mt-5">
        
        <div className="md:px-12">
        <div className="text-3xl font-bold text-[#604CC3] underline-offset-8">
          About Research Conclave
          <hr className="h-1 my-4 bg-[#604CC3] border-0  w-1/3" />

        </div>
        <div className=" font-medium sm:text-xl">
          {aboutText.map((line, index) => (
            <p
              key={index}
              className={`text-lg text-justify p-2 transition-opacity duration-300 ${
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
      <div className="">
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
      </div>
    );
  }


  const InfoSection = () => {
    const [videoVisible, setVideoVisible] = useState(false);
    const [visibleObjectives, setVisibleObjectives] = useState([]);
  
    const objectives = [
      "To promote and accelerate quality research within the institute and in collaboration with industry, other institutes, and R&D organizations",
      "To promote innovation and consultancy activities through development of Research Centers and Centers of Excellence",
      "To integrate Teaching and Research",
      "To ensure integrity, quality, and ethics in research",
      "To promote generation of intellectual capital"
    ];
  
    const handleScroll = () => {
      const videoElement = document.getElementById("info-video");
  
      // Ensure the element exists before accessing its properties
      if (!videoElement) return;
  
      const sectionPosition = videoElement.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.5;
  
      if (sectionPosition < screenPosition) {
        setVideoVisible(true);
  
        objectives.forEach((_, index) => {
          setTimeout(() => {
            setVisibleObjectives((prevObjectives) => [
              ...new Set([...prevObjectives, index]),
            ]);
          }, index * 300);
        });
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <section id="research" className="p-5 flex flex-col justify-center items-center md:mx-10">
        <div className="container flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:basis-1/2  p-4">
            <h2 className="text-3xl font-bold text-[#604CC3]">
              Research@VRSEC
              <hr className="h-1 my-8 bg-[#604CC3] border-0 w-1/2 " />
            </h2>
            <p className="mb-4 font-medium sm:text-xl text-lg">
              The main objectives of the research policy are as follows:
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
          <div className="w-full md:basis-1/2 p-4">
            <iframe
              id="info-video"
              width="100%" 
              height="405" 
              src="https://youtube.com/embed/-uFY1md-knE" 
              title="YouTube video player"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className={`transition-transform duration-1000 transform ${
                videoVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            ></iframe>
          </div>
        </div>
      </section>
    );
  };
  
  
  const ResearchNames = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    // Array of researchers' names and image paths
    const researchers = [
      { name: 'Bob', imgSrc: '/images/people1.jpeg',position: 'Phd' },
      { name: 'David', imgSrc: '/images/people2.jpeg' ,position: 'Associate Professor' },
      { name: 'Alice', imgSrc: '/images/people3.jpeg' ,position: 'Senior Professor'},
      { name: 'John', imgSrc: '/images/people4.jpeg' ,position: 'Phd'},
    ];
  
    useEffect(() => {
      const handleScroll = () => {
        // Get the element after the function starts
        const section = document.getElementById('research-names');
    
        // If the section element does not exist, exit early
        if (!section) return;
    
        // Calculate the section's position relative to the viewport
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
    
        // Check if the section is in the viewport
        if (sectionTop < windowHeight - 100) {
          setIsVisible(true); // Apply transformation when scrolled into view
        } else {
          setIsVisible(false); // Remove transformation when out of view
        }
      };
    
      // Add the scroll event listener
      window.addEventListener('scroll', handleScroll);
    
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
  
    return (
      <section
        id="research-names"
        className={`flex flex-col justify-center items-center bg-[#604CC3] bg-opacity-50 p-10 shadow-lg 
          transition-transform duration-700 ease-in-out m-10
          ${isVisible ? 'transform scale-105 opacity-100' : 'transform scale-90 opacity-0'}
          `}
      >
        <div className="container p-10 bg-white rounded-lg shadow-md transition-transform duration-500 ease-in-out">
          {/* Introduction Text */}
          <p className="mb-6 text-xl font-bold text-[#604CC3] text-center tracking-wide">
            Welcome to our organization. Below is a list of key individuals involved in this initiative:
          </p>
  
          {/* Bullet Points with Images and Names */}
          <ul className="list-none flex flex-col md:flex-row justify-center items-centers  text-lg text-gray-800 ">
            {researchers.map((researcher, index) => (
              <li
                key={index}
                className="flex flex-col items-center   hover:text-blue-600 transition-colors duration-300 ease-in-out"
              >
                
                <div className="flex flex-col items-center  hover:bg-[#FEF9D9] rounded-md p-2 ">
                <Image
                  src={researcher.imgSrc}
                  alt={researcher.name}
                  width={200}
                  height={200}
                  className="m-4 rounded-full"
                />
                  <p className="text-lg font-bold">{researcher.name}</p>
                  <p className="text-sm text-gray-600">{researcher.position}</p>

                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </section>
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
      
      <div className="mt-52"></div>
      <ClickableCircles />
      {/* <ImageCarousel /> */}
      <HorizontalImageScroller images={researchimages}/>
      <About/>
      <InfoSection/>
      <ResearchNames/>
      <div className="mt-20 bg-[#4F709C]/25 bg-opacity-20 p-4 rounded-lg mx-6 transition-opacity duration-1000 mb-4">
        <h1 className="text-4xl  font-bold text-center text-black">Placements</h1>
      <HorizontalImageScroller images={aluminiimages}/>
      </div>
    </>
  );
}