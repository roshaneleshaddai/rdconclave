'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export default function JournalPublications() {
  const [countA, setCountA] = useState(0); // For target 50
  const [countB, setCountB] = useState(0); // For target 75
  const targetCountA = 50;
  const targetCountB = 75;
  const duration = 1500;
  const sectionRef = useRef(null);

  // Refs and states for animations
  const journalsRef = useRef(null);
  const [journalsInView, setJournalsInView] = useState(false);

  const publicationsRef = useRef(null);
  const [publicationsInView, setPublicationsInView] = useState(false);

  // const expectedOutcomes = [
  //   {
  //     title: 'Increased Research Visibility',
  //     description:
  //       'journal members will have the opportunity to showcase their research to a broader audience, increasing the visibility and impact of their work within both academic and industry circles.',
  //   },
  //   {
  //     title: 'Collaboration Opportunities',
  //     description:
  //       'journal publications may attract interest from industry partners or other academics, leading to collaborative research projects, funding opportunities, and cross-institutional partnerships.',
  //   },
  //   {
  //     title: 'Contribution to Knowledge',
  //     description:
  //       'The dissemination of journal research contributes to the body of knowledge in various fields, advancing understanding and potentially leading to new innovations and solutions to contemporary issues.',
  //   },
  // ];

  const journals = [
    // {
    //   sNo: 1,
    //   name: "Nanotechnology Perceptions",
    //   link: "http://nano-ntp.com",
    //   quartile: "Q4",
    //   // apc: "25000 INR"
    // },
    {
      sNo: 1,
      name: "Journal of Computational and Cognitive Engineering",
      link: "https://ojs.bonviewpress.com/index.php/JCCE/index",
      quartile: "Q1",
      // apc: "700 USD"
    },
    // {
    //   sNo: 3,
    //   name: "International Journal of Neutrosophic",
    //   link: "https://www.americaspg.com/journals/show/21",
    //   quartile: "Q1",
    //   // apc: "500 USD"
    // },
    // {
    //   sNo: 4,
    //   name: "Fusion: Practice and Applications",
    //   link: "https://www.americaspg.com/journals/show/3",
    //   quartile: "Q2",
    //   // apc: "300 USD"
    // },
    {
      sNo: 2,
      name: "Journal of Infrastructure, Policy and Development",
      link: "https://systems.enpress-publisher.com/index.php/jipd",
      quartile: "",
      // apc: "12000 INR"
    },
    {
      sNo: 3,
      name: "Proceedings on Engineering Sciences",
      link: "https://pesjournal.net/calls_for_special_issues.php",
      quartile: "",
      // apc: "300 USD"
    },
    {
      sNo: 4,
      name: "Lecture Notes in Electrical Engineering",
      link: "https://www.springer.com/series/7818",
      quartile: "",
      // apc: "12000 INR"
    },
    {
      sNo:5,
      name: "IEEE Conference Proceedings",
      link: "https://www.ieee.org/conferences/",
    }
  ];
  
  const emailAddress = "research.conclave@siddhartha.edu.in"; // Updated global contact email
  const subject = "";
  const body = ""; 


  useEffect(() => {
    const incrementA = () => {
      setCountA((prevCount) =>
        prevCount < targetCountA ? Math.min(prevCount + 1, targetCountA) : prevCount
      );
    };

    const incrementB = () => {
      setCountB((prevCount) =>
        prevCount < targetCountB ? Math.min(prevCount + 1, targetCountB) : prevCount
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const intervalA = setInterval(incrementA, duration / targetCountA);
          const intervalB = setInterval(incrementB, duration / targetCountB);
          // Disconnect observer after triggering
          observer.unobserve(entry.target);
          return () => {
            clearInterval(intervalA); // Clear interval for first target
            clearInterval(intervalB); // Clear interval for second target
          };
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [targetCountA, targetCountB, duration]);

  // Intersection Observer for Journals Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setJournalsInView(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the journals section is visible
    );

    if (journalsRef.current) {
      observer.observe(journalsRef.current);
    }

    return () => {
      if (journalsRef.current) {
        observer.unobserve(journalsRef.current);
      }
    };
  }, []);

  // Intersection Observer for journal Publications Fade-In Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPublicationsInView(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the publications section is visible
    );

    if (publicationsRef.current) {
      observer.observe(publicationsRef.current);
    }

    return () => {
      if (publicationsRef.current) {
        observer.unobserve(publicationsRef.current);
      }
    };
  }, []);

  
