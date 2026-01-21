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
    '/images/efftronicslogo.webp',
    'https://www.geospatialworld.net/wp-content/uploads/2019/09/nrsc.jpg',
    '/images/sparklogo.png',
    'https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png',
    'https://iittnif.com/images/logos/IITT_InIf_svg2-01.png',
    'https://media.licdn.com/dms/image/v2/C510BAQGV0O35YJWcTg/company-logo_200_200/company-logo_200_200/0/1631324752733?e=1745452800&v=beta&t=fcLPin37c8wDEecS6uclQqVAG-6CMj3T-1w8Q-siog4',
    'https://logosandtypes.com/wp-content/uploads/2024/07/Verizon.png',
    'https://media.licdn.com/dms/image/v2/C560BAQH8ScPl3YUWkg/company-logo_200_200/company-logo_200_200/0/1630660575582/roots_multiclean_ltd_logo?e=1745452800&v=beta&t=tZyAXq9LNG9rRom054nZccVRADKpDjIEIrtW2K_p7FQ',
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
      <h2 className="lg:text-4xl text-2xl text-[#002147] font-semibold mb-4">Featured Industries</h2>
        <hr className="h-1 my-8 bg-[#002147] border-0 lg:w-1/4 w-1/2" />
      <p className="text-lg lg:text-xl mb-6 text-justify">
      The Industry-Academia Meet serves as a platform for professionals from various industries and academic institutions to come together and discuss the latest trends, challenges, and opportunities in their respective fields. This segment of the program aims to foster collaboration, spark new research ideas, and identify potential areas for partnerships. Industry representatives can share insights on real-world problems, while academics can present their research findings and discuss how they can be applied in practical settings. The meet will also include panel discussions, keynote speeches, and networking sessions to encourage open dialogue and idea exchange.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-2 border-[#002147] border-opacity-20 p-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center p-4 border-2 border-[#002147] border-opacity-20 rounded-lg">
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
    <div className="relative font-SUSE min-h-screen max-w-screen mt-48 md:mt-64">
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
          className="bg-[#002147]/10 bg-opacity-20 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-4xl  font-bold text-center text-[#002147]">Industry Academia Meet</h1>
          
        </div>

        {/* Industry-Academia Meet Tracks Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-12 mx-5 md:mx-10"
        >
          <h2 className="text-2xl md:text-4xl text-[#002147] font-semibold mb-4">Industry-Academia Meet Tracks</h2>
          <hr className="h-1 my-4 bg-[#002147] border-0  lg:w-1/4 w-1/2" />

          {/* Track 1 */}
          <div className="mb-10 bg-white bg-opacity-50 shadow-md rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-[#002147] mb-3">Track 1: Powering the future of Engineering Eco System</h3>
            <p className="text-gray-700 mb-4">Edge AI, Digital Twins, Quantum, Cyber-Physical Systems and GIS&RS for Sustainable and Self-Reliant Smart Industries</p>
            <p className="text-gray-700 mb-4 text-sm">Advancing Industry 4.0 technologies to build energy-efficient, resilient, and sustainable industrial systems, contributing to SDGs, strengthening Make in India, and accelerating Viksit Bharat @2047 through indigenous smart infrastructure and manufacturing.</p>
            <p className="font-semibold text-[#002147] mb-4">TIME: 11:30 AM - 12:30 PM</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="bg-[#E8EEF7]">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Moderator</td>
                    <td className="border border-gray-300 px-4 py-3">Venkat Gajjala, Sr. Vice President, Global Head, Tech Mahindra</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Industrialists</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Mr. N. Jai Prakash, Director- Talent Initiatives, Hyderabad</li>
                        <li>Mr. M.V. Rajashekhar, Sr. Vice President, Paras Defense & Space Technologies, Hyderabad</li>
                        <li>Dr. Vipul Valamjee, Strategic Advisor – AI Talent & Employability work with AP Govt, Calibo Technologies, Hyderabad</li>
                        <li>Mr. Rajiv Kumar, Scientist -G & Group Head, Soil Resources & Land Use Monitoring Group (NRSC), Hyderabad</li>
                        <li>Mr. K. Prathap, Senior Product Manager, Tata Consultancy Services, Hyderabad</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Academicians</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Dr. A. Sree Ram, Professor and Head, School of Management</li>
                        <li>Dr. D. Rajeswara Rao, Professor & HOD, Dean Industry relations, Training & placements</li>
                        <li>Mr. K. Srinivas, Head, Industry Relations & Placements</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Track 2 */}
          <div className="mb-10 bg-white bg-opacity-50 shadow-md rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-[#002147] mb-3">Track 2: Talent 2023: Building SDG-Aligned, Industry-Ready Human Capital</h3>
            <p className="text-gray-700 mb-4">Building SDG-Aligned, Industry-Ready Human Capital for AI-Driven Workplaces in a Self-Reliant India</p>
            <p className="text-gray-700 mb-4 text-sm">Reimagining curricula, skills, and mindsets to develop a future-ready workforce aligned with SDG 4 (Quality Education), supporting Atmanirbhar Bharat through indigenous talent development and powering Viksit Bharat @2047 with globally competitive professionals.</p>
            <p className="font-semibold text-[#002147] mb-4">TIME: 12:30 PM - 1:30 PM</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="bg-[#E8EEF7]">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Moderator</td>
                    <td className="border border-gray-300 px-4 py-3">Mr. D. Rama Krishna, CEO & Founder-Efftronics Systems Pvt. Ltd.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Industrialists</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Mr. B. Vinod Babu, CEO-Bluecloudsoft Solutions, Hyderabad</li>
                        <li>Mr. P. Sreenivasa Vivekanand, Head, BFSI CBO Transition Practice, TCS, Hyderabad</li>
                        <li>Mr. V. Srinagaveer, Founder & CEO-CCC, Hyderabad</li>
                        <li>Ms. D. Spurthi, Executive Manager-Efftronics Systems Pvt. Ltd. Vijayawada</li>
                        <li>Mr. Ch. Vamsi Krishna Reddy, Regional Head- Academic & Govt, LinkedIn, Hyderabad</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Academicians</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Dr. G. N. Swamy, Professor & Head, Electronics & Instrumentation Engineering</li>
                        <li>Dr. N. Ravi Kumar, Professor & Head, Mechanical Engineering</li>
                        <li>Dr. Mohammed Ismail. B, Dean Academics</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Track 3 */}
          <div className="mb-10 bg-white bg-opacity-50 shadow-md rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-[#002147] mb-3">Track 3: Ideas to Models: Responsible and Multimodal AI</h3>
            <p className="text-gray-700 mb-4">Responsible and Multimodal AI for Sustainable Development and Viksit Bharat @2047</p>
            <p className="text-gray-700 mb-4 text-sm">Focusing on agent-based and multimodal AI systems that are ethical, transparent, and inclusive, supporting the UN SDGs and enabling self-reliant, indigenous AI ecosystems aligned with Atmanirbhar Bharat and trusted digital governance for a Developed India by 2047.</p>
            <p className="font-semibold text-[#002147] mb-4">TIME: 2:15 PM - 3:15 PM</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="bg-[#E8EEF7]">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Moderator</td>
                    <td className="border border-gray-300 px-4 py-3">Prof. D. V. L. N. Somayajulu, Director- NIT, Manipur</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Industrialists</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Padmaja Sriram, Head - TA –APAC AT&T, Hyderabad</li>
                        <li>Mr. K.V.N.D.S Srinivas, Senior Vice President & Delivery Head for HLS Healthcare, APAC & Europe, Persistence Systems, Chennai</li>
                        <li>Dr. Prem Kondaveeti, Project Manager Jesvid Cryo Technologies Pvt.Ltd - Vijayawada</li>
                        <li>Mr. Srinivas Reddy, Tech Mahindra, Vijayawada</li>
                        <li>Mr. J. Komali, Manager Moschip, Hyderabad</li>
                        <li>Dr. B. Pradeepa Kumari, Deputy Executive Engineer, Water Resources Department, Government of Andhra Pradesh</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Academicians</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Dr. M. Ravi Shankar, Professor & Head (IIT-T)</li>
                        <li>Dr. V. Mallikarjuna, Professor and Head, Civil Engineering</li>
                        <li>Dr. T. Anuradha, Professor & Controller of Examination</li>
                        <li>Dr. K. Purnachandra Rao, Professor and Head, MCA</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Track 4 */}
          <div className="mb-10 bg-white bg-opacity-50 shadow-md rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-[#002147] mb-3">Track 4: From Lab to Market: SDG-Driven Research Translation</h3>
            <p className="text-gray-700 mb-4">SDG-Driven Research Translation and Indigenous Innovation for Atmanirbhar Bharat</p>
            <p className="text-gray-700 mb-4 text-sm">Transforming academic research into scalable, fundable, and industry-ready technologies, fostering startups, IP creation, and technology transfer that address national priorities and global SDGs, reinforcing India's self-reliant innovation economy.</p>
            <p className="font-semibold text-[#002147] mb-4">TIME: 3:30 PM - 4:30 PM</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="bg-[#E8EEF7]">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Moderator</td>
                    <td className="border border-gray-300 px-4 py-3">Dr. Roshan Srivastav, Project Director-IIT Tirupati Navavishkar I-Hub Foundation</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Industrialists</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Ms. G. Ravali, Senior Project Manager-Microsoft, Hyderabad</li>
                        <li>Mr. Rajasekharam Naidu P, Co-Founder, Director Embedded Software & AI, BITSILICA - Semiconductor Design Services</li>
                        <li>Mr. V. Rama Krishna, Capability Manager-HCL, Vijayawada</li>
                        <li>Dr. R. Prabhakaran, Associate Vice President- L&D, RANE Industries, Chennai</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-[#002147]">Academicians</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Prof. D. V. L. N. Somayajulu, Director- NIT, Manipur</li>
                        <li>Dr. P.V.R.L. Narasimham, Professor & HOD, EEE</li>
                        <li>Dr. M. Suneetha, Professor & Head, Information Technology</li>
                        <li>Dr. D. Venkata Rao, Professor & HOD, ECE</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

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
          className="bg-[#002147]/10 shadow-md rounded-lg p-6 mt-10 mx-5 md:mx-10"
        >
          <h2 className="text-2xl md:text-4xl text-[#002147] font-semibold mb-4">Expected Outcomes</h2>
          <hr className="h-1 my-4 bg-[#002147] border-0  lg:w-1/4 w-1/2" />
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
