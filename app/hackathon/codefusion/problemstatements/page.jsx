"use client";

import { useState } from "react";
import { 
  Brain, 
  Code, 
  Blocks, 
  Shield, 
  Leaf, 
  Satellite,
  Download
} from "lucide-react";

export default function HackathonTracksPage() {
  const [downloadingTrack, setDownloadingTrack] = useState(null);

  // Track configuration - Easy to update PDF paths
  const tracks = [
    {
      id: 1,
      title: "AI Agents & Systems",
      icon: Brain,
      pdfPath: "/ps/AS.pdf"
    },
    {
      id: 2,
      title: "Web Development",
      icon: Code,
      pdfPath: "/ps/WD.pdf"
    },
    {
      id: 3,
      title: "Web 3.0",
      icon: Blocks,
      pdfPath: "/ps/W3.pdf"
    },
    {
      id: 4,
      title: "Cyber Security",
      icon: Shield,
      pdfPath: "/ps/CS.pdf"
    },
    {
      id: 5,
      title: "Sustainability",
      icon: Leaf,
      pdfPath: "/ps/ST.pdf"
    },
    {
      id: 6,
      title: "Remote Sensing",
      icon: Satellite,
      pdfPath: "/ps/RS.pdf"
    }
  ];

  // Handle PDF download with visual feedback
  const handleDownload = (track) => {
    setDownloadingTrack(track.id);
    
    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = track.pdfPath;
    link.download = `${track.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset downloading state after animation
    setTimeout(() => {
      setDownloadingTrack(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 pt-32 md:pt-40">
      {/* Main Container - Centered */}
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002147] tracking-tight mb-3">
            Hackathon Tracks
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium">
            Choose your domain and download the problem statement
          </p>
        </div>

        {/* Tracks Grid - Perfectly Centered Card */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border-2 border-[#002147] p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tracks.map((track) => {
              const IconComponent = track.icon;
              const isDownloading = downloadingTrack === track.id;
              
              return (
                <button
                  key={track.id}
                  onClick={() => handleDownload(track)}
                  disabled={isDownloading}
                  className={`
                    group relative overflow-hidden
                    bg-white border-2 border-[#002147]
                    rounded-lg md:rounded-xl p-5 md:p-6
                    transform transition-all duration-300
                    hover:scale-105 hover:shadow-xl hover:bg-[#002147]
                    focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#002147]
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${isDownloading ? 'animate-pulse bg-[#002147]' : ''}
                  `}
                  aria-label={`Download ${track.title} problem statement`}
                >
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3 md:space-y-4">
                    {/* Icon */}
                    <div className={`p-3 md:p-4 bg-[#00214710] rounded-full border-2 border-[#002147] group-hover:bg-white transition-all duration-300 ${isDownloading ? 'bg-white' : ''}`}>
                      <IconComponent className={`w-8 h-8 md:w-10 md:h-10 text-[#002147] transition-colors ${isDownloading ? 'text-[#002147]' : ''}`} strokeWidth={2.5} />
                    </div>

                    {/* Title */}
                    <h3 className={`text-base md:text-lg font-bold text-[#002147] group-hover:text-white leading-tight min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center transition-colors ${isDownloading ? 'text-white' : ''}`}>
                      {track.title}
                    </h3>

                    {/* Download Indicator */}
                    <div className={`flex items-center gap-2 text-[#002147] group-hover:text-white text-xs md:text-sm font-semibold transition-colors ${isDownloading ? 'text-white' : ''}`}>
                      <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : 'group-hover:animate-bounce'}`} />
                      <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info Footer */}
          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t-2 border-gray-200">
            <p className="text-center text-xs md:text-sm text-gray-600 font-medium">
              💡 Click on any track to download its problem statement PDF
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 md:mt-8 text-center px-4">
          <p className="text-xs text-gray-500">
            Questions? Contact us at{" "}
            <a href="mailto:support@hackathon.com" className="text-[#002147] font-semibold hover:underline">
              support@hackathon.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}