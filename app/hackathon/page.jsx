'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hackathon() {
  const [isLeftInView, setIsLeftInView] = useState(false);
  const [isRightInView, setIsRightInView] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const sectionLeftRef = useRef(null);
  const sectionRightRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [event, setEvent] = useState("");
  const [file, setFile] = useState(null);

  const bankDetails = [
    { label: "Name of the Bank", value: "CANARA BANK" },
    { label: "Name of the Account Holder", value: "Principal, V.R.Siddhartha Engineering College" },
    { label: "Account Type", value: "Savings Bank" },
    { label: "Account Number", value: "33672200004978" },
    { label: "Bank Branch IFSC Code", value: "CNRB0013367" },
    { label: "MICR No.", value: "520015027" },
    { label: "Bank Branch Address", value: "VRS ENGG COLLEGE, KANURU, VIJAYAWADA - 520007" },
    { label: "SWIFT CODE", value: "CNRBINBBBFD" },
    { label: "COLLEGE PAN", value: "AABTS1271J" },
    { label: "COLLEGE GST NO.", value: "37AABTS1271J4ZA" },
    { label: "Institution Permanent ID", value: "1-10213343" },
    { label: "PFMS Unique code", value: "VRSEC" },
  ];

  const targetDate = new Date("2026-01-23T00:00:00").getTime();

  useEffect(() => {
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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    const observerOptions = {
      threshold: 0.3,
    };

    const leftObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsLeftInView(true);
      }
    }, observerOptions);

    const rightObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
      title: "Practical Skill Development",
      description:
        "Students will enhance their technical and problem-solving skills by working on real-world challenges, better preparing them for industry roles.",
    },
    {
      title: "Innovation and Creativity",
      description:
        "The hackathon will encourage students to develop innovative solutions, potentially leading to the creation of prototypes or new technologies.",
    },
    {
      title: "Teamwork and Collaboration",
      description:
        "Participants will learn to work effectively in teams, enhancing their ability to collaborate with peers from different disciplines and backgrounds.",
    },
    {
      title: "Recognition and Opportunities",
      description:
        "Winning teams and standout participants may receive recognition, internships, or job offers from participating companies, providing them with a head start in their careers.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64File = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            college,
            event,
            file: base64File,
          }),
        });
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          setName("");
          setEmail("");
          setPhone("");
          setCollege("");
          setEvent("");
          setFile(null);
        } else {
          const errorData = await response.json();
          alert(errorData.message || "An error occurred while submitting the form.");
        }
      } catch (error) {
        console.error("Error during submission:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative font-SUSE min-h-screen w-full mt-44 md:mt-64">
      <div className="pb-5">
        <div className="bg-[#002147]/10 bg-opacity-20 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000">
          <h1 className="text-4xl font-bold text-center text-[#002147]">inSAHEthon</h1>
        </div>

        {/* Countdown Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white via-blue-50 to-[#002147]/20 rounded-lg p-8 md:p-12 mt-10 mx-5 md:mx-10 shadow-lg"
        >
          <h2 className="text-2xl md:text-4xl text-[#002147] font-bold text-center mb-2">
            Event Countdown
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            January 23rd, 2026
          </p>

          <div className="flex justify-center items-center gap-2 md:gap-4 lg:gap-6">
            {/* Days */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#002147] to-[#004080] shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {timeLeft.days}
                </span>
              </div>
              <p className="text-[#002147] font-semibold text-xs sm:text-sm md:text-base mt-3">
                DAYS
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl text-[#002147] font-bold"
            >
              :
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#002147] to-[#004080] shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {timeLeft.hours}
                </span>
              </div>
              <p className="text-[#002147] font-semibold text-xs sm:text-sm md:text-base mt-3">
                HOURS
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-4xl text-[#002147] font-bold"
            >
              :
            </motion.div>

            {/* Minutes */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#002147] to-[#004080] shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {timeLeft.minutes}
                </span>
              </div>
              <p className="text-[#002147] font-semibold text-xs sm:text-sm md:text-base mt-3">
                MINUTES
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-4xl text-[#002147] font-bold"
            >
              :
            </motion.div>

            {/* Seconds */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#002147] to-[#004080] shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {timeLeft.seconds}
                </span>
              </div>
              <p className="text-[#002147] font-semibold text-xs sm:text-sm md:text-base mt-3">
                SECONDS
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center lg:flex-row lg:justify-center min-h-full p-4 justify-around">
          <div className="my-5 bg-[#002147]/10 bg-opacity-20 p-6 rounded-lg mx-8 cursor-pointer hover:shadow-xl hover:bg-[#FFD700]/10 flex flex-col items-center justify-center h-[24rem] lg:w-[23rem] w-[22rem]">
            <div className="flex-0.5 flex items-center justify-center">
              <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#002147]">
                CodeFusion
              </h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center font-bold">
              <p className="text-center">
                Registration Deadline:<span className="text-[#002147]"> 8th January 2026</span>
              </p>
              <p className="text-center">
                Final Round Notification:<span className="text-[#002147]"> 11th January 2026</span>
              </p>
              <p className="text-center">
                Final Round:<span className="text-[#002147]"> January 23rd 2026, 11:00 AM - January 24th 2026, 11:00 AM</span>
              </p>
              <Link href="/hackathon/codefusion">
                <button className="p-2 m-2 bg-white text-lg border-2 border-[#002147]/40 hover:border-[#002147] rounded-full">
                  Register now
                </button>
              </Link>
            </div>
          </div>

          <div className="my-5 bg-[#002147]/10 bg-opacity-20 p-6 rounded-lg mx-8 cursor-pointer hover:shadow-xl hover:bg-[#FFD700]/10 flex flex-col items-center justify-center h-[24rem] lg:w-[23rem] w-[22rem]">
            <div className="flex-0.5 flex items-center justify-center">
              <h1 className="text-3xl sm:text-4xl text-center font-bold text-[#002147]">
                TechEmbed
              </h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center font-bold">
              <p className="text-center">
                Registration Deadline:<span className="text-[#002147]"> 5th January 2026</span>
              </p>
              <p className="text-center">
                Final Round Notification:<span className="text-[#002147]"> 8th January 2026</span>
              </p>
              <p className="text-center">
                Final Round:<span className="text-[#002147]"> January 23rd 2026, 11:00 AM - January 24th 2026, 11:00 AM</span>
              </p>
              <button className="p-2 m-2 bg-white text-lg border-2 border-[#002147]/40 hover:border-[#002147] rounded-full">
                Register Now
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-[#002147]/10 shadow-md rounded-lg p-6 mt-10 mx-5 md:mx-10"
        >
          <h2 className="text-2xl md:text-4xl text-[#002147] font-semibold mb-4">Expected Outcomes</h2>
          <hr className="h-1 my-4 bg-[#002147] border-0 w-1/4" />
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