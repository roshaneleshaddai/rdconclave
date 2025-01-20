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
      time: "09:30 AM - 11:00 AM",
      title: "Inauguration – Auditorium",
      description: {
        // mainContent: "Panel discussion title and details with an overview of the topic and speakers.",
        keyPoints: [
          
          "Dr. M. Suneetha, Dean - Research, Technology & Development and IQAC, Professor & HoD-IT",
          "Dr. A. V. Ratna Prasad, Pro Vice Chancellor",
          "Dr. P. Venkateswara Rao, Vice Chancellor",
          "Sri M Rajaiah (President),SAGTE",
          "Sri P. Lakshmana Rao(Secretary), SAGTE",
          "Mrs. Padmaja Sriram, AT&T (Guest of Honor)",
          "Mr. Sarada Prasanna Satapathy, PEGA (Guest of Honor)",
          "Mr. M S R Murthy, TCS (Guest of Honor)",
          "Mr.Suresh Babu B, HCL Technologies (Guest of Honor)",
          "Mr. M. Srinivas Reddy, TechMahindra(Guest of Honor)",
          "Mr. Jitender Singh, Cognizant Technology Solutions (Guest of Honor)",
          "Sri. Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh (Chief Guest)",
          "Sri. Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh (Chief Guest)",
          "Sri. Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh (Chief Guest)",
          "Sri. Yalamanchili Satyanarayana Chowdary, MLA West, AP (Chief Guest)	Ms. Ameena ",
              
        ],
      },
    },
    {
      time: "11:00 AM - 11:15 AM",
      title: "High Tea",
    },
    {
      time: "11:00 AM onwards",
      title: "TECHTREK",
      description: {
        keyPoints: [
            "24 Hour Webathon : IT Seminar Hall (Room No: 224) ",
            "24 Hour AI Hackathon : IT Lab 4 (Room No: 231)",
        ],
      },
    },
    
    {
        time: "11:15 AM – 12:15 PM",
        title: "Panel 1 Discussion – The Role of Generative AI in Redefining Creativity and Automation @Auditorium",
        description: {
          mainContent: "Exploring how generative AI is transforming industries like content creation, design, and automation, and its ethical and societal impacts.",
          keyPoints: [
              "Redefining Creativity with Generative AI : How AI tools are transforming industries like content creation, design, and media.",
              "Automation and Efficiency Gains : The role of AI in automating creative and repetitive tasks, enhancing productivity.",
              "Ethical and Intellectual Property Challenges : Addressing ownership, bias, and misinformation in AI-generated content.",
              "Human-AI Collaboration : Balancing machine-generated content with human creativity for innovative outcomes.",
              "Future Trends and Workforce Implications : Preparing for the evolving impact of AI on jobs and skill develoent.",
          ],
        },
      panelMembers: {
          moderators: [
            {
                name: "Mrs. Padmaja Sriram",
                position: "AT&T",
                image: "/images/attr1.jpg",
            },
            
            
            // {
            //     name: "Dr P Venkateswara Rao",
            //     position: "VC",
            //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
            // },
        ],
          members: [
            {
              name: "Mr. Raghavendra Kulkarni",
              position: "CTS",
              image: "/images/ctsr2.jpg",
            },
            {
              name: "Mr. M. Veeran",
              position: "Power Labs",
              image: "/images/powerlabr1.jpg",
            },
            {
              name: "Mr. M. Srinivas Reddy",
              position: "Tech Mahindra",
              image: "/images/techmr1.jpg",
            },
            {
              name: "Mr. T.Kamal Kumar",
              position: "BHEL",
              image: "/images/bhelr1.jpg",
            },
            {
              name: "Mr. D.Anvesh",
              position: "Efftronics",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSll-TKqI55i7SHUuUH0xabUol3dB_a7Z9c7w&s",
            },
            // {
            //   name: "Mr. Raghavendra Kulkarni",
            //   position: "CTS",
            //   image: "/images/ctsr2.jpg",
            // },
            
          ],
          Academicians:[
            {
              name:"EEE",
              position:"",
              image:"",
            },
            {
              name:"ME",
              position:"",
              image:"",
            },
            {
              name:"CSE/IT",
              position:"",
              image:"",
            }
          
          ],
        },
      },
      // {
      //   time: "12:15 PM – 01:15 PM",
      //   title: "Panel 2 Discussion – The Future of Sustainable Tech: IoT and AI for Green Innovation @Auditorium",
      //   description: {
      //     mainContent: "Discussing how IoT and AI technologies are driving sustainable solutions in energy management, agriculture, and smart cities.",
      //     keyPoints: [
      //         "AI and IoT in Energy Efficiency : How AI-powered IoT solutions optimize energy consumption and reduce carbon footprints in industries and buildings.",
      //         "Smart Agriculture for Sustainability : The role of IoT and AI in precision farming, water management, and reducing waste.",
      //         "Smart Cities and Sustainable Infrastructure : Using AI and IoT to create resource-efficient, eco-friendly urban environments.",
      //         "AI for Circular Economy : Leveraging AI to improve recycling, waste management, and product lifecycle in sustainable tech.",
      //         "Challenges and Future Trends : Addressing scalability, regulatory hurdles, and the potential impact of emerging technologies on green innovation.",
      //     ],
      // },
      //   panelMembers: {
      //       moderators: [
      //         {
      //             name: "Smt. Padmaja Sriram",
      //             position: "AT&T",
      //             image: "/images/attr1.jpg",
      //         },
             
      //         // {
      //         //     name: "Dr A V Ratna Prasad",
      //         //     position: "Pro VC",
      //         //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
      //         // },
      //     ],
      //       members: [
      //         {
      //           name: "Mr. MSR Murthy",
      //           position: "TCS",
      //           image: "/images/tcsr1.jpg",
      //         },
      //         {
      //           name: "Mr. Jitender Singh",
      //           position: "CTS",
      //           image: "/images/ctsr1.jpg",
      //         },
      //         {
      //           name: "Mr. A. Siddharth",
      //           position: "Avantel",
      //           image: "https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM",
      //         },
      //         {
      //           name: "Smt. V. Prathyusha",
      //           position: "Transdence",
      //           image: "/images/transdencer1.jpg",
      //         },
      //         {
      //           name: "S. Suresh Babu",
      //           position: "RAPS",
      //           image: "/images/rapsr1.jpg",
      //         },
              
      //         // {
      //         //   name: "Mr. Sarada Prasanna Satapathy ",
      //         //   position: "PEGA",
      //         //   image: "/images/pegar1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr. Chaitanya Vetcham",
      //         //   position: "Verizon",
      //         //   image: "/images/verizonr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr.K. Abhinav",
      //         //   position: "Pi Data Center",
      //         //   image: "/images/pidatacr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr.M. Veeran",
      //         //   position: "Power Labs",
      //         //   image: "/images/powerlabr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr Raghavendra Kulkarni",
      //         //   position: "CTS",
      //         //   image: "/images/ctsr2.jpg",
      //         // },
      //       ],
      //       Academicians:[
      //         {
      //           name:"CSE/IT",
      //           position:"",
      //           image:"",
      //         },
      //         {
      //           name:"EEE/ECE",
      //           position:"",
      //           image:"",
      //         },
      //         {
      //           name:"CIVIL",
      //           position:"",
      //           image:"",
      //         },
            
      //       ],
      //     },
      // },
      {
        time: "12:15 PM – 01:15 PM",
        title: "Panel 2 Discussion – Building the Workforce of Tomorrow: Bridging the Skills Gap in AI, Data Science, and IoT @Auditorium",
        description: {
          mainContent: "Addressing how industry and academia can collaborate to design future-ready curricula and training programs for in-demand tech skills.",
          keyPoints: [
            "Industry-Academia Collaboration : How partnerships between academia and industry can shape curricula aligned with real-world needs.",
            "Practical, Hands-On Training : Emphasizing the importance of practical experience in AI, data science, and IoT through internships, labs, and projects.",
            "Upgrading Existing Programs : Revamping academic programs to include emerging technologies and interdisciplinary learning.",
            "Reskilling the Current Workforce : Addressing the need for continuous learning and reskilling initiatives for professionals already in the field.",
            "Policy Support and Government Initiatives : Discussing the role of policies and funding to support skill development in high-demand tech areas.",
        ],
        },
        panelMembers: {
            moderators: [
              {
                  name: "Mrs. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
             
              // {
              //     name: "Dr P Venkateswara Rao",
              //     position: "VC",
              //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
              // },
          ],
            members: [
              {
                name: "Mr. M S R Murthy",
                position: "TCS",
                image: "/images/tcsr1.jpg",
              },
              {
                name:"Mr. Jitender Singh",
                position:"CTS",
                image: "/images/ctsr1.jpg",
              },
              {
                name: "Mr. A. Siddharth",
                position: "Avantel",
                image: "https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM",
              },
              {
                name: "Smt. V. Prathyusha",
                position: "Transdence",
                image: "/images/transdencer1.jpg",
              },
              {
                name:"Mr. S. Suresh Babu",
                position:"RAPS Pvt. Ltd.",
                image: "/images/rapsr1.jpg",
              },
             
              // {
              //   name: "Mr. MSR Murthy",
              //   position: "TCS",
              //   image: "/images/tcsr1.jpg",
              // },
              // {
              //   name: "Mr.M. Srinivas Reddy",
              //   position: "Tech Mahindra",
              //   image: "/images/techmr1.jpg",
              // },
              // {
              //   name: "Dr Krishna Kanth G Avuluir",
              //   position: "AMS",
              //   image: "/images/amsr1.jpg",
              // },
              // {
              //   name: "Smt. V. Prathyusha",
              //   position: "Transdence",
              //   image: "/images/transdencer1.jpg",
              // },
              // {
              //   name: "D. Harsha Vardhin",
              //   position: "Jesvid Cryo Technologies Private Limited",
              //   image: "/images/jesvidr1.jpg",
              // },
            ],
            Academicians:[
              {
                name:"CSE/IT",
                position:"",
                image:"",
              },
              {
                name:"ECE/EIE",
                position:"",
                image:"",
              },
              {
                name:"CIVIL",
                position:"",
                image:"",
              },
            
            ],
          },
      },
      {
        time: "02:30 PM – 03:30 PM",
        title: "Panel 3 Discussion – Digital Twins and the Metaverse: Opportunities for Industry and Research @Auditorium",
        description: {
          mainContent: "A deep dive into how digital twins and the metaverse are shaping virtual environments and real-time monitoring in industries like healthcare, construction, and logistics.",
          keyPoints: [
            "Digital Twins in Industry : How digital twins are revolutionizing real-time monitoring and predictive analytics in sectors like healthcare, construction, and logistics.",
            "The Role of the Metaverse : Exploring the metaverse's potential to create immersive virtual environments for training, collaboration, and product design.",
            "Integration of IoT and AI : Leveraging IoT sensors and AI to enhance the functionality and accuracy of digital twins and metaverse applications.",
            "Impact on Operations and Efficiency : How these technologies optimize operations, reduce costs, and improve decision-making in various industries.",
            "Research and Development Challenges : Discussing the technical, ethical, and regulatory challenges of implementing digital twins and the metaverse in real-world scenarios.",
        ],
        },
        panelMembers: {
            moderators: [
              {
                  name: "Mrs. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
          //     {
          //         name: "Dr P Venkateswara Rao",
          //         position: "VC",
          //         image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
          //     },
          ],
            members: [
                
              {
                name: "Srinivas KVNDS",
                position: "Persistent Systems",
                image: "/images/persisr1.jfif",
              },
              {
                name: "Mr. Rajesh Damerla",
                position: "HCL",
                image: "https://media.licdn.com/dms/image/v2/C4E03AQHfAUYDFePjMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1598515829195?e=2147483647&v=beta&t=vZWFACgYTekTSC6gktvjaHnnYFX_x60cCwYMA5le21I",
              },
              {
                name: "Mr. Chaitanya Vetcham",
                position: "Verizon",
                image: "/images/verizonr1.jpg",
              },
              {
                name: "Mr. K. Abhinav",
                position: "Pi Data Center",
                image: "/images/pidatacr1.jpg",
              },
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "PEGA",
                image: "/images/pegar1.jpg",
              },
            ],
            Academicians:[
              {
                name:"CSE/IT",
                position:"",
                image:"",
              },
              {
                name:"CSE/IT",
                position:"",
                image:"",
              },
              {
                name:"CSE/IT",
                position:"",
                image:"",
              },
            
            ],
          },
      },
      {
        time: "03:30 PM – 04:30 PM",
        title: "Panel 4 Discussion – Data Privacy and Ethical AI: Navigating Regulation and Responsibility @Auditorium",
        description: {
          mainContent: "Exploring the balance between innovation and regulation in AI, privacy laws, and responsible data usage.",
          keyPoints: [
            "Balancing Innovation and Privacy : How to foster AI innovation while ensuring data privacy and protection.",
            "Ethical AI Development : Establishing guidelines for creating AI systems that are fair, transparent, and accountable.",
            "Regulation and Compliance : Navigating the evolving landscape of global privacy laws (e.g., GDPR) and their impact on AI applications.",
            "Responsible Data Usage : Ensuring AI systems use data ethically and avoid discrimination or bias.",
            "Public Trust and Accountability : Building public confidence in AI technologies through transparency, governance, and oversight.",
        ],
        },
        panelMembers: {
            moderators: [
              {
                  name: "Smt. Padmaja Sriram",
                  position: "AT&T",
                  image: "/images/attr1.jpg",
              },
              
              // {
              //     name: "Dr A V Ratna Prasad",
              //     position: "Pro VC",
              //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              // },
          ],
            members: [
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "PEGA",
                image: "/images/pegar1.jpg",
              },
              {
                  name: "Dr Krishna Kanth G Avuluir",
                  position: "AMS",
                  image: "/images/amsr1.jpg",
                },
              {
                name: "Mr. MSR Murthy",
                position: "TCS",
                image: "/images/tcsr1.jpg",
              },
              {
                name: "Mr Raghavendra Kulkarni",
                position: "CTS",
                image: "/images/ctsr2.jpg",
              },
               {
                name: "D. Harsha Vardhin",
                position: "Jesvid Cryo Technologies Private Limited",
                image: "/images/jesvidr1.jpg",
              },
              
              // {
              //   name: "S. Suresh Babu",
              //   position: "RAPS",
              //   image: "/images/rapsr1.jpg",
              // },
              // {
              //   name: "Srinivas KVNDS",
              //   position: "CTS",
              //   image: "/images/r2.jpg",
              // },
              // {
              //   name: "Mr.M. Veeran",
              //   position: "Power Labs",
              //   image: "/images/powerlabr1.jpg",
              // },
              // {
              //   name: "Mr. Chaitanya Vetcham",
              //   position: "Verizon",
              //   image: "/images/verizonr1.jpg",
              // },
              // {
              //   name: "Mr.K. Abhinav",
              //   position: "Pi Data Center",
              //   image: "/images/pidatacr1.jpg",
              // },
            ],
            Academicians:[
              {
                name: "Dr A V Ratna Prasad",
                position: "Pro VC",
                image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
            },
              {
                name:"Dr.K.Rajeswara Rao",
                position:"Prof & Head, CSE",
                image:"/images/csehod.jpg",
              },
              {
                name:"Dr.M.Suneetha",
                position:"Prof & Head, IT Dept, Dean R & D, SAHE",
                image:"/images/HODIT.jpg",
              },
            
            ],
          },
      },
      {
        time: "11:00 AM - 01:15 PM",
        title: "Paper Presentations",
        description: {
          keyPoints: [
              "Parallel Session I @Room No-228",
            "Parallel Session II @Room No-246",
             "Parallel Session III @Room No-250",
            ,
          ],
        },
        
      },
      {
        time: "01:15 PM - 02:30 PM",
        title: "Connections and Conversations: Lunch",
        description: {
          mainContent: "Venue: Impact Center, 4th floor, VL Dutt Block",
          
        },
      },
      {
        time: "02:30 PM - 04:30 PM",
        title: "Paper Presentations",
        description: {
          keyPoints: [
               "Parallel Session I @Room No-228",
            "Parallel Session II @Room No-246",
             "Parallel Session III @Room No-250",
            ,
          ],
        },
      },
      {
        time: "04:30 PM - 05:00 PM",
        title: "High Tea",
      },
      {
        time: "05:00 PM - 06:30 PM",
        title: "Cultural Programs",
      },
      {
        time: "07:00 PM onwards",
        title: "Dinner @Auditorium",
      },
  ],
  day2: [
    {
      time: "09:30 AM - 11:00 AM",
      title: "Paper Presentations",
      description: {
        keyPoints: [
             "Parallel Session I @Room No-228",
          "Parallel Session II @Room No-246",
           "Parallel Session III @Room No-250",
          ,
        ],
      },
    },
    {
      time: "11:00 AM - 11:30 AM",
      title: "High Tea",
    },
    {
      time: "11:30 AM – 01:30 PM",
      title: "Paper Presentations",
      description: {
        keyPoints: [
             "Parallel Session I @Room No-228",
          "Parallel Session II @Room No-246",
           "Parallel Session III @Room No-250",
          ,
        ],
      },
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
          <div className="md:w-1/5 w-full text-md lg:text-lg text-[#604CC3]/95 font-semibold">
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
              isExpanded(index) ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            } transition-all duration-500 ease-in-out`}
          >
            {isExpanded(index) && session.description && (
              <div className="mt-2 bg-gray-100 p-4 rounded-md lg:text-lg text-base ">
                {/* Check and display main content if exists */}
                {session.description.mainContent && (
                  <p className="text-gray-700 text-justify px-2">{session.description.mainContent}</p>
                )}
                {/* Check and display key points if exists */}
                {session.description.keyPoints && session.description.keyPoints.length > 0 && (
                  <>
                  {session.title.includes("Panel") && (
                    <h3 className="font-semibold text-gray-800 mt-4 mb-2">
                      KEY DISCUSSION POINTS FOR THE PANEL:
                    </h3>
                  )}
                    <ul className="pl-4 pr-2 list-disc list-outside text-gray-700">
                    {session.description.keyPoints.map((point, i) => {
                      const parts = point.split(/:(.+)/); // Splits into [beforeColon, afterColon]
                      console.log(parts)
                      return (
                        <li key={i}>
                          {parts.length >= 2 ? (
                            <>
                              <span className="font-semibold">{parts[0]}:</span><span className="text-justify"> {parts[1]}</span>
                            </>
                          ) : (
                            point
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  </>
                )}
                {session.panelMembers && (
                  <div className="mt-4">
                    <div className="py-2"><strong>Briefing by </strong> Dr.M.Suneetha, Prof & Head, IT Dept, Dean R & D, SAHE</div>
                    {session.panelMembers.moderators && (
                      <div>
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
                              <div className="lg:text-base text-sm text-gray-600">
                                {moderator.position}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                    )}
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Industrialists:
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
                              <div className="lg:text-base text-sm text-gray-600">
                                {member.position}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Academicians:
                    </h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {session.panelMembers.Academicians.map((member, i) => (
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
                              <div className="lg:text-base text-sm text-gray-600">
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
      <div className="relative font-SUSE min-h-screen max-w-screen mt-48 md:mt-64">
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
  
