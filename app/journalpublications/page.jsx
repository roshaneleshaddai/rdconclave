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
  
  const emailAddress = "rdconclave25@vrsiddhartha.ac.in"; // Replace with the desired email address
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

  return (
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-56">
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

        {/* journal Publications Section with Fade-In Animation */}
        <div
          className="bg-[#604CC3]/25 bg-opacity-20 p-8 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-4xl  font-bold text-center text-[#604CC3]">Journal Publications</h1>
          {/* <p className="text-lg text-black p-2">
            journal Publications at our college highlights the research contributions of our esteemed academic staff, showcasing their latest papers, publications, and projects. This platform fosters collaboration with peers, industry professionals, and other institutions. Through engaging poster sessions, oral presentations, and panel discussions, our journal present their groundbreaking work, encouraging rich discussions and constructive feedback. This initiative reflects our commitment to academic excellence and paves the way for future collaborative research endeavors.
          </p> */}
        </div>
        {/* Submission Deadlines Section */}
      <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md mx-6 mb-8">
        <h2 className="text-3xl font-bold text-center text-[#604CC3] mb-4">Important Dates</h2>
        <ul className="text-lg text-center text-gray-700 space-y-2">
          <li><strong>Submission Deadline:</strong> December 20, 2024</li>
          <li><strong>Acceptance Notification:</strong> January 5, 2025</li>
          <li><strong>Event Registration Deadline:</strong> January 10, 2025</li>
        </ul>
      </div>
        <div className="flex flex-col md:flex-row justify-around space-y-6 md:space-y-0 md:space-x-10 mt-6 items-center">
          {/* Expected Papers Section */}
          {/* <div className="px-6 ml-8 md:px-12 text-[#604CC3] py-4 flex justify-center">
            <div
              ref={sectionRef}
              className="font-bold flex flex-col justify-center text-4xl bg-[#604CC3]/25 bg-opacity-20 w-40 h-40 text-center transition-all duration-500 p-6 rounded-lg"
            >
              {countA}-{countB}
              <div className="text-lg ">Expected Papers</div>
            </div>
          </div> */}

          {/* Journals Section with Swipe-In-Right Animation */}
          <div
        ref={publicationsRef}
        className={mt-1 w-full bg-white bg-opacity-50 p-8 rounded-lg transition-opacity duration-1000 ${
        publicationsInView ? 'animate-swipeInRight opacity-100' : 'opacity-0'
        }}
        >
        <h1 className="text-4xl font-bold pb-4 text-[#604CC3]">Journals</h1>
  
      {/* table of journals */}
  <div className="overflow-x-auto">
    <table className="min-w-full text-left table-auto border-collapse border-2 border-[#4F709C]">
      <thead>
        <tr>
          <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">S.No.</th>
          <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">Journal Name</th>
          <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">Journal Link</th>
{/*           <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">Quartile</th> */}
          {/* <th className="px-4 py-2 border border-[#4F709C]">APC</th> */}
        </tr>
      </thead>
      <tbody>
        {journals.map((journal) => (
          <tr key={journal.sNo}>
            <td className="px-4 py-2 border text-md  border-[#4F709C]">{journal.sNo}</td>
            <td className="px-4 py-2 border text-md  border-[#4F709C]">{journal.name}</td>
            <td className="px-4 py-2 border text-md  border-[#4F709C]">
              <a href={journal.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {journal.link}
              </a>
            </td>
{/*             <td className="px-4 py-2 border border-[#4F709C]">{journal.quartile}</td> */}
            {/* <td className="px-4 py-2 border border-[#4F709C]">{journal.apc}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>

        <div className='flex lg:flex-row flex-col justify-evenly items-center'>
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
          
        </div>
        
        <div className='flex justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#604CC3]/25 bg-opacity-20 px-20 py-10 rounded-lg  flex flex-col items-center m-10 ">

          <h1 className="text-2xl text-center font-bold text-black">Submission Link</h1>
          <button className="p-2 m-2 bg-white text-[#604CC3] text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
            <a href="https://forms.gle/CxueSuEZC3ML3q3o8 ">
        Click here!
             </a>
      </button>
{/*          <div className='items-center text-center'>
          <h1>or</h1>
          <Link href={https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}}> Email : <span className='text-blue-700'>rdconclave25@vrsiddhartha.ac.in</span> </Link>
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
      </div>
    </div>
  );
}
