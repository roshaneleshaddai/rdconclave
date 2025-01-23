'use client';
import React, { useState } from "react";

// Data structure for schedule details
const scheduleData = {
  day1: [
    // {
    //   time: "08:30 AM",
    //   title: "Registration – Admin Block",
    // },
    // {
    //   time: "09:30 AM - 11:00 AM",
    //   title: "Inauguration – Auditorium",
    //   description: {
    //     // mainContent: "Panel discussion title and details with an overview of the topic and speakers.",
    //     keyPoints: [
          
    //       "Dr. M. Suneetha, Dean - Research, Technology & Development and IQAC, Professor & HoD-IT",
    //       "Dr. A. V. Ratna Prasad, Pro Vice Chancellor",
    //       "Dr. P. Venkateswara Rao, Vice Chancellor",
    //       "Sri M Rajaiah (President),SAGTE",
    //       "Sri P. Lakshmana Rao(Secretary), SAGTE",
    //       "Mrs. Padmaja Sriram, AT&T (Guest of Honor)",
    //       "Mr. Sarada Prasanna Satapathy, Pegasystems (Guest of Honor)",
    //       "Mr. M S R Murthy, Tata Consultancy Services (Guest of Honor)",
    //       "Mr.Suresh Babu B, HCL Technologies (Guest of Honor)",
    //       "Mr. M. Srinivas Reddy, TechMahindra(Guest of Honor)",
    //       "Mr. Jitender Singh, Cognizant Technology Solutions (Guest of Honor)",
    //       "Sri. Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh (Chief Guest)",
    //       "Sri. Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh (Chief Guest)",
    //       "Sri. Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh (Chief Guest)",
    //       "Sri. Yalamanchili Satyanarayana Chowdary, MLA West, AP (Chief Guest)	Ms. Ameena ",
              
    //     ],
    //   },
    // },
    {
        time: "08:30 AM",
        title: "Registration – Admin Block",
      },
      {
        "time": "09:30 AM – 09:35 AM",
        "title": "Inauguration: Welcome",
        "description": {
          "mainContent": "Welcome by Ms Ameena to start the event.",
          
        }
      },
      {
        "time": "09:35 AM – 09:40 AM",
        "title": "Invocation Dance",
        "description": {
          "mainContent": "Dance performance by R Sidvila Bhargavi.",
          
        }
      },
      {
        "time": "09:40 AM – 09:45 AM",
        "title": "Inviting Dignitaries onto the Dias",
        "description": {
          "mainContent": "Ms Ameena invites dignitaries onto the dais.",
          "keyPoints": [
            "Dr. M. Suneetha, Dean - Research, Technology & Development and IQAC, Professor & HoD-IT",
            "Dr. A. V. Ratna Prasad, Pro Vice Chancellor",
            "Dr. P. Venkateswara Rao, Vice Chancellor",
            "Dr. k. V. Chowdary, Chancellor",
            "Sri P. Lakshmana Rao, Secretary, SAGTE",
            "Sri M. Rajaiah, President, SAGTE",
            "Guest of Honor : ",
            // "Mrs. Padmaja Sriram, AT&T",
            
            "Mr. Sarada Prasanna Satapathy, Pegasystems",
            "Mr. M S R Murthy, Tata Consultancy Services",
            "Mr. Suresh Babu B, HCL Technologies",
            "Mr. M. Srinivas Reddy, Tech Mahindra",
            "Mr. Jitender Singh, Cognizant Technology Solutions",
            "Mr. A. Siddharth, Director at Avantel Limited & imeds Private Limited & Co-Founder of Simply Science",
            "Sri Shariff Mohammed Ahmed, Adviser (Minority Affairs), Government of Andhra Pradesh, Former Chairperson of Andhra Pradesh Legislative Council",
            "Chief Guest : ",
            // "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh (Chief Guest)",
            "Sri. Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
            // "Sri. Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh (Chief Guest)",
            // "Sri. Yalamanchili Satyanarayana Chowdary, MLA West, AP (Chief Guest)",
            // "Sri. Bode Prasad, MLA, Penamaluru"
          ]
        }
      },
      {
        "time": "09:45 AM – 09:50 AM",
        "title": "Lighting the Lamp",
        "description": {
          "mainContent": "Traditional lighting of the lamp ceremony.",
          
        }
      },
      {
        "time": "09:50 AM – 09:55 AM",
        "title": "Prayer Song",
        "description": {
          "mainContent": "Prayer song by G. Gayatri Srivatsala and P Renuka.",
          
        }
      },
      {
        "time": "09:55 AM – 10:00 AM",
        "title": "Opening Remarks by Convenor : Dr. M. Suneetha, Dean - Research, Technology & Development and IQAC, Professor and HoD-IT",
        // "description": {
        //   "mainContent": "Dr. M. Suneetha, Dean - Research, Technology & Development and IQAC, Professor and HoD-IT, delivers the opening remarks.",
          
        // }
      },
      {
        "time": "10:00 AM – 10:05 AM",
        "title": "Speech by Dr. A. V. Ratna Prasad, Pro Vice Chancellor.",
        // "description": {
        //   "mainContent": "Speech by Dr. A. V. Ratna Prasad, Pro Vice Chancellor.",
          
        // }
      },
      {
        "time": "10:05 AM – 10:10 AM",
        "title": "Speech by Dr. P. Venkateswara Rao, Vice Chancellor.",
        // "description": {
        //   "mainContent": "Speech by Dr. P. Venkateswara Rao, Vice Chancellor.",
          
        // }
      },
      {
        "time": "10:10 AM – 10:15 AM",
        "title": "Speech by Sri Shariff Mohammed Ahmed, Adviser (Minority Affairs), Government of Andhra Pradesh, Former Chairperson of Andhra Pradesh Legislative Council.",
        // "description": {
          // "mainContent": "Sri Shariff Mohammed Ahmed, Former Adviser (Minority Affairs), Government of Andhra Pradesh Legislative Council.",
          
        // }
      },
      {
        "time": "10:15 AM – 10:20 AM",
        "title": "Speech by Mr. Sarada Prasanna Satapathy, Director Global University Academic Programs, PEGA, Hyderabad",
        // "description": {
          // "mainContent": "Speech by Mr. Sarada Prasanna Satapathy, Pegasystems.",
          
        // }
      },
      {
        "time": "10:20 AM – 10:25 AM",
        "title": "Speech by Mr. M S R Murthy, Tata Consultancy Services, Hyderabad",
        // "description": {
          // "mainContent": "Speech by Mr. M S R Murthy, Tata Consultancy Services.",
          
        // }
      },
      {
        "time": "10:25 AM – 10:30 AM",
        "title": "Speech by Mr. Suresh Babu B, Deputy General Manager, AP, HCL Technologies.",
        // "description": {
          // "mainContent": "Speech by Mr. Suresh Babu B, HCL Technologies.",
          
        // }
      },
      {
        "time": "10:30 AM – 10:35 AM",
        "title": "Speech by Mr. V. Srinivas Reddy, Central Sourcing & Recruitment Manager, TechMahindra, Vijayawada",
        // "description": {
          // "mainContent": "Speech by Mr. M. Srinivas Reddy, Tech Mahindra.",
          
        // }
      },
      {
        "time": "10:35 AM – 10:40 AM",
        "title": "Speech by Mr. Jitender Singh, HR Manager-Campus Recruitment, Cognizant Technology Solutions",
        // "description": {
          // "mainContent": "Speech by Mr. Jitender Singh, Cognizant Technology Solutions.",
          // "keyPoints": [
          //   "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh",
          //   "Sri Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
          //   "Sri Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh",
          //   "Sri Yalamanchili Satyanarayana Chowdary, MLA West, AP"
          // ]
        // }
      },
      {
        "time": "10:40 AM – 10:45 AM",
        "title": "Speech by Mr. Siddharth Abburi, Director, Avantel & IMEDS Private Limited, Vijayawada",
        // "description": {
          // "mainContent": "Speech by Mr. Sidhharth Abburi.",
          // "keyPoints": [
          //   "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh",
          //   "Sri Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
          //   "Sri Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh",
          //   "Sri Yalamanchili Satyanarayana Chowdary, MLA West, AP"
          // ]
        // }
      },
      {
        "time": "10:45 AM – 10:50 AM",
        "title": "Speech by Sri. Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
        // "description": {
          // "mainContent": "Speech by Sri. Gottipati Ravi Kumar",
          // "keyPoints": [
          //   "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh",
          //   "Sri Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
          //   "Sri Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh",
          //   "Sri Yalamanchili Satyanarayana Chowdary, MLA West, AP"
          // ]
        // }
      },
      {
        "time": "10:50 AM – 10:55 AM",
        "title": "Felicitation of Chief Guest",
        // "description": {
          // "mainContent": "Speech by Sri. Gottipati Ravi Kumar",
          // "keyPoints": [
          //   "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh",
          //   "Sri Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
          //   "Sri Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh",
          //   "Sri Yalamanchili Satyanarayana Chowdary, MLA West, AP"
          // ]
        // }
      },
      {
        "time": "10:55 AM – 11:00 AM",
        "title": "Vote of Thanks (by Dr.T.Anuradha, Controller of Examination, Professor,Dept of IT), National Anthem(Janaganamana)",
        // "description": {
          // "mainContent": "Speech by Sri. Gottipati Ravi Kumar",
          // "keyPoints": [
          //   "Sri Anagani Satya Prasad, Minister for Revenue, Registration and Stamps of Andhra Pradesh",
          //   "Sri Gottipati Ravi Kumar, Minister of Energy of Andhra Pradesh",
          //   "Sri Nadendla Manohar, Minister of Civil Supplies, Food & Consumer Affairs of Andhra Pradesh",
          //   "Sri Yalamanchili Satyanarayana Chowdary, MLA West, AP"
          // ]
        // }
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
          brief:"Dr.M.Suneetha, Professor & Head, IT Dept, Dean R & D, SAHE",
        },
      panelMembers: {
          moderators: [
            // {
            //     name: "Mrs. Padmaja Sriram",
            //     position: "Regional Leader Talent Acquisition - APAC",
            //   company: "AT&T, Hyderabad",
            //     image: "/images/attr1.jpg",
            // },
            
            
            {
                  name: "Professor P Venkateswara Rao",
                  position: "Vice Chancellor",
              company: "SAHE",
                  image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
              },
        ],
          members: [
            {
              name: "Mr. Raghavendra Kulkarni",
              position: "Project Manager",
              company: "Cognizant Technology Solutions, Bengaluru",
              image: "/images/ctsr2.jpg",
            },
            {
              name: "Mr. M. Veeran",
              position: "Head Sales & Marketing",
              company: "Power Lab Instruments Chennai",
              image: "/images/powerlabr1.jpg",
            },
            {
              name: "Mr. V. Srinivas Reddy",
              position: "Central Sourcing & Recruitment Manager",
              company: "Tech Mahindra",
              image: "/images/techmr1.jpg",
            },
            {
              name: "Mr. T. Kamal Kumar",
              position: "Deputy General Manager ",
              company: "Bharat Heavy Electricals Limited",
              image: "/images/bhelr1.jpg",
            },
            {
              name: "Smt. V. Prathyusha",
              position: "Lead Consultant",
            company: "Transcendence, Vijayawada",
              image: "/images/transdencer1.jpg",
            },
            // {
            //   name: "Mr. D. Anvesh",
            //   position: "Executive Manager ",
            //   company: "Efftronics Systems Private Limited, Vijayawada",
            //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSll-TKqI55i7SHUuUH0xabUol3dB_a7Z9c7w&s",
            // },
            // {
            //   name: "Mr. Raghavendra Kulkarni",
            //   position: "",
              // company: "Cognizant Technology Solutions",
            //   image: "/images/ctsr2.jpg",
            // },
            
          ],
          Academicians:[
            {
              name:"Dr. P. V. R. L. Narasimham",
              position: "Professor & Head, EEE Department, Dean- Examinination & Evaluation",
              company:"",
              image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/Dean-Examinination-Evaluation.jpg",
            },
            {
              name:"Dr. N. Vijaya Sai",
              position: "Professor & Head",
            company:"ME Department",
              image:"/images/mehod.png",
            },
            {
              name:"Dr. A. Sreeram",
              position: "Professor & Head, Department of Business Management",
              company:"",
              image:"/images/bmhod.jpg",
            },
            
            // {
            //   name:"Dr. B. Raghava Rao",
            //   position: "Professor, Dean Academics ",
            //   company:"",
            //   image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/Dean-Academics.jpg",
            // },
            // {
            //   name:"CSE/IT",
            //   position: "",
            //   company:"",
            //   image:"",
            // }
          
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
      //             position: "",
              // company: "AT&T",
      //             image: "/images/attr1.jpg",
      //         },
             
      //         // {
      //         //     name: "Dr A V Ratna Prasad",
      //         //     position: "",
              // company: "Pro VC",
      //         //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
      //         // },
      //     ],
      //       members: [
      //         {
      //           name: "Mr. MSR Murthy",
      //           position: "",
              // company: "Tata Consultancy Services",
      //           image: "/images/tcsr1.jpg",
      //         },
      //         {
      //           name: "Mr. Jitender Singh",
      //           position: "",
              // company: "Cognizant Technology Solutions",
      //           image: "/images/ctsr1.jpg",
      //         },
      //         {
      //           name: "Mr. A. Siddharth",
      //           position: "Director",
              // company: "Avantel",
      //           image: "https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM",
      //         },
      //         {
      //           name: "Smt. V. Prathyusha",
      //           position: "",
              // company: "Transdence",
      //           image: "/images/transdencer1.jpg",
      //         },
      //         {
      //           name: "S. Suresh Babu",
      //           position: "",
              // company: "Ramesh's Aerospace Products & Services Private Limited",
      //           image: "/images/rapsr1.jpg",
      //         },
              
      //         // {
      //         //   name: "Mr. Sarada Prasanna Satapathy ",
      //         //   position: "",
              // company: "Pegasystems",
      //         //   image: "/images/pegar1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr. Chaitanya Vetcham",
      //         //   position: "",
              // company: "Verizon",
      //         //   image: "/images/verizonr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr.K. Abhinav",
      //         //   position: "",
              // company: "Pi Data Center",
      //         //   image: "/images/pidatacr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr.M. Veeran",
      //         //   position: "",
              // company: "Power Labs-Chennai",
      //         //   image: "/images/powerlabr1.jpg",
      //         // },
      //         // {
      //         //   name: "Mr Raghavendra Kulkarni",
      //         //   position: "",
              // company: "Cognizant Technology Solutions",
      //         //   image: "/images/ctsr2.jpg",
      //         // },
      //       ],
      //       Academicians:[
      //         {
      //           name:"CSE/IT",
      //           position: "",
              // company:"",
      //           image:"",
      //         },
      //         {
      //           name:"EEE/ECE",
      //           position: "",
              // company:"",
      //           image:"",
      //         },
      //         {
      //           name:"CE",
      //           position: "",
              // company:"",
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
        brief:"Dr.M.Suneetha, Professor & Head, IT Dept, Dean R & D, SAHE",
        },
        panelMembers: {
            moderators: [
              {
                name:"Dr. A. V. Ratna Prasad",
                position: "Pro-Vice Chancellor",
              company:" SAHE, Deemed to be University",
                image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              },

              // {
              //     name: "Mrs. Padmaja Sriram",
              //     position: "Regional Leader Talent Acquisition - APAC",
              // company: "AT&T, Hyderabad",
              //     image: "/images/attr1.jpg",
              // },
             
              // {
              //     name: "Dr P Venkateswara Rao",
              //     position: "",
              // company: "VC",
              //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
              // },
          ],
            members: [
              {
                name: "Mr. M S R Murthy",
                position: "Senior Consultant",
                company: "Tata Consultancy Services, Hyderabad",
                image: "/images/tcsr1.jpg",
              },
              {
                name:"Mr. Jitender Singh",
                position: "HR Management Campus Recuritment",
              company:"Cognizant Technology Solutions",
                image: "/images/ctsr1.jpg",
              },
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "Director Global University Academic Programs ",
              company: "Pegasystems, Hyderabad",
                image: "/images/pegar1.jpg",
              },
              {
                name: "Mr. A. Siddharth",
                position: "Director at Avantel Limited & imeds Private Limited & Co-Founder of Simply Science",
              company: "Vijayawada",
                image: "https://media.licdn.com/dms/image/v2/C5603AQGRNthkb1Rv3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565795305597?e=2147483647&v=beta&t=J8Zi9Pc8VYuWL-4Bn4QIlaqEbJyzYNTJ3OlibtA_-uM",
              },
              {
                name: "Smt. V. Prathyusha",
                position: "Lead Consultant",
              company: "Transcendence, Vijayawada",
                image: "/images/transdencer1.jpg",
              },
              // {
              //   name:"Mr. S. Suresh Babu(RAPS) Pvt.Ltd.",
              //   position: "Senior General Manager Finance",
              // company:"Roots Group of companies, Coimbatore, Tamilnadu",
              //   image: "https://media.licdn.com/dms/image/v2/D5603AQEAwDIP8sEbJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695015686962?e=1743033600&v=beta&t=OStz4q4hGm2cenN1zJB4r0MDI8UlPuLtX8m3pzIbmP0",
              // },
             
              // {
              //   name: "Mr. MSR Murthy",
              //   position: "",
              // company: "Tata Consultancy Services",
              //   image: "/images/tcsr1.jpg",
              // },
              // {
              //   name: "Mr.M. Srinivas Reddy",
              //   position: "",
              // company: "Tech Mahindra",
              //   image: "/images/techmr1.jpg",
              // },
              // {
              //   name: "Dr Krishna Kanth G Avalur",
              //   position: "Sr. Manager",
              // company: "AMS SemiConductors India Pvt Ltd",
              //   image: "/images/amsr1.jpg",
              // },
              // {
              //   name: "Smt. V. Prathyusha",
              //   position: "",
              // company: "Transdence",
              //   image: "/images/transdencer1.jpg",
              // },
              // {
              //   name: "D. Harsha Vardhin",
              //   position: "",
              // company: "Jesvid Cryo Technologies Private Limited",
              //   image: "/images/jesvidr1.jpg",
              // },
            ],
            Academicians:[
              {
                name:"Dr. M. Suneetha",
                position: "Professor & Head, IT Dept, Dean Research, Technology Development & IQAC",
              company:"",
                image:"/images/HODIT.jpg",
              },
              // {
              //   name:"Dr. A. V. Ratna Prasad",
              //   position: "Pro-Vice Chancellor",
              // company:" SAHE, Deemed to be University",
              //   image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              // },
              {
                name:"Dr. M. V. S. Raju",
                position: "Professor, CE Department, Former Dean R & D, IQAC Coordinator",
              company:"",
                image:"https://media.licdn.com/dms/image/v2/D5603AQF040ocMVpJpg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666001632558?e=2147483647&v=beta&t=WTVtYaXxlLQXsiO1jrF2vGbHEc3ExE_8q-pSMQ5okjQ",
              },
              {
              name:"Dr. B. Raghava Rao",
              position: "Professor, Dean Academics ",
              company:"",
              image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/Dean-Academics.jpg",
            },
            // {
            //   name:"Dr. Mallikarjuna Rao",
            //   position: "Professor",
            // company:"CE Department",
            //   image:"/images/ceprof.jpg",
            // },
              // {
              //   name:"CE",
              //   position: "",
              // company:"",
              //   image:"",
              // },
            
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
        brief:"E.Laxmi Lydia, Professor, IT Department",
        },
        panelMembers: {
            moderators: [
              {
                name: "Mr.Suresh Babu B",
                position: "Deputy General Manager",
              company: "HCL Technologies, Vijayawada",
                image: "https://media.licdn.com/dms/image/v2/C4D03AQG5RNA9gS4D7Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1640257477049?e=1743033600&v=beta&t=lhDcXwxqHd7jfjU6g226g0F-v194CbHRjVfBrGGxsdk",
              },
              
              // {
              //     name: "Mrs. Padmaja Sriram",
              //     position: "Regional Leader Talent Acquisition - APAC",
              // company: "AT&T, Hyderabad",
              //     image: "/images/attr1.jpg",
              // },
          //     {
          //         name: "Dr P Venkateswara Rao",
          //         position: "",
              // company: "VC",
          //         image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/Vice-Chancellor-PV-Rao.jpg",
          //     },
          ],
            members: [
                
              {
                name: "Srinivas KVNDS",
                position: "Vice President & Delivery Head for Healthcare practice",
              company: "Persistent Systems, Chennai",
                image: "https://media.licdn.com/dms/image/v2/C5103AQFWY6CyX1u-eA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1579412585714?e=1743033600&v=beta&t=kEEVymxyTAT-zcZE4c_fN75DzdguwA7Ps3TjaLYTPBw",
              },
              // {
              //   name: "Mr.Suresh Babu B",
              //   position: "Deputy General Manager",
              // company: "HCL Technologies, Vijayawada",
              //   image: "https://media.licdn.com/dms/image/v2/C4D03AQG5RNA9gS4D7Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1640257477049?e=1743033600&v=beta&t=lhDcXwxqHd7jfjU6g226g0F-v194CbHRjVfBrGGxsdk",
              // },
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "Director Global University Academic Programs ",
              company: "Pegasystems, Hyderabad",
                image: "/images/pegar1.jpg",
              },
              {
                name: "Mr. Chaitanya Vetcham",
                position: "HR Professional, HR Generalist, Campus Relations Onboarding Speclist",
              company: "Verizon, Hyderabad",
                image: "/images/verizonr1.jpg",
              },
              {
                name: "Mr. K. Abhinav",
                position: "Director & Chief Data Center Delivery Officer",
              company: "Pi DataCenters, Vijayawada",
                image: "/images/pidatacr1.jpg",
              },
              {
                name: "Mr. Rajesh Damerla",
                position: "CEO",
              company: "DLK Megamart Pvt Ltd, Bengaluru, Karnataka.",
                image: "https://media.licdn.com/dms/image/v2/C4E03AQHfAUYDFePjMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1598515829195?e=2147483647&v=beta&t=vZWFACgYTekTSC6gktvjaHnnYFX_x60cCwYMA5le21I",
              },
            ],
            Academicians:[
              {
                name:"Dr. D. Rajeswara Rao",
                position: "Professor & Head, CSE Department, Dean- Industry Relations, Training & Placements",
              company:"",
                image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/Dean-Industry-Relations-Training-Placements.jpg",
              },
              {
                name:"Dr. G. Narasimha Swamy",
                position: "Professor & Head, EIE Department, Dean- Student Affairs & Admissions",
              company:"",
                image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/Dean-Student-Affairs-Admissions.jpg",
              },
              {
                name:"Dr. A. Vittaleswar",
                position: "Professor, Dean of Schools of Management, Law, Sciences, Arts, and Commerce (MLSAC)",
              company:"",
                image:"https://media.licdn.com/dms/image/v2/D5603AQHSAzpf5VnN1g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722163183553?e=1743033600&v=beta&t=VgTNrmbYVge55wJ8PEx6Rk2OtBXVII412iD1M2lYr_c",
              },
              // {
              //   name:"CSE/IT",
              //   position: "",
              // company:"",
              //   image:"",
              // },
            
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
        brief:"E.Laxmi Lydia, Professor, IT Department",
        },
        panelMembers: {
            moderators: [
              {
                name: "Mr. M S R Murthy",
                position: "Senior Consultant",
                company: "Tata Consultancy Services, Hyderabad",
                image: "/images/tcsr1.jpg",
              },
              // {
              //     name: "Mrs. Padmaja Sriram",
              //     position: "Regional Leader Talent Acquisition - APAC",
              // company: "AT&T, Hyderabad",
              //     image: "/images/attr1.jpg",
              // },
              
              // {
              //     name: "Dr A V Ratna Prasad",
              //     position: "",
              // company: "Pro VC",
              //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
              // },
          ],
            members: [
              {
                name: "Mr. Sarada Prasanna Satapathy ",
                position: "Director Global University Academic Programs ",
              company: "Pegasystems, Hyderabad",
                image: "/images/pegar1.jpg",
              },
              {
                  name: "Dr Krishna Kanth G Avalur",
                  position: "",
              company: "Director R&D @ams OSRAM & Founder @ MOSart Labs, Hyderabad",
                  image: "/images/amsr1.jpg",
                },
              // {
              //   name: "Mr. M S R Murthy",
              //   position: "Senior Consultant",
              //   company: "Tata Consultancy Services, Hyderabad",
              //   image: "/images/tcsr1.jpg",
              // },
              {
                name: "Mr Raghavendra Kulkarni",
                position: "Project Manager ",
              company: "Cognizant Technology Solutions, Benguluru",
                image: "/images/ctsr2.jpg",
              },
              
               {
                name: "Mr. D. Harsha Vardhin",
                position: "Project Engineer Mechanical",
              company: "Jesvid Cryo Technologies Private Limited, Vijayawada",
                image: "/images/jesvidr1.jpg",
              },
              
              // {
              //   name: "S. Suresh Babu",
              //   position: "",
              // company: "Ramesh's Aerospace Products & Services Private Limited",
              //   image: "/images/rapsr1.jpg",
              // },
              // {
              //   name: "Srinivas KVNDS",
              //   position: "",
              // company: "Cognizant Technology Solutions",
              //   image: "/images/r2.jpg",
              // },
              // {
              //   name: "Mr.M. Veeran",
              //   position: "",
              // company: "Power Labs-Chennai",
              //   image: "/images/powerlabr1.jpg",
              // },
              // {
              //   name: "Mr. Chaitanya Vetcham",
              //   position: "",
              // company: "Verizon",
              //   image: "/images/verizonr1.jpg",
              // },
              // {
              //   name: "Mr.K. Abhinav",
              //   position: "",
              // company: "Pi Data Center",
              //   image: "/images/pidatacr1.jpg",
              // },
            ],
            Academicians:[
            //   {
            //     name: "Dr A V Ratna Prasad",
            //     position: "",
            //   company: "Pro VC",
            //     image: "https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/09/principal_2024-1-275x300.jpg",
            // },
              {
                name:"Dr. D. Venkata Rao",
                position: "Professor & Head, ECE Dept, Dean- Velagapudi Ramakrishna Siddhartha School of Engineering",
              company:"",
                image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2024/10/dean-school.jpg",
              },
              {
                name:"Dr. T. Anuradha",
                position: "Professor -IT,  Controller of Examinations, SAHE",
              company:"",
                image:"https://www.vrsiddhartha.ac.in/wp-content/uploads/2019/09/anurahda-copy-300x300.jpg",
              },
              {
                name:"Dr. K. Purna Chandra Rao",
                position: "Professor & Head, Department of Computer Applications",
              company:"",
                image:"/images/mcahod.jpg",
              },
            
            ],
          },
      },
      {
        time: "11:00 AM - 01:15 PM",
        title: "Paper Presentations",
        description: {
          keyPoints: [
              "Parallel Session I",
            "Parallel Session II",
             "Parallel Session III",
            ,
          ],
        },
        
      },
      
      {
        time: "02:30 PM - 04:30 PM",
        title: "Paper Presentations",
        description: {
          keyPoints: [
               "Parallel Session I",
            "Parallel Session II",
             "Parallel Session III",
            ,
          ],
        },
      },
     {
        time: "04:30 PM - 04:40 PM",
        title: "Felicitation of Panel members",
      },
    {
        time: "04:40 PM - 04:45 PM",
        title: "Vote of thanks",
      },
      {
        time: "04:45 PM - 05:00 PM",
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
             "Parallel Session I",
          "Parallel Session II",
           "Parallel Session III",
          ,
        ],
      },
    },
    {
      time: "11:00 AM - 11:30 AM",
      title: "High Tea",
    },
    {
      time: "11:30 AM – 01:00 PM",
      title: "Paper Presentations",
      description: {
        keyPoints: [
             "Parallel Session I",
          "Parallel Session II",
           "Parallel Session III",
          ,
        ],
      },
    },
    {
        time: "01:00 PM - 02:00 PM",
        title: "Lunch",
      },
    {
      time: "02:15 PM - 03:00 PM",
      title: "Exhibition of ISRO Projects @ 246, V L Dutt Block",
    },
    {
      time: "03:00 PM - 04:00 PM",
      title: "Valedictory",
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
                    <div className="py-2"><strong>Briefing by </strong> {session.description.brief}</div>
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
                              <div className="lg:text-base text-sm text-gray-600">
                                {moderator.company}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                    )}
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Industry Experts:
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
                              <div className="lg:text-base text-sm text-gray-600">
                                {member.company}
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
                              <div className="lg:text-base text-sm text-gray-600">
                                {member.company}
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
              <button className="px-6 py-2 bg-[#604CC3] text-white rounded hover:bg-[#604CC3]/90">
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
              <button className="px-6 py-2 bg-[#604CC3] text-white rounded hover:bg-[#604CC3]/90">
                Download Offline Schedule
              </button>
            </a>
          </div>
        </div>
        </div>
      );
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
        <div>
          <DownloadSchedule/>

        </div>
      </div>
    );
  };
  
  export default Schedule;
  
