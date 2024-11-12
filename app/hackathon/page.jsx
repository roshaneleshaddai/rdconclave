'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export default function Hackathon() {
  const [isLeftInView, setIsLeftInView] = useState(false);
  const [isRightInView, setIsRightInView] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const sectionLeftRef = useRef(null);
  const sectionRightRef = useRef(null);

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
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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

    // Intersection Observer for swipe animations
    const observerOptions = {
      threshold: 0.3, // Adjust based on when you want the animation to trigger
    };

    const leftObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsLeftInView(true);
      }
    }, observerOptions);

    const rightObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsRightInView(true);
      }
    }, observerOptions);

    if (sectionLeftRef.current) leftObserver.observe(sectionLeftRef.current);
    if (sectionRightRef.current) rightObserver.observe(sectionRightRef.current);

    return () => {
      clearInterval(interval);
      if (sectionLeftRef.current) leftObserver.unobserve(sectionLeftRef.current);
      if (sectionRightRef.current) rightObserver.unobserve(sectionRightRef.current);
    };
  }, [targetDate]);

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
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-56">
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
      <div className="pb-5">
        
        <div
          className="bg-[#604CC3]/25 bg-opacity-20 p-8 rounded-lg mx-6 transition-opacity duration-1000 "
        >
          <h1 className="text-4xl  font-bold text-center text-[#604CC3]">HackWeb Challenge</h1>
          
        </div>


        <div className="flex flex-col items-center lg:flex-row lg:justify-center min-h-full p-4 justify-around">
  <div
    onClick={() => handleRedirect("https://forms.gle/u7b8FL1UG8cA5Tu2A")}
    className="my-5 bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-8 cursor-pointer  hover:shadow-xl hover:bg-[#FEF9D9]/25 flex flex-col items-center justify-center h-[24rem] lg:w-[23rem] w-[22rem]"
  >
    {/* Title Section */}
    <div className="flex-0.5 flex items-center justify-center ">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3] ">
        AI Hackathon
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="text-center">Registration Deadline:<span className="text-blue-800"> November 2, 2024</span></p>
      <p className="text-center">Final Round Notification:<span className="text-blue-800"> December 2, 2024</span></p>
      <p className="text-center">Final Round:<span className="text-blue-800"> January 24, 2024, 12 PM - January 25, 2024, 12 PM</span></p>
      <button className="p-2 m-2 bg-white text-lg border-2 border-[#4F709C]/40 hover:border-[#604CC3]  rounded-full">
        <Link href="https://forms.gle/u7b8FL1UG8cA5Tu2A">
        Register now
        </Link>
      </button>
    </div>  
  </div>

  {/* webathon Block */}
  <div
    onClick={() => handleRedirect("https://forms.gle/u7b8FL1UG8cA5Tu2A")}
    className="my-5 bg-[#604CC3]/25 bg-opacity-20 p-6 rounded-lg mx-8 cursor-pointer  hover:shadow-xl hover:bg-[#FEF9D9]/25 flex flex-col items-center justify-center h-[24rem] lg:w-[23rem] w-[22rem]"
  >
    {/* Title Section */}
    <div className="flex-0.5 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#604CC3]">
         Webathon
      </h1>
    </div>
    {/* Date, Time, and Button Section */}
    <div className="flex-1 flex flex-col items-center justify-center font-bold">
      <p className="text-center">Registration Deadline:<span className="text-blue-800"> November 2, 2024</span></p>
      <p className="text-center">Final Round Notification:<span className="text-blue-800"> December 2, 2024</span></p>
      <p className="text-center">Final Round:<span className="text-blue-800"> January 24, 2024, 12 PM - January 25, 2024, 12 PM</span></p>
      
      <button className="p-2 m-2 bg-white text-lg border-2 border-[#4F709C]/50 hover:border-[#4F709C] rounded-full">
      <Link href="https://forms.gle/u7b8FL1UG8cA5Tu2A">
        Register now
        </Link>
      </button>
    </div>
  </div>

