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
  };

  // Distinguished Guests
  const distinguishedGuests = [
    {
      name: 'Prof. D. V. L. N. Somayajulu',
      position: 'Director',
      company: 'National Institute of Technology, Manipur',
      src: '/images/DVLN_Somayajulu.jpg',
    },
    {
      name: 'Mr. Rama Krishna Dasari',
      position: 'CEO and Founder',
      company: 'Efftronics Systems Pvt. Ltd.',
      src: '/images/efftronics-ceo.png',
    },
    {
      name: 'Mrs. Padmaja Sriram',
      position: 'Head Regional Leader Talent Acquisition (APAC)',
      company: 'AT&T, Hyderabad',
      src: '/images/padmaja-sriram.jpeg',
    },
    {
      name: 'Dr. Roshan Srivastav',
      position: 'Project Director',
      company: 'IIT Tirupati Navavishkar I-Hub Foundation',
      src: '/images/roshan-srivastav.jpeg',
    },
    {
      name: 'Mr. Siddhartha Abburi',
      position: 'Director',
      company: 'Avantel Limited, Hyderabad',
      src: 'https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM',
    },
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
              <p className="text-2xl text-center text-[#002147] font-bold mb-2">{chiefGuest.name}</p>
              <p className="text-md text-center text-[#002147] font-semibold mb-2">{chiefGuest.position}</p>
              <p className="text-sm text-center text-gray-600">{chiefGuest.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Distinguished Guests Section */}
        <div>
          <h2 className="text-4xl font-bold text-center text-[#002147] mb-10">Distinguished Guests</h2>
          <ul className="list-none flex flex-wrap justify-center items-stretch gap-6">
            {distinguishedGuests.map((guest, index) => (
              <motion.li
                key={`guest-${index}`}
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
                  <p className="text-lg text-center text-[#002147] font-bold mb-1">{guest.name}</p>
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
