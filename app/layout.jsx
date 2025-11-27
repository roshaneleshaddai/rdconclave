
//import { useEffect, useState } from "react";
//import StartPage from "./components/startpage/page";
import Footer from './components/footer/page';
import Header from './components/header/page';
import './globals.css';

export const metadata = {
 title: "Research Conclave@SAHE",
 description: "A new Millennium",
 };

export default function RootLayout({ children }) {
  return (
  <html lang="en">
   <head>        <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
       </head>
     <body className="min-h-screen flex flex-col justify-between">
         <Header />
         <main>{children}</main>
        <Footer />
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
