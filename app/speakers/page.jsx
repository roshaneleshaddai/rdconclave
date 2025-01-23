'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from "react";


  const SpeakersNames = () => {
    const [isVisible, setIsVisible] = useState(false);
    const Patrons = [
      // { ind:7, name: 'Mrs. Padmaja Sriram', src: '/images/attr1.jpg', position: 'Regional Leader Talent Acquisition - APAC', company:'AT&T, Hyderabad' },
      { ind:3, name: 'Mr. Sarada Prasanna Satapathy', src: '/images/pegar1.jpg', position: 'Director Global University Academic Programs', company:'Pegasystems' },
      { ind:1, name: 'Mr. M S R Murthy', src: '/images/tcsr1.jpg', position: 'Senior Consultant', company:'Tata Consultancy Services, Hyderabad' },
      { ind:4, name: 'Mr. Jitender Singh', src: '/images/ctsr1.jpg', position: 'HR Manager Campus Recruitment', company:'Cognizant Technology Solutions' },
      { ind:4, name: 'Mr. Raghavendra Kulkarni', src: '/images/ctsr2.jpg', position: 'Project Manager' , company:'Cognizant Technology Solutions'},
      { ind:5, name: 'Mr. Chaitanya Vetcham', src: '/images/verizonr1.jpg', position: 'HR Professional, HR Generalist, Campus Relations Onboarding Speclist', company:'Verizon' },
      { ind:6, name: 'Mr. M. Srinivas Reddy', src: '/images/techmr1.jpg', position: 'Central Sourcing & Recruitment Manager' , company:'Tech Mahindra'},
      { ind:8, name: 'Mr. Suresh Babu B', src: 'https://media.licdn.com/dms/image/v2/C4D03AQG5RNA9gS4D7Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1640257477049?e=1743033600&v=beta&t=lhDcXwxqHd7jfjU6g226g0F-v194CbHRjVfBrGGxsdk', position: 'Deputy General Manager', company:'HCL Technologies, Vijayawada' },
      { ind:11, name: 'Mr. K. Abhinav ', src: '/images/pidatacr1.jpg', position: 'Director & Chief Data Center Delivery Officer', company:'Pi DataCenters, Vijayawada' },
      // { ind:12, name: 'Mr. A. Satyanarayana', src: '/images/r1.jpg', position: 'Manager', company:'Avantel' },
      { ind:13, name: 'Mr. M. Veeran', src: '/images/powerlabr1.jpg', position: 'Head Sales & Marketing', company:'Power Lab Instruments Chennai' },
      { ind:14, name: 'Smt. V. Prathyusha', src: '/images/transdencer1.jpg', position: 'Lead Consultant', company:'Transcendence' },
      { ind:15, name: 'Dr Krishna Kanth G Avulur', src: '/images/amsr1.jpg', position: '', company:'Director R&D @ams OSRAM & Founder @ MOSart Labs' },
      // { ind:16, name: 'Mr. S. Suresh Babu', src: 'https://media.licdn.com/dms/image/v2/D5603AQEAwDIP8sEbJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695015686962?e=1743033600&v=beta&t=OStz4q4hGm2cenN1zJB4r0MDI8UlPuLtX8m3pzIbmP0', position: 'Senior General Manager Finance', company:"Ramesh's Aerospace Products & Services (RAPS) Pvt. Ltd" },
      { ind:17, name: 'Mr. D. Harsha Vardhin', src: '/images/jesvidr1.jpg', position: 'Project Engineer Mechanical', company:'Jesvid Cryo Technologies Private Limited, Vijayawada' },
      { ind:18, name: 'Mr. T.Kamal Kumar', src: '/images/bhelr1.jpg', position: 'Deputy General Manager', company:'Bharat Heavy Electricals Limited' },
      // {ind:19, name: "Mr. Dasari Anvesh",src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSll-TKqI55i7SHUuUH0xabUol3dB_a7Z9c7w&s",position: "Vice President",company: "Efftronics"},
      {ind:20, name: "Mr. Abburi Siddharth",position: "Director at Avantel Limited & imeds Private Limited & Co-Founder of Simply Science",company: "Avantel",src: "https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM",},
      {
        ind:21,
        name: "Srinivas KVNDS",
        position: "Vice President & Delivery Head for Healthcare practice",
      company: "Persistent Systems, Chennai",
        src: "/images/persisr1.jpg",
      },
      {
        name: "Mr. Rajesh Damerla",
        position: "CEO",
      company: "DLK MegaMart Pvt Ltd & Avinya Spark International Pvt Ltd.",
        src: "https://media.licdn.com/dms/image/v2/C4E03AQHfAUYDFePjMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1598515829195?e=2147483647&v=beta&t=vZWFACgYTekTSC6gktvjaHnnYFX_x60cCwYMA5le21I",
      },
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
          <ul className="list-none flex flex-wrap max-w-6xl justify-center items-center gap-4 max-w-full overflow-hidden">
            {bottomResearchers.slice(0, 4).map((researcher, index) => (
              <motion.li
                key={`initial-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 80,
                  scale: { duration: 0.1 }, // Short hover duration
                  boxShadow: { duration: 0.1 }, // Matches hover speed for boxShadow
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
                }}
                className="flex flex-col justify-center items-center p-4 m-2 mb-4 border-2 border-[#213555] border-opacity-20 rounded-lg shadow-md w-[300px] h-[350px] bg-white"
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
          <ul className="mt-4 list-none flex max-w-8xl flex-wrap justify-center items-center gap-4">
            {bottomResearchers.slice(4).map((researcher, index) => (
              <motion.li
                key={`rest-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 80,
                  scale: { duration: 0.1 }, // Short hover duration
                  boxShadow: { duration: 0.1 }, // Matches hover speed for boxShadow
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
                }}
                className="flex flex-col justify-center items-center p-4 m-2 border-2 border-[#213555] border-opacity-20 rounded-lg shadow-md w-[300px] h-[350px] bg-white"
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
    <div className="relative font-SUSE min-h-screen max-w-screen mt-48 md:mt-64">

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
