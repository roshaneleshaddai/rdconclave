'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from "react";


  const SpeakersNames = () => {
    const [isVisible, setIsVisible] = useState(false);
    const Patrons = [
      { ind:7, name: 'Padmaja Sriram', src: '/images/attr1.jpg', position: 'Regional Leader Talent Acquisition - APAC', company:'AT&T' },
      { ind:3, name: 'Sarada Prasanna Satapathy', src: '/images/pegar1.jpg', position: 'Director, Technical Enablement & Global University Program', company:'Pega' },
      { ind:1, name: 'MSR Murthy', src: '/images/tcsr1.jpg', position: 'Senior Consultant', company:'TCS' },
      { ind:4, name: 'Jitender Singh', src: '/images/ctsr1.jpg', position: 'HR Manager-Campus Recruitment', company:'CTS' },
      { ind:4, name: 'Raghavendra Kulkarni', src: '/images/ctsr2.jpg', position: 'Global Engagement Delivery' , company:'CTS'},
      { ind:5, name: 'Chaitanya Vetcham', src: '/images/verizonr1.jpg', position: 'HR Professional, Campus Relations', company:'Verizon' },
      { ind:6, name: 'M. Srinivas Reddy', src: '/images/techmr1.jpg', position: 'IT Delivery Manager' , company:'Tech Mahindra'},
      { ind:8, name: '', src: '/images/r1.jpg', position: '', company:'HCL' },
      { ind:11, name: 'Mr.K. Abhinav ', src: '/images/pidatacr1.jpg', position: 'Director & Chief Data Center Delivery Officer', company:'Pi DATACENTERS' },
      { ind:12, name: 'Mr. A. Satyanarayana', src: '/images/r1.jpg', position: 'Manager', company:'Avantel' },
      { ind:13, name: 'Mr M Veeran', src: '/images/powerlabr1.jpg', position: 'Head Sales & Marketing', company:'Power Labs- Chennai' },
      { ind:14, name: 'Smt. V. Prathyusha', src: '/images/transdencer1.jpg', position: 'Lead Consultant', company:'Transdence' },
      { ind:15, name: 'Dr Krishna Kanth G Avulur', src: '/images/amsr1.jpg', position: 'Sr Manager', company:'AMS Semi-Conductors India Pvt Ltd' },
      { ind:16, name: 'S. Suresh Babu', src: '/images/rapsr1.jpg', position: 'Group head, Composites', company:"Ramesh's Aerospace Products & Services (RAPS) Pvt. Ltd" },
      { ind:17, name: 'D. Harsha Vardhin', src: '/images/jesvidr1.jpg', position: 'Project Engineer Mechanical', company:'Jesvid Cryo Technologies Private Limited' },
      { ind:18, name: 'T.Kamal Kumar', src: '/images/bhelr1.jpg', position: 'DGM', company:'BHEL' },
    ];

  const bottomResearchers = Patrons.slice(0);
  
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
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
  
    return (
      <section 
        id="research-names"
        className="flex flex-col justify-center items-center bg-opacity-50 md:px-10 md:py-1 my-10 overflow-hidden"
      >

        <div className="px-10">
          {/* Display initial cards */}
          <ul className="list-none flex flex-wrap justify-center items-center gap-2 max-w-full overflow-hidden">
            {bottomResearchers.slice(0, 4).map((researcher, index) => (
              <motion.li
                key={`initial-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 80,
                  scale: { duration: 0.2 }, // Short hover duration
                  boxShadow: { duration: 0.2 }, // Matches hover speed for boxShadow
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
                }}
                className="flex flex-col justify-center items-center p-4 m-2 border-2 border-[#213555] border-opacity-20 rounded-lg shadow-md w-[250px] h-[300px] bg-white"
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <Image
                    src={researcher.src}
                    alt={researcher.name}
                    width={150}
                    height={150}
                    className="object-cover object-center mb-4 rounded-lg w-40 h-40"
                  />
                  <p className="text-md text-center text-[#604CC3] font-bold">{researcher.name}</p>
                  <p className="text-sm text-center text-black">{researcher.position}</p>
                  <p className="text-sm text-center text-black">{researcher.company}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Display remaining cards on scroll */}
          <ul className="list-none flex flex-wrap justify-center items-center gap-4">
            {bottomResearchers.slice(4).map((researcher, index) => (
              <motion.li
                key={`rest-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 80,
                  scale: { duration: 0.2 }, // Short hover duration
                  boxShadow: { duration: 0.2 }, // Matches hover speed for boxShadow
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
                }}
                className="flex flex-col justify-center items-center p-4 m-2 border-2 border-[#213555] border-opacity-20 rounded-lg shadow-md w-[250px] h-[300px] bg-white"
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <Image
                    src={researcher.src}
                    alt={researcher.name}
                    width={150}
                    height={150}
                    className="object-cover object-center mb-4 rounded-lg w-40 h-40"
                  />
                  <p className="text-md text-center text-[#604CC3] font-bold">{researcher.name}</p>
                  <p className="text-sm text-center text-black">{researcher.position}</p>
                  <p className="text-sm text-center text-black">{researcher.company}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
        );
  };

const Speakers = () => {
  
  return (
    <div className="relative font-SUSE min-h-screen max-w-screen mt-44 md:mt-56">

      <div className="pb-5">
        
      <div
          className="bg-[#604CC3]/25 bg-opacity-20 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-4xl  font-bold text-center text-[#604CC3]">Speakers</h1>
          
        </div>

        <SpeakersNames/> 
      </div>
    </div>
  );
};

export default Speakers;
