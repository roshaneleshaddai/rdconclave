'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from "react";

const GuestsList = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Chief Guest
  const chiefGuest = {
    name: 'Dr. Y.V.N Krishna Murthy',
    position: 'Adjunct Professor, IIT Tirupati',
    description: 'Former Scientific Secretary and Director (NRSC & IIRS), Indian Space Research Organization',
    src: '/images/krishna-murthy.jpeg', // Add the image file to public/images
    linkedin: 'https://www.linkedin.com/in/dr-yvn-krishnamurthy-4713b7317/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  };

  // Distinguished Guests
  const distinguishedGuests = [
    {
      name: 'Prof. D. V. L. N. Somayajulu',
      position: 'Director',
      company: 'National Institute of Technology, Manipur',
      src: '/images/DVLN_Somayajulu.jpg',
      linkedin: 'https://www.linkedin.com/in/d-somayajulu-8530038b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Mr. Rama Krishna Dasari',
      position: 'CEO and Founder',
      company: 'Efftronics Systems Pvt. Ltd., Mangalagiri',
      src: '/images/efftronics-ceo.png',
      linkedin: 'https://www.linkedin.com/in/rama-krishna-dasari-923b2787/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Mrs. Padmaja Sriram',
      position: 'Head - TA - APAC',
      company: 'AT&T, Hyderabad',
      src: '/images/padmaja-sriram.jpeg',
      linkedin: 'https://www.linkedin.com/in/pams67/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Dr. Rajiv Kumar',
      position: 'Scientist "G" and Group Head, Soil Resources and Land Use Monitoring Group',
      company: 'NRSC, ISRO, Hyderabad',
      src: '/images/rajiv.jpeg',
      linkedin: 'https://www.linkedin.com/in/rajiv-kumar-5138239b/',
    },
    {
      name: 'Shri MV Rajashekhar',
      position: 'Sr. Vice President',
      company: 'Paras Defence & Space Technologies, Mumbai',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Dr. R. Prabhakaran',
      position: 'Associate Vice President, L&D',
      company: 'RANE Industries, Chennai',
      src: '/images/prabhakaran.png',
    },
    {
      name: 'Venkat Gajjala',
      position: 'Sr. Vice President, Global Head - Engineering Services Group',
      company: 'Tech Mahindra, Bangalore',
      src: '/images/venkat.png',
    },{
      name: 'Mr. K.V.N.D.S Srinivas',
      position: 'Senior Vice President & Delivery Head for HLS Healthcare, APAC & Europe',
      company: 'Persistence Systems',
      src: '/images/kvnds-srinivas.png',
      linkedin: 'https://www.linkedin.com/in/srinivas-kvnds/',
    },
  ];

  // Invited Speakers
  const invitedSpeakers = [
    {
      name: 'Dr. Mamilla Ravi Sankar',
      position: 'Professor & HOD',
      company: 'Department of Mechanical Engineering, IIT Tirupati',
      src: '/images/mamilla.png',
      linkedin: 'https://www.linkedin.com/in/mamilla-ravi-sankar-4b26ab9/',
    },
    {
      name: 'Dr. Roshan Srivastav',
      position: 'Project Director',
      company: 'IIT Tirupati Navavishkar I-Hub Foundation',
      src: '/images/roshan.jpeg',
      linkedin: 'https://www.linkedin.com/in/rksrivastav/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      name: 'Smt Sruthi Dasari',
      position: 'Executive Manager - HR ',
      company: 'Efftronics Systems Pvt Ltd., Vijayawada',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Dr. Rama Krishna Vankamamidi',
      position: 'Solution Director ',
      company: 'HCL, Vijaywada',
      src: '/images/ramakrishna-hcl.png',
    },

    {
      name: 'Mr. Srinivas Reddy',
      position: 'Head-HR',
      company: 'TechMahindra, Vijayawada',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Mr. Sreenivasa Vivekanand Peesapati',
      position: 'Head, BFSI CBO Transition Practice',
      company: 'TCS, Hyderabad',
      src: '/images/vivekananda.png',
    },
    {
      name: 'Mr. Prathap Kolla',
      position: 'Senior Product Manager',
      company: 'TCS, Hyderabad',
      src: '/images/pratap-kolla.png',
    },
    {
      name: 'Mr. Jai Prakash Netha',
      position: 'Director - Talent Initiatives',
      company: 'SMART BRIDGE, Hyderabad',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Mr. Srinagaveer Vundavalli',
      position: 'CCC Group Founder & CEO',
      company: 'CCC, Hyderabad',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Dr. Vipul Valamjee',
      position: 'Data Scientist',
      company: 'Strategic Advisor-AI Talent&Employability - work with AP Govt,Calibo Technologies, Hyderabad',
      src: '/images/vipul.png',
    },
    {
      name: 'Mr. Vamsi Krishna Reddy Chinta',
      position: 'Regional Head - Academic & Govt',
      company: 'LinkedIn, Hyderabad',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Komali Jakkula',
      position: 'Manager - TA',
      company: 'Moschip, Hyderabad',
      src: '/images/komali.png',
    },
    {
      name: 'Ms. Ravali Gopavarapu',
      position: 'Senior Project Manager',
      company: 'Microsoft, Hyderabad',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Mr. Rajasekharam Naidu P',
      position: 'Co-Founder, Director Embedded Software & AI',
      company: 'BITSILICA - Semiconductor Design Services, Hyderabad',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Mr. Prasad .M',
      position: 'Representative',
      company: 'Moschip',
      src: '/images/dummy.jpeg',
    },
    {
      name: 'Dr. PREM KONDAVEETI',
      position: 'Project Manager',
      company: 'Jesvid Cryo Technologies Pvt.Ltd., Hyderabad',
      src: '/images/prem_sir.jpeg',
      linkedin: 'https://www.linkedin.com/in/drpremkondaveeti-77228a4a/',
    },
     {
      name: 'Dr. B. Pradeepa Kumari',
      position: 'Deputy Executive Engineer',
      company: 'Water Resources Department, Government of Andhra Pradesh',
      src: '/images/dummy.jpeg',
    },
     {
      name: 'Dr. Vinod Babu Bollikonda',
      position: 'CEO',
      company: 'Blue Cloud Softech Solutions Ltd., Hyderabad',
      src: '/images/dummy.jpeg',
    }
  ];
  
    useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('research-names');
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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
      className="flex flex-col justify-center items-center w-full py-10 px-4 sm:px-10 pt-32 sm:pt-40"
    >
      <div className="w-full max-w-6xl">
        
        {/* Chief Guest Section */}
        <div className="mb-16 scroll-mt-40">
          <h2 className="text-4xl font-bold text-center text-[#002147] mb-10 mt-20">Chief Guest</h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0, 33, 71, 0.3)",
            }}
            className="flex flex-col justify-center items-center p-6 border-2 border-[#002147] border-opacity-30 rounded-lg shadow-lg w-full sm:max-w-md mx-auto bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="relative w-48 h-48 mb-6 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={chiefGuest.src}
                  alt={chiefGuest.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/192?text=Guest+Image';
                  }}
                />
              </div>
              {chiefGuest.linkedin ? (
                <a
                  href={chiefGuest.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-center text-[#002147] font-bold mb-2 hover:underline"
                >
                  {chiefGuest.name}
                </a>
              ) : (
                <p className="text-2xl text-center text-[#002147] font-bold mb-2">{chiefGuest.name}</p>
              )}
              <p className="text-md text-center text-[#002147] font-semibold mb-2">{chiefGuest.position}</p>
              <p className="text-sm text-center text-gray-600">{chiefGuest.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Distinguished Guests Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-[#002147] mb-10">Distinguished Guests</h2>
          <ul className="list-none flex flex-wrap justify-center items-stretch gap-6">
            {distinguishedGuests.map((guest, index) => (
              <motion.li
                key={`distinguished-guest-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 80,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0, 33, 71, 0.3)",
                }}
                className="flex flex-col justify-start items-center p-5 border-2 border-[#002147] border-opacity-20 rounded-lg shadow-md w-full sm:w-80 bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col justify-start items-center h-full w-full">
                  <div className="relative w-40 h-40 mb-4 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={guest.src}
                      alt={guest.name}
                      fill
                      className="object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/160?text=Guest+Image';
                      }}
                    />
                  </div>
                  {guest.linkedin ? (
                    <a
                      href={guest.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-center text-[#002147] font-bold mb-1 hover:underline"
                    >
                      {guest.name}
                    </a>
                  ) : (
                    <p className="text-lg text-center text-[#002147] font-bold mb-1">{guest.name}</p>
                  )}
                  <p className="text-sm text-center text-[#002147] font-semibold mb-2">{guest.position}</p>
                  <p className="text-xs text-center text-gray-600">{guest.company}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Invited Speakers Section */}
        <div>
          <h2 className="text-4xl font-bold text-center text-[#002147] mb-10 mt-16">Invited Speakers</h2>
          <ul className="list-none flex flex-wrap justify-center items-stretch gap-6">
            {invitedSpeakers.map((guest, index) => (
              <motion.li
                key={`invited-speaker-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 80,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0, 33, 71, 0.3)",
                }}
                className="flex flex-col justify-start items-center p-5 border-2 border-[#002147] border-opacity-20 rounded-lg shadow-md w-full sm:w-80 bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col justify-start items-center h-full w-full">
                  <div className="relative w-40 h-40 mb-4 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={guest.src}
                      alt={guest.name}
                      fill
                      className="object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/160?text=Guest+Image';
                      }}
                    />
                  </div>
                  {guest.linkedin ? (
                    <a
                      href={guest.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-center text-[#002147] font-bold mb-1 hover:underline"
                    >
                      {guest.name}
                    </a>
                  ) : (
                    <p className="text-lg text-center text-[#002147] font-bold mb-1">{guest.name}</p>
                  )}
                  <p className="text-sm text-center text-[#002147] font-semibold mb-2">{guest.position}</p>
                  <p className="text-xs text-center text-gray-600">{guest.company}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
const Guests = () => {
  return (
    <div className="relative font-SUSE w-full">
      <div className="w-full py-5">
        <GuestsList />
      </div>
    </div>
  );
};

export default Guests;
