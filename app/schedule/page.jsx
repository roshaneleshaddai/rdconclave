'use client';
import React, { useState } from "react";

// Data structure for schedule details
const scheduleData = {
  day1: [
    {
      time: "08:30 AM",
      title: "Registration – Admin Block",
    },
    {
      time: "09:30 AM - 10:30 AM",
      title: "Inauguration – Auditorium",
      description: [
        "(Chief Guest)",
        "Mrs. Padmaja Sriram, AT&T (Guest of Honor)",
        "Mr. Sarada Prasanna Satapathy, PEGA (Guest of Honor)",
        "Dr. M Suneetha, Dean - Research, Technology & Development and IQAC, Professor & HoD-IT",
        "Dr. A. V. Ratna Prasad, Pro Vice Chancellor",
        "Dr. P. Venkateswara Rao, Vice Chancellor",
      ],
    },
    {
      time: "10:30 AM - 11:00 AM",
      title: "High Tea",
    },
    {
      time: "11:00 AM onwards",
      title: "TECHTREK",
      description: [
        "24 Hour Webathon",
        "24 Hour AI Hackathon",
        
      ],
    },
    
    {
        time: "11:00 AM – 12:00 PM",
        title: "Panel 1 Discussion – Auditorium",
        description: ["Panel discussion title and details"],
        panelMembers: {
          moderators: [
            {
                name: "Smt. Padmaja Sriram",
                position: "AT&T",
                image: "/images/attr1.jpg",
            },
            {
                name: "Dr P Venkateswara Rao",
                position: "VC",
                image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Chancellor-K-V-Chowdary.jpg",
            },
        ],
          members: [
            {
              name: "Mr. MSR Murthy",
              position: "TCS",
              image: "/images/tcsr1.jpg",
            },
            {
              name: "Mr. Jitender Singh",
              position: "CTS",
              image: "/images/ctsr1.jpg",
            },
            {
              name: "Mr. A. Satyanarayana",
              position: "Avantel",
              image: "/images/r1.jpg",
            },
            {
              name: "T.Kamal Kumar",
              position: "BHEL",
              image: "/images/bhelr1.jpg",
            },
            {
              name: "Smt. V. Prathyusha",
              position: "Transdence",
              image: "/images/transdencer1.jpg",
            },
          ],
        },
      },
      {
        time: "12:00 PM – 01:00 PM",
        title: "Panel 2 Discussion – Auditorium",
        description: [
            "Panel discussion title and details",
            
        ],
        panelMembers: {
            moderators: [
              {
                  name: "Smt. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
              {
                  name: "Dr A V Ratna Prasad",
                  position: "Pro VC",
                  image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              },
          ],
            members: [
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "PEGA",
                image: "/images/pegar1.jpg",
              },
              {
                name: "Mr. Chaitanya Vetcham",
                position: "Verizon",
                image: "/images/verizonr1.jpg",
              },
              {
                name: "Mr.K. Abhinav",
                position: "Pi Data Center",
                image: "/images/pidatacr1.jpg",
              },
              {
                name: "Mr.M. Veeran",
                position: "Power Labs",
                image: "/images/powerlabr1.jpg",
              },
              {
                name: "Mr Raghavendra Kulkarni",
                position: "CTS",
                image: "/images/ctsr2.jpg",
              },
            ],
          },
      },
      {
        time: "02:30 PM – 03:30 PM",
        title: "Panel 3 Discussion – Auditorium",
        description: [
            "Panel discussion title and details",
            
        ],
        panelMembers: {
            moderators: [
              {
                  name: "Smt. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
              {
                  name: "Dr P Venkateswara Rao",
                  position: "VC",
                  image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Chancellor-K-V-Chowdary.jpg",
              },
          ],
            members: [
              {
                name: "Mr. MSR Murthy",
                position: "TCS",
                image: "/images/tcsr1.jpg",
              },
              {
                name: "Mr.M. Srinivas Reddy",
                position: "Tech Mahindra",
                image: "/images/techmr1.jpg",
              },
              {
                name: "Dr Krishna Kanth g Avuluir",
                position: "AMS",
                image: "/images/amsr1.jpg",
              },
              {
                name: "Smt. V. Prathyusha",
                position: "Transdence",
                image: "/images/transdencer1.jpg",
              },
              {
                name: "D. Harsha Vardhin",
                position: "Jesvid Cryo Technologies Private Limited",
                image: "/images/jesvidr1.jpg",
              },
            ],
          },
      },
      {
        time: "03:30 PM – 04:30 PM",
        title: "Panel 4 Discussion – Auditorium",
        description: [
            "Panel discussion title and details",
            
        ],
        panelMembers: {
            moderators: [
              {
                  name: "Smt. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
              {
                  name: "Dr A V Ratna Prasad",
                  position: "Pro VC",
                  image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              },
          ],
            members: [
              {
                name: "S. Suresh Babu",
                position: "RAPS",
                image: "/images/rapsr1.jpg",
              },
              {
                name: "Mr Raghavendra Kulkarni",
                position: "CTS",
                image: "/images/ctsr2.jpg",
              },
              {
                name: "Mr.M. Veeran",
                position: "Power Labs",
                image: "/images/powerlabr1.jpg",
              },
              {
                name: "Mr. Chaitanya Vetcham",
                position: "Verizon",
                image: "/images/verizonr1.jpg",
              },
              {
                name: "Mr.K. Abhinav",
                position: "Pi Data Center",
                image: "/images/pidatacr1.jpg",
              },
            ],
          },
      },
      {
        time: "04:30 PM – 05:30 PM",
        title: "Panel 5 Discussion – Auditorium",
        description: [
            "Panel discussion title and details",
            
        ],
        panelMembers: {
            moderators: [
              {
                  name: "Smt. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
              {
                  name: "Dr P Venkateswara Rao",
                  position: "VC",
                  image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Chancellor-K-V-Chowdary.jpg",
              },
          ],
            members: [
                
              {
                name: "T.Kamal Kumar",
                position: "BHEL",
                image: "/images/bhelr1.jpg",
              },
              {
                name: "Mr. A. Satyanarayana",
                position: "Avantel",
                image: "/images/r1.jpg",
              },
              {
                name: "Mr.",
                position: "HCL",
                image: "/images/hclr1.jpg",
              },
              {
                name: "Mr. Jitender Singh",
                position: "CTS",
                image: "/images/ctsr1.jpg",
              },
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "PEGA",
                image: "/images/pegar1.jpg",
              },
            ],
          },
      },
      {
        time: "11:00 AM - 1:00 PM",
        title: "Paper Presentations",
        description: [
          "Parallel Session I",
           "Parallel Session II",
            "Parallel Session III",
           "Parallel Session IV",
        ],
      },
      {
        time: "1:00 PM - 02:30 PM",
        title: "Connections and Conversations: Lunch",
        description: [
          "Venue: Impact Center, 4th floor, VL Dutt Block",
        ],
      },
      {
        time: "02:30 PM - 05:00 PM",
        title: "Paper Presentations",
        description: [
          "Parallel Session I",
           "Parallel Session II",
            "Parallel Session III",
           "Parallel Session IV",
        ],
      },
      {
        time: "05:00 PM - 07:00 PM",
        title: "Cultural Programs",
      },
  ],
  day2: [
    {
      time: "09:30 AM - 11:00 AM",
      title: "Paper Presentations",
      description: [
        "Parallel Session I",
        "Parallel Session II",
        "Parallel Session III",
        "Parallel Session IV",
      ],
    },
    {
      time: "11:00 AM - 11:30 AM",
      title: "High Tea",
    },
    {
      time: "11:30 AM – 01:30 PM",
      title: "Paper Presentations",
      description: [
        "Parallel Session I",
        "Parallel Session II",
        "Parallel Session III",
        "Parallel Session IV",
      ],
    },
    {
        time: "01:30 PM - 02:30 PM",
        title: "Lunch Venue: Impact Center, 4th floor, VL Dutt Block",
      },
    {
      time: "03:00 PM - 04:00 PM",
      title: "Prize Distribution followed by Valedictory",
    },
  ],
};

const Schedule = () => {
    const [activeTab, setActiveTab] = useState("day1");
    const [expandedSessions, setExpandedSessions] = useState({});
  
    const toggleSession = (index) => {
      setExpandedSessions((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [index]: !prev[activeTab]?.[index],
        },
      }));
    };
  
    const isExpanded = (index) =>
      expandedSessions[activeTab]?.[index] ?? false;
  
    const renderSchedule = (dayData) => {
      return dayData.map((session, index) => (
        <div key={index} className="border-b border-gray-300 py-4 flex md:flex-row flex-col items-start">
          <div className="md:w-1/5 w-full text-sm lg:text-lg text-[#604CC3]/95 font-semibold">
            {session.time}
          </div>
          <div className="md:w-4/5 w-full">
            <div className="flex items-center justify-between">
              <div
                className="lg:text-lg text-base font-semibold text-gray-800 cursor-pointer"
                onClick={() => toggleSession(index)}
              >
                {session.title}
              </div>
              {session.description && (
                <button
                  className="cursor-pointer"
                  onClick={() => toggleSession(index)}
                >
                  {isExpanded(index) ? "🔼" : "🔽"}
                </button>
              )}
            </div>
            <div
            className={`${
              isExpanded(index)
                ? "max-h-full opacity-100"
                : "max-h-0 opacity-0"
            } transition-all duration-500 ease-in-out`}
          >
            {isExpanded(index) && session.description && (
              <div className="mt-2 bg-gray-100 p-4 rounded-md">
                {session.description.length > 1 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {session.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{session.description[0]}</p>
                )}
                {session.panelMembers && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Moderators:
                    </h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {session.panelMembers.moderators.map((moderator, i) => (
                        <div key={i} className="">
                          <div className="flex items-center mb-4">
                            <img
                              src={moderator.image}
                              alt={moderator.name}
                              className="w-20 h-20 rounded-full mr-4"
                            />
                            <div className="flex flex-col">
                              <div className="lg:text-lg text-md font-medium">
                                {moderator.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {moderator.position}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Panel Members:
                    </h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {session.panelMembers.members.map((member, i) => (
                        <div key={i} className="">
                          <div className="flex items-center mb-4">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 rounded-full mr-4"
                            />
                            <div className="flex flex-col">
                              <div className="lg:text-lg text-md font-medium">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {member.position}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      ));
    };
  
    return (
      <div className="relative font-SUSE min-h-screen max-w-screen mt-44 md:mt-60">
        <div className="pb-5">
          <div
            className="bg-[#604CC3]/25 bg-opacity-20 p-8 lg:mt-0 mt-52 rounded-lg mx-6 transition-opacity duration-1000 "
          >
            <h1 className="text-4xl  font-bold text-center text-[#604CC3]">
              Schedule
            </h1>
          </div>
          <div className="lg:max-w-7xl max-w-screen mx-auto p-6">
            <div className="flex space-x-4 border-b border-gray-300 mb-4">
              <button
                className={`px-4 py-2 font-medium text-gray-800 ${
                  activeTab === "day1"
                    ? "text-lg font-semibold border-b-4 border-[#604CC3]"
                    : ""
                }`}
                onClick={() => setActiveTab("day1")}
              >
                Day 1
              </button>
              <button
                className={`px-4 py-2 font-medium text-gray-800 ${
                  activeTab === "day2"
                    ? "text-lg font-semibold border-b-4 border-[#604CC3]"
                    : ""
                }`}
                onClick={() => setActiveTab("day2")}
              >
                Day 2
              </button>
            </div>
            {activeTab === "day1" && renderSchedule(scheduleData.day1)}
            {activeTab === "day2" && renderSchedule(scheduleData.day2)}
          </div>
        </div>
      </div>
    );
  };
  
  export default Schedule;
  
