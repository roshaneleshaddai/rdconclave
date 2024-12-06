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

  const journals = [
    {
      sNo: 1,
      name: 'Journal of Computational and Cognitive Engineering',
      link: 'https://ojs.bonviewpress.com/index.php/JCCE/index',
      quartile: 'Q1',
    },
    {
      sNo: 2,
      name: 'Journal of Infrastructure, Policy and Development',
      link: 'https://systems.enpress-publisher.com/index.php/jipd',
      quartile: '',
    },
    {
      sNo: 3,
      name: 'Proceedings on Engineering Sciences',
      link: 'https://pesjournal.net/calls_for_special_issues.php',
      quartile: '',
    },
    {
      sNo: 4,
      name: 'Lecture Notes in Electrical Engineering',
      link: 'https://www.springer.com/series/7818',
      quartile: '',
    },
    {
      sNo: 5,
      name: 'IEEE Conference Proceedings',
      link: 'https://www.ieee.org/conferences/',
    },
  ];

  useEffect(() => {
    // Your existing useEffect code for animations
  }, []);

  return (
    <div className="relative font-SUSE min-h-screen w-screen mt-44 md:mt-56">
     

      {/* Existing content */}
      <div className="pb-5">
        <div
          className="bg-[#604CC3]/25 bg-opacity-20 p-8 rounded-lg mx-6 transition-opacity duration-1000"
        >
          <h1 className="text-4xl font-bold text-center text-[#604CC3]">Journal Publications</h1>
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
          {/* Journals Section */}
          <div
            ref={publicationsRef}
            className={`mt-1 w-full bg-white bg-opacity-50 p-8 rounded-lg transition-opacity duration-1000 ${
              publicationsInView ? 'animate-swipeInRight opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="text-4xl font-bold pb-4 text-[#604CC3]">Journals</h1>

            {/* Table of journals */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left table-auto border-collapse border-2 border-[#4F709C]">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">S.No.</th>
                    <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">Journal Name</th>
                    <th className="px-4 py-2 border bg-[#604CC3]/25 text-[#604CC3] text-bold text-xl border-[#4F709C]">Journal Link</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map((journal) => (
                    <tr key={journal.sNo}>
                      <td className="px-4 py-2 border text-md border-[#4F709C]">{journal.sNo}</td>
                      <td className="px-4 py-2 border text-md border-[#4F709C]">{journal.name}</td>
                      <td className="px-4 py-2 border text-md border-[#4F709C]">
                        <a
                          href={journal.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {journal.link}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
