
//import { useEffect, useState } from "react";
//import StartPage from "./components/startpage/page";
"use client";

import { useEffect, useState } from "react";
import Footer from './components/footer/page';
import Header from './components/header/page';
import './globals.css';

export default function RootLayout({ children }) {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Listen for quiz state changes
    const handleQuizStart = () => setIsQuizActive(true);
    const handleQuizEnd = () => setIsQuizActive(false);

    window.addEventListener('quiz-started', handleQuizStart);
    window.addEventListener('quiz-ended', handleQuizEnd);

    return () => {
      window.removeEventListener('quiz-started', handleQuizStart);
      window.removeEventListener('quiz-ended', handleQuizEnd);
    };
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <head>
          <title>Research Conclave@SAHE</title>
          <meta name="description" content="A new Millennium" />
        </head>
        <body className="min-h-screen flex flex-col justify-between">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Research Conclave@SAHE</title>
        <meta name="description" content="A new Millennium" />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        {!isQuizActive && <Header />}
        <main className="flex-1">{children}</main>
        {!isQuizActive && <Footer />}
      </body>
    </html>
  );
}

 // const [showStartPage, setShowStartPage] = useState(false);

  //useEffect(() => {
    // Check local storage to see if the user has already visited   const hasVisited = localStorage.getItem("hasVisited");
   // if (!hasVisited) {
  //    setShowStartPage(true); // Show StartPage if not visited
//}
//  }, []);

//  const handleLaunch = () => {
//    setShowStartPage(false); 
    // Mark as visited in localStorage
//    localStorage.setItem("hasVisited", "true");
//  };

//  return (
//    <html lang="en">
//      <body  className="min-h-screen flex flex-col justify-between ">
//        {showStartPage ? (
//          <StartPage onLaunch={handleLaunch} />
//        ) : 
// <>
//            <Header />
//            <main className="">{children}</main>
//            <Footer />
//          </>
//        )}
//      </body>
//    </html>
//  );
//}