const DownloadSchedule = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-8 text-center lg:w-3/4 border-b border-2 m-2">
        <h1 className="text-2xl font-bold mb-6">Presentation Schedules</h1>

        {/* Online Presentation Schedule */}
        <div className="mb-8 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Online Presentations Schedule on 24th & 25th January 2025
          </h2>
          <iframe
            src="/online schedule.pdf"
            className="w-full h-96 border"
            title="Online Presentation Schedule"
                     type="application/pdf"
          ></iframe>
        </div>

        {/* Offline Presentation Schedule */}
        <div className="mb-8 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Offline Presentations Schedule on 24th & 25th January 2025
          </h2>
          <iframe
            src="/OFFLINE SCHEDULE.pdf"
            className="w-full h-96 border"
            title="Offline Presentation Schedule"
             type="application/pdf"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
    const DownloadSchedules = () => {
      return (
        <div className="flex flex-col items-center">
        <div className="p-8 text-center lg:w-3/4 border-b border-2 m-2">
          <h1 className="text-2xl font-bold mb-6">Download Presentation Schedules</h1>
    
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Online Presentations Schedule on 24th & 25th January 2025</h2>
            <a
              href="/online schedule.pdf"
              download="Online_Presentation_Schedule_24th-25th_Jan_2025.pdf"
              className="text-blue-500 hover:underline"
            >
              <button className="px-6 py-2 bg-[#002147] text-white rounded hover:bg-[#002147]/90">
                Download Online Schedule
              </button>
            </a>
          </div>
    
          <div className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Offline Presentations Schedule on 24th & 25th January 2025</h2>
            <a
              href="/OFFLINE SCHEDULE.pdf"
              download="Offline_Presentation_Schedule_24th-25th_Jan_2025.pdf"
              className="text-blue-500 hover:underline"
            >
              <button className="px-6 py-2 bg-[#002147] text-white rounded hover:bg-[#002147]/90">
                Download Offline Schedule
              </button>
            </a>
          </div>
        </div>
        </div>
      );
    };

  return (
    <div className="relative font-SUSE min-h-screen w-full mt-48 md:mt-64">
      {/* Background Video */}
      
        
      <div className="pb-5">
        {/* Publication Image Section */}
        {/* <div className="relative h-screen w-full">
          <Image
            src="/images/pubimg.jpg"
            alt="publication image"
            fill
            className="object-cover"
            priority
          />
        </div> */}

          {/* Important dates moved below themes */}

        {/* <div className='flex lg:flex-row flex-col justify-evenly items-center'>
         <div className='flex flex-col'>
          <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxT9G3gSxNZESl4NJH1NzcPq0kBF1XNyHcA&s"
          alt="ieee"
          width={250} 
          height={250} 
          objectFit="cover"
          className='border-4 border-black'
          />
          <p className='text-center text-2xl p-2'>IEEE</p>
          </div> 
          <div className='flex flex-col'>
            <Image
          src="/images/springer.png"
          alt="springer"
          width={250} 
          height={250} 
          objectFit="cover"
          className='border-4 border-black'
          />
          <p className='text-center text-2xl p-2'>Springer Lecture Series</p>
          </div>
          
        </div> */}
        
        {/* Schedule Downloads (Online/Offline) */}
        <div className="mx-6 mb-6">
          <div className="bg-[#002147]/10 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#002147]">Download Presentation Schedules</h2>
            <div className="flex gap-3">
              <a
                href="/RC2026-OFFLINE%20PRESENTATION%20SCHEDULE..pdf"
                download="RC2026-Offline-Presentation-Schedule.pdf"
              >
                <button className="px-4 py-2 bg-[#002147] text-white rounded hover:bg-[#002147]/90">Offline</button>
              </a>
              <a
                href="/RC2026-ONLINE%20PRESENTATION%20SCHEDULE.pdf"
                download="RC2026-Online-Presentation-Schedule.pdf"
              >
                <button className="px-4 py-2 bg-[#002147] text-white rounded hover:bg-[#002147]/90">Online</button>
              </a>
            </div>
          </div>
        </div>

        {/* Themes Table moved above Important Dates */}
        <div className="mx-6 mb-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-left text-[#002147] mb-2 border-l-4 border-[#002147] pl-3">Conference Themes</h2>
          <p className="text-left text-sm text-gray-600 mb-4">Submissions are invited under (but not limited to) the following themes.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm md:text-base">
              <thead className="bg-[#002147] text-white">
                <tr>
                  <th className="px-4 py-3 text-left w-1/3">Theme</th>
                  <th className="px-4 py-3 text-left">Topics</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Intelligent Computing and Emerging Technologies</td>
                  <td className="px-4 py-3 space-y-1">
                    <ul className="list-disc list-inside space-y-1">
                      <li>AI, ML, and Deep Learning</li>
                      <li>Neural, Fuzzy, and Cognitive Computing</li>
                      <li>Evolutionary and Swarm Optimization</li>
                      <li>Hybrid Intelligent Systems</li>
                      <li>Cloud, Edge, and Fog Computing</li>
                      <li>Cybersecurity and Blockchain</li>
                      <li>5G/6G and Future Networks</li>
                      <li>Wide-Area Monitoring and Control</li>
                      <li>Quantum Computing and Post-CMOS Devices</li>
                      <li>Brain–Computer Interfaces</li>
                      <li>AR/VR and Human Augmentation</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Robotics, Automation, and Industry 5.0</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Smart and Digital Manufacturing</li>
                      <li>Additive and Hybrid Manufacturing</li>
                      <li>Robotics, Mechatronics, and Tribology</li>
                      <li>CFD and Thermal Analysis</li>
                      <li>Combustion, Engines, and Emission Control</li>
                      <li>Precision and Sustainable Manufacturing</li>
                      <li>Resilient and Human-Centric Manufacturing</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Biomedical Engineering and Healthcare Technologies</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Biomedical Signal and Image Processing</li>
                      <li>Smart Healthcare Sensors and Wearables</li>
                      <li>Medical Robotics and Automation</li>
                      <li>Virtual and Remote Instrumentation</li>
                      <li>Biomedical Devices and Biosensors</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Sustainable Civil Engineering and Infrastructure</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Green Materials and Sustainable Construction</li>
                      <li>Smart Mobility and Transport Systems</li>
                      <li>Eco-Friendly Infrastructure Design</li>
                      <li>Waste Management and Circular Economy</li>
                      <li>Remote Sensing and GIS Technologies</li>
                      <li>Resilient and Cost-Effective Infrastructure</li>
                      <li>Advanced Construction Composites</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Advanced Electronics and Communication Systems</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Embedded and Cyber-Physical Systems</li>
                      <li>Optical, Wireless, and Satellite Communication</li>
                      <li>Signal, Image, and Multimedia Processing</li>
                      <li>VLSI Design and Nanoelectronics</li>
                      <li>Network Protocols and IoT Connectivity</li>
                      <li>Intelligent Sensors and Instrumentation</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Smart Energy and Sustainable Power Systems</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Smart Grid and Microgrid Systems</li>
                      <li>Renewable Energy and Power Converters</li>
                      <li>Electric Vehicles and Charging Systems</li>
                      <li>Demand-Side Energy Management</li>
                      <li>Sustainable Energy for Smart Cities</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Physical Sciences and Computational Modelling</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Material Synthesis and Characterization</li>
                      <li>Probability and Numerical Methods</li>
                      <li>Computational Physics and Chemistry</li>
                      <li>Mathematical Modelling and Optimization</li>
                    </ul>
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white align-top">
                  <td className="px-4 py-3 font-semibold">Humanities, Innovation, and Entrepreneurship</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Innovative Business Models</li>
                      <li>Economics and Strategic Management</li>
                      <li>Literature, Linguistics, and Human Values</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Dates */}
        <div className='flex justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#002147]/10 bg-opacity-20 px-20 py-10 rounded-lg  flex flex-col items-center m-10 ">
          <h1 className='text-3xl text-center font-bold px-5'>Important dates</h1>
          <hr className="h-1 my-2 bg-[#002147] lg:w-1/4 w-1/2" />
          <div className="lg:text-xl text-base flex-1 flex flex-col items-center justify-center font-bold lg:mx-5 m-2">
            <p className="text-center">Submission Deadline:<span className="text-red-500"> January 12, 2026</span></p>
            <p className="text-center mt-2">Acceptance Notification:<span className="text-red-500"> January 15, 2026</span></p>
            <p className="text-center mt-2">Registration Deadline:<span className="text-red-500"> January 17, 2026</span></p>
            <p className="text-center mt-2">Camera-Ready Paper Submission:<span className="text-red-500"> January 19, 2026</span></p>
          </div>

          <a
            href="https://forms.gle/bDtPQKLap9DksAvt9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="px-6 py-3 mt-4 bg-[#002147] text-white font-semibold rounded-lg shadow hover:bg-[#002147]/90 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:ring-offset-2">
              Submit Here
            </button>
          </a>
          {/* <button className="p-2 m-2 bg-white text-[#002147] text-lg border-2 border-[#002147]/50 hover:border-[#002147] rounded-full">
            <a href="https://forms.gle/CxueSuEZC3ML3q3o8 ">
        Click here!
             </a>
      </button> */}
            
{/*          <div className='items-center text-center'>
          <h1>or</h1>
          <Link href={https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}}> Email : <span className='text-blue-700'>research.conclave@siddhartha.edu.in</span> </Link>
         </div> */}
        </motion.div>
        
        

        {/* Expected Outcomes Section */}
        {/* <div className="bg-[#4F709C]/25 shadow-md rounded-lg p-8 mt-10 mx-6">
          <h2 className="text-4xl font-semibold mb-4 text-[#213555]">Expected Outcomes</h2>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
            className="space-y-4 text-lg"
          >
            {expectedOutcomes.map((outcome, index) => (
              <motion.li
                key={index}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <strong>{outcome.title}:</strong> {outcome.description}
              </motion.li>
            ))}
          </motion.ul>
        </div> */}
        
      
      </div>
      {/* <DownloadSchedule/> */}
      </div>
    </div>
  );
}
