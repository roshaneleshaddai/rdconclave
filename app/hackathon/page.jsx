'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export default function Hackathon() {
  const [isInView, setIsInView] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef(null);

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  // Set the target date for the countdown
  const targetDate = new Date('2024-12-31T23:59:59').getTime(); // Change this to the event date

  useEffect(() => {
    // Countdown function
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        // Countdown has ended
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    // Start countdown on component mount
    const interval = setInterval(calculateTimeLeft, 1000);

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasScrolled(true);
        } else if (hasScrolled && window.scrollY === 0) {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearInterval(interval);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [targetDate, hasScrolled]);

  const expectedOutcomes = [
    {
      title: 'Practical Skill Development',
      description:
        'Students will enhance their technical and problem-solving skills by working on real-world challenges, better preparing them for industry roles.',
    },
    {
      title: 'Innovation and Creativity',
      description:
        'The hackathon will encourage students to develop innovative solutions, potentially leading to the creation of prototypes or new technologies.',
    },
    {
      title: 'Teamwork and Collaboration',
      description:
        'Participants will learn to work effectively in teams, enhancing their ability to collaborate with peers from different disciplines and backgrounds.',
    },
    {
      title: 'Recognition and Opportunities',
      description:
        'Winning teams and standout participants may receive recognition, internships, or job offers from participating companies, providing them with a head start in their careers.',
    },
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-hidden font-sans mt-10">
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/images/hackathon_background.mp4" type="video/mp4" />
      </video> */}

      {/* Main Content */}
      <div className="mt-44 pb-[80px]">
        
        
        {/* Hackathon Details */}
        <div
          ref={sectionRef}
          className="bg-[#604CC3]/25 top-0 p-10 rounded-lg m-10"
        >
          <h1 className="text-4xl font-bold text-[#604CC3] text-center">Hackathon</h1>
        </div>


        <div className="flex flex-col md:flex-row justify-around min-h-full  md:p-5 md:px-60 space-y-4">
  <div
    // onClick={() => handleRedirect("/ideathon")}
    className="mt-5 bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-6 cursor-pointer  hover:shadow-xl hover:bg-[#604CC3]/50 flex flex-col items-center justify-center min-h-[15rem] min-w-[20rem]"
  >
    {/* Title Section */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3] ">
        Ideathon
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="p-4">Date: 31-12-2024</p>
      <p className="p-4">Time: 09:00 AM</p>
      <button className="p-4 bg-white text-lg border-2 border-[#4F709C]/40 hover:border-[#604CC3]  rounded-full">
      <Link href="https://forms.gle/mBcnvNzjyf5owmZB7">
        Register now
       </Link>
      </button>
    </div>  
  </div>

  {/* webathon Block */}
  <div
    // onClick={() => handleRedirect("/webathon")}
    className="bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-6 cursor-pointer hover:shadow-xl hover:bg-[#604CC3]/50 flex flex-col items-center justify-center min-h-[15rem] min-w-[20rem]"
  >
    {/* Title Section */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3]">
        Webathon
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="p-4">Date: 24-12-2024</p>
      <p className="p-4">Time: 09:00  AM</p>
      <button className="p-4 bg-white text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
      <Link href="https://forms.gle/F1DerQFZjeDt3UuaA">
        Register now
     </Link>
      </button>
    </div>
  </div>

</div>


        {/* Information Boxes and Countdown Timer */}
        <div className="flex flex-col md:flex-row justify-around items-center space-y-10 md:space-y-0 mt-5">
          {/* Left Information Box */}
          <div
            className={`px-8 md:px-10 py-4 md:py-5 w-full md:w-1/2 bg-white flex justify-around items-center rounded-lg shadow-md transition-transform duration-700 ${
              isInView ? 'animate-swipeInLeft' : '-translate-x-full'
            }`}
          >
            <p className="text-base md:text-lg justify-center font-normal text-black mt-2 min-h-[17rem]">
            Dive into the Student Hackathon—where innovation meets action! Team
            up with fellow students to tackle real-world problems and showcase
            your ingenuity. This thrilling competition is your chance to shine,
            get noticed by industry experts, and turn your ideas into impactful
            solutions. Join us for an unforgettable experience and be a part of
            the next big breakthrough!
          </p>
          
          </div>

          {/* Countdown Timer */}
          <div className="w-full md:w-1/2 h-80 md:h-96 rounded-2xl flex flex-col gap-6 items-center justify-center bg-cover bg-center mx-5 md:mx-10 p-4">
            <div className="text-2xl md:text-4xl font-bold text-[#604CC3]">
              Let's go...
            </div>
            <div className="flex items-start justify-center w-full gap-2 md:gap-4">
              {/* Days */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-3 min-w-20 md:min-w-24 flex items-center justify-center flex-col gap-1 px-3">
                  <h3 className="font-semibold text-3xl md:text-4xl text-black text-center">
                    {timeLeft?.days || 0}
                  </h3>
                  <p className="text-sm md:text-lg uppercase font-normal text-black mt-1 text-center">
                    Days
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-3 min-w-20 md:min-w-24 flex items-center justify-center flex-col gap-1 px-3">
                  <h3 className="font-semibold text-3xl md:text-4xl text-black text-center">
                    {timeLeft?.hours || 0}
                  </h3>
                  <p className="text-sm md:text-lg uppercase font-normal text-black mt-1 text-center">
                    Hours
                  </p>
                </div>
              </div>

              {/* Minutes */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-3 min-w-20 md:min-w-24 flex items-center justify-center flex-col gap-1 px-3">
                  <h3 className="font-semibold text-3xl md:text-4xl text-black text-center">
                    {timeLeft?.minutes || 0}
                  </h3>
                  <p className="text-sm md:text-lg uppercase font-normal text-black mt-1 text-center">
                    Minutes
                  </p>
                </div>
              </div>

              {/* Seconds */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-3 min-w-20 md:min-w-24 flex items-center justify-center flex-col gap-1 px-3">
                  <h3 className="font-semibold text-3xl md:text-4xl text-black text-center">
                    {timeLeft?.seconds || 0}
                  </h3>
                  <p className="text-sm md:text-lg uppercase font-normal text-black mt-1 text-center">
                    Seconds
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Information Box */}
          <div
            className={`px-8 md:px-10  w-full md:w-1/2 bg-white flex-co justify-around items-center rounded-lg shadow-md transition-transform duration-700 ${
              isInView ? 'animate-swipeInRight' : 'translate-x-full'
            }`}
          >
            
            <div className='flex'>

            <div className="flex flex-col items-center justify-center h-40">
              <img src="/images/prize1.png" className="w-20 h-20" alt="Prize 1" />
              <div className="w-40 text-center font-serif mt-2">₹25,000</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/images/prize2.png" className="w-20 h-20" alt="Prize 2" />
              <div className="w-40 text-center font-serif mt-2">₹20,000</div>
            </div>
            </div>
            <div className='flex'>
            <div className="flex flex-col items-center justify-center h-40">
              <img src="/images/grpicon.png" className="w-20 h-20" alt="Group Icon" />
              <div className="w-40 text-center font-serif mt-2">
                Team of 4-5
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-40">
              <img src="/images/feeicon.png" className="w-20 h-20" alt="Fee Icon" />
              <div className="w-40 text-center font-serif mt-2">
                Registration fee: ₹200
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Expected Outcomes Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#604CC3]/25 shadow-md rounded-lg p-6 mt-10 mx-10"
        >
          <h2 className="text-4xl text-[#604CC3] font-semibold mb-4">Expected Outcomes</h2>
          <hr className="h-1 my-4 bg-[#604CC3] border-0  w-1/4" />
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
            className="list-disc list-inside space-y-4 text-xl text-gray-700"
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
}
