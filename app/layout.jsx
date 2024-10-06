'use client';
import { useEffect, useState } from "react";
import StartPage from "./components/startpage/page";
import Footer from './components/footer/page';
import Header from './components/header/page';

export default function RootLayout({ children }) {
  const [showStartPage, setShowStartPage] = useState(false);

  useEffect(() => {
    // Check local storage to see if the user has already visited
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowStartPage(true); // Show StartPage if not visited
    }
  }, []);

  const handleLaunch = () => {
    setShowStartPage(false); 
    // Mark as visited in localStorage
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <html lang="en">
      <body>
            <Header />
            <main>{children}</main>
            <Footer />
      </body>
    </html>
  );
}
