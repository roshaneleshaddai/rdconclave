'use client'
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function StartPage({ onLaunch }) {
  const typedTextRef = useRef(null);

  useEffect(() => {
    // Initialize the typed effect
    const options = {
      strings: ["Celebrating 50 Years of Excellence!", "Research Conclave 2026", "Innovate, Integrate, Inspire!"],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true,
      backDelay: 500,
    };

    const typed = new Typed(typedTextRef.current, options);

    // Clean up the typed instance on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="fullscreen-container">
      {/* Background video */}
      <video className="background-video" autoPlay muted loop>
        <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="overlay-content">
        <h1 className="welcome-text">
          <span ref={typedTextRef}></span>
        </h1>

        <button className="launch-btn" onClick={onLaunch}>
          Launch Website
        </button>
      </div>

      <style jsx>{`
        .fullscreen-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }

        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .overlay-content {
          z-index: 2;
          text-align: center;
          color: white;
        }

        .welcome-text {
          font-size: 5rem;
          margin-bottom: 20px;
        }

        .launch-btn {
          padding: 10px 20px;
          font-size: 1.2rem;
          background-color: white;
          color: black;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .launch-btn:hover {
          background-color: #002147;
          color:white;
          font-weight:bold;
        }
      `}</style>
    </div>
  );
}
