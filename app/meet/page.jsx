'use client';
import React from 'react';
import Link from 'next/link'; // Correct import for Link
import { motion } from 'framer-motion';
import Image from 'next/image';

const Meet = () => {
  // Array of expected outcomes
  const logos = [
    '/images/industry4.png',
     'https://upload.wikimedia.org/wikipedia/commons/6/64/TCS_logo-black.png',
     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS83mygX-6NG7lLPr0N-fzQq4VLzh52wN15yg&s',
    'https://i.pinimg.com/564x/34/a2/b1/34a2b1d02fd71b5a742eb5e34301f70f.jpg',
    'https://media.licdn.com/dms/image/v2/D560BAQH6NnQXsFufHA/company-logo_200_200/company-logo_200_200/0/1665503554245/ctscorporation_logo?e=2147483647&v=beta&t=fAuC1tCHFMqg7l7ahBTPlds9esj_il1mJyRueOVZR64',
    'https://assets.channelinsider.com/uploads/2022/04/CI.TechMahindra.Profile-1024x1024.png',
    'https://mma.prnewswire.com/media/1022385/Persistent_Systems_Logo.jpg?p=facebook',
    '/images/industry6.png',
    'https://media.licdn.com/dms/image/v2/D560BAQE3oCRjD0FdGg/company-logo_200_200/company-logo_200_200/0/1689239185676?e=2147483647&v=beta&t=o8Ai2uvG6V3Fe-vsirXqxgBMUmsE-XdZGB1-3dlaHUo',
    '/images/industry9.jpeg',
    '/images/industry10.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiv_cTlgi7PfmQQzhwSbBbQ-CxV9zGncmreQ&s',
    'https://www.powerlabinstruments.com/myweb/uploads/2024/05/logo-new.png',
    'https://static.brandfinance.com/wp-content/uploads/2016/01/HCL-Logo.png',
    'https://media.licdn.com/dms/image/v2/C4D0BAQGYXH79jG8PKA/company-logo_200_200/company-logo_200_200/0/1630550419008/ams_osram_logo?e=1745452800&v=beta&t=mOjEdTUTN_3mTBVc1-N-sfZcDImqYds9taLDDmOtgys',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8xGevRk2pKZTsFC-VXEJUamM3TrhC9sryg&s',
  ];

  // Industries Section Component with Fade-In Effect
  const IndustriesSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-white  bg-opacity-50 shadow-md rounded-lg p-6 mb-10"
    >
      <h2 className="lg:text-4xl text-2xl text-[#604CC3] font-semibold mb-4">Featured Industries</h2>
        <hr className="h-1 my-8 bg-[#604CC3] border-0 lg:w-1/4 w-1/2" />
      <p className="text-lg lg:text-xl mb-6 text-justify">
      The Industry-Academic Meet serves as a platform for professionals from various industries and academic institutions to come together and discuss the latest trends, challenges, and opportunities in their respective fields. This segment of the program aims to foster collaboration, spark new research ideas, and identify potential areas for partnerships. Industry representatives can share insights on real-world problems, while academics can present their research findings and discuss how they can be applied in practical settings. The meet will also include panel discussions, keynote speeches, and networking sessions to encourage open dialogue and idea exchange.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-2 border-[#213555] border-opacity-20 p-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center p-4 border-2 border-[#213555] border-opacity-20 rounded-lg">
            <Image 
              src={logo} 
              alt={`Industry logo ${index + 1}`} 
              width={120} 
              height={120} 
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Expected Outcomes Data
  const expectedOutcomes = [
    {
      title: 'Strengthened Collaborations',
      description: 'The meet will foster new partnerships between industry and academia, leading to collaborative research projects and joint ventures that address real-world challenges.',
    },
    {
      title: 'Innovation and Knowledge Transfer',
      description: 'Participants will exchange cutting-edge ideas and industry insights, leading to the cross-pollination of knowledge and innovative solutions applicable across various fields.',
    },
    {
      title: 'Networking Opportunities',
      description: 'Attendees will build valuable professional networks, leading to future collaborations, internships, and job opportunities for students and researchers.',
    },
    {
      title: 'Identification of Research Gaps',
      description: 'Discussions and presentations will help identify current research and technology gaps, guiding future academic and industry research initiatives.',
    },
  ];

  return (
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-60">
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/images/hackathon_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="pb-5">
        {/* Publication Image Section without Fade-In Effect */}
       

        {/* Industry-Academic Meet Block with Fade-In Effect */}
        <div
          className="bg-[#604CC3]/25 bg-opacity-20 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-4xl  font-bold text-center text-[#604CC3]">Industry Academia Meet</h1>
          
        </div>

        {/* Industries Section */}
        <div className='lg:m-10 m-5'>
          <IndustriesSection />
        </div>

        {/* Expected Outcomes Section with Fade-In Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#604CC3]/25 shadow-md rounded-lg p-6 mt-10 mx-5 md:mx-10"
        >
          <h2 className="text-2xl md:text-4xl text-[#604CC3] font-semibold mb-4">Expected Outcomes</h2>
          <hr className="h-1 my-4 bg-[#604CC3] border-0  lg:w-1/4 w-1/2" />
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
            className="list-disc list-inside space-y-4 text-lg md:text-xl text-gray-700"
          >
            {expectedOutcomes.map((outcome, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="transition-opacity duration-500"
              >
                <strong>{outcome.title}:</strong> {outcome.description}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Meet;