</div>

        {/* Information Boxes and Countdown Timer */}
        <div className="flex flex-col lg:flex-row justify-around items-center space-y-10 md:space-y-0 mt-5">
          {/* Left Information Box */}
          <motion.div
            ref={sectionLeftRef}
            className={`px-8 md:px-10 py-2 md:py-5 w-full md:w-1/2 bg-white flex justify-center items-center rounded-lg shadow-md lg:h-[20rem] transition-transform duration-700 ${
              isLeftInView ? 'animate-swipeInLeft' : 'opacity-0'
            }`}
          >
            <p className="text-base md:text-lg justify-center font-normal text-black mt-2 ">
              Dive into the Student Hackathon—where innovation meets action! Team up with fellow students to tackle real-world problems and showcase your ingenuity. This thrilling competition is your chance to shine, get noticed by industry experts, and turn your ideas into impactful solutions. Join us for an unforgettable experience and be a part of the next big breakthrough!
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <div className="w-full lg:w-[40%] h-auto lg:h-96 rounded-2xl flex flex-col gap-4 items-center justify-center bg-cover bg-center mx-5 lg:mx-10 p-4">
            <div className="text-xl lg:text-3xl font-bold text-[#604CC3] text-center">
              Let's go...
            </div>
            <div className="flex items-center justify-center w-full gap-2 lg:gap-3">
              {/* Days */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-2 px-2 min-w-[4.5rem] lg:min-w-[5.5rem] flex items-center justify-center flex-col">
                  <h3 className="font-semibold text-2xl lg:text-3xl text-black text-center">
                    {timeLeft?.days || 0}
                  </h3>
                  <p className="text-xs lg:text-base uppercase font-normal text-black text-center">Days</p>
                </div>
              </div>
              {/* Hours */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-2 px-2 min-w-[4.5rem] lg:min-w-[5.5rem] flex items-center justify-center flex-col">
                  <h3 className="font-semibold text-2xl lg:text-3xl text-black text-center">
                    {timeLeft?.hours || 0}
                  </h3>
                  <p className="text-xs lg:text-base uppercase font-normal text-black text-center">Hours</p>
                </div>
              </div>
              {/* Minutes */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-2 px-2 min-w-[4.5rem] lg:min-w-[5.5rem] flex items-center justify-center flex-col">
                  <h3 className="font-semibold text-2xl lg:text-3xl text-black text-center">
                    {timeLeft?.minutes || 0}
                  </h3>
                  <p className="text-xs lg:text-base uppercase font-normal text-black text-center">Minutes</p>
                </div>
              </div>
              {/* Seconds */}
              <div className="timer">
                <div className="rounded-xl bg-[#604CC3]/25 backdrop-blur-sm py-2 px-2 min-w-[4.5rem] lg:min-w-[5.5rem] flex items-center justify-center flex-col">
                  <h3 className="font-semibold text-2xl lg:text-3xl text-black text-center">
                    {timeLeft?.seconds || 0}
                  </h3>
                  <p className="text-xs lg:text-base uppercase font-normal text-black text-center">Seconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Information Box */}
          <motion.div
            ref={sectionRightRef}
            className={`px-8 md:px-10 w-full md:w-1/2 bg-white flex-co justify-around items-center rounded-lg shadow-md lg:h-[20rem] transition-transform duration-700 ${
              isRightInView ? 'animate-swipeInRight' : 'opacity-0'
            }`}
          >
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center h-40">
                <img src="/images/prize1.png" className="w-20 h-20" alt="Prize 1" />
                <div className="w-40 text-center mt-2">₹25,000</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img src="/images/prize2.png" className="w-20 h-20" alt="Prize 2" />
                <div className="w-40 text-center mt-2">₹20,000</div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center h-40">
                <img src="/images/grpicon.png" className="w-20 h-20" alt="Group Icon" />
                <div className="w-40 text-center mt-2">Team of 2-4</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img src="/images/feeicon.png" className="w-20 h-20" alt="Fee Icon" />
                <div className="w-40 text-center mt-2">Registration fee: ₹500</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expected Outcomes Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#604CC3]/25 shadow-md rounded-lg p-6 mt-10 mx-5 md:mx-10"
        >
          <h2 className="text-2xl md:text-4xl text-[#604CC3] font-semibold mb-4">Expected Outcomes</h2>
          <hr className="h-1 my-4 bg-[#604CC3] border-0  w-1/4" />
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
            className="list-disc list-inside space-y-4 text-lg text-gray-700"
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
