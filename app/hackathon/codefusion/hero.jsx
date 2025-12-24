'use client';
import { useEffect, useRef } from 'react';

const CodeFusionHero = () => {
  const canvasRef = useRef(null);

  /* ================= BACKGROUND PARTICLES ================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    const dpr = window.devicePixelRatio || 1;
    const particles = [];
    let COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Adjust particle count based on screen size
      if (window.innerWidth < 640) COUNT = 30;
      else if (window.innerWidth < 1024) COUNT = 45;
      else COUNT = 60;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = Math.random() * 2 + 0.5;
        this.vy = Math.random() * 0.15 + 0.05;
        this.a = Math.random() * 0.18 + 0.05;
      }
      update() {
        this.y -= this.vy;
        if (this.y < -10) this.y = window.innerHeight + 10;
      }
      draw() {
        ctx.fillStyle = `rgba(12, 74, 110, ${this.a})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  const title = "CODEFUSION";

  return (
    <section className="relative w-full min-h-[100vh] sm:min-h-[80vh] md:h-[70vh] bg-white overflow-hidden flex flex-col items-center justify-center font-serif px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-0">

      {/* BACKGROUND PARTICLES */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      />

      {/* TITLE */}
      <h1 className="relative z-10 flex flex-wrap justify-center dark-blue-title text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none text-center">
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="blue-letter"
            style={{ animationDelay: `${i * 0.14}s` }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* DATE */}
      <p
        className="relative z-20 mt-8 sm:mt-12 md:mt-20 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] sm:tracking-[0.25em] text-[#0c4a6e] animate-fade-in-long text-center"
        style={{ animationDelay: "2s" }}
      >
        JANUARY&nbsp;23–24,&nbsp;2026
      </p>

      {/* DIVIDER */}
      <div
        className="relative z-20 w-32 sm:w-40 md:w-48 h-[2px] bg-[#0ea5e9] mt-6 sm:mt-8 md:mt-10 opacity-60"
        style={{ animationDelay: "2.4s" }}
      />

      {/* ORGANISER INFO */}
      <div
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 flex flex-col items-center text-[#475569] animate-org-wrapper px-4"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        <p
          className="text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.18em] animate-org-line-1 text-center mb-3 sm:mb-4 md:mb-5"
        >
          ORGANISED BY RESEARCH &amp; DEVELOPMENT CELL
        </p>

        <p
          className="text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.18em] animate-org-line-2 text-center"
        >
          DEPARTMENTS OF IT &amp; CSE
        </p>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .dark-blue-title {
          perspective: 1500px;
        }

        /* ===== ORGANISER TEXT ANIMATION ===== */
        .animate-org-wrapper {
          overflow: hidden;
        }

        .animate-org-line-1,
        .animate-org-line-2 {
          opacity: 0;
          transform: translateY(14px);
          animation: orgReveal 1.6s ease-out forwards;
        }

        /* Staggered timing */
        .animate-org-line-1 {
          animation-delay: 2.6s;
        }

        .animate-org-line-2 {
          animation-delay: 3.0s;
        }

        @keyframes orgReveal {
          to {
            opacity: 0.85;
            transform: translateY(0);
          }
        }

        .blue-letter {
          position: relative;
          display: inline-block;
          margin: 0 0.02em;
          opacity: 0;
          transform: translateY(48px) rotateX(-85deg);
          filter: blur(8px);
          animation:
            heavyRise 1.3s cubic-bezier(0.19, 1, 0.22, 1) forwards,
            liquidFlow 8s ease-in-out infinite;

          background: linear-gradient(
            to bottom,
            #0ea5e9 0%,
            #0c4a6e 50%,
            #082f49 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          text-shadow: 0 4px 8px rgba(12, 74, 110, 0.18);
        }

        @media (min-width: 640px) {
          .blue-letter {
            margin: 0 0.035em;
            text-shadow: 0 6px 12px rgba(12, 74, 110, 0.18);
          }
        }

        @media (min-width: 1024px) {
          .blue-letter {
            margin: 0 0.045em;
            text-shadow: 0 8px 16px rgba(12, 74, 110, 0.18);
          }
        }

        @keyframes heavyRise {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0);
          }
        }

        @keyframes liquidFlow {
          0%, 100% { background-position: 50% 0%; }
          50% { background-position: 50% 100%; }
        }

        .animate-fade-in-long {
          opacity: 0;
          transform: translateY(14px);
          animation: slowFade 1.8s ease-out forwards;
        }

        .animate-reveal-text-long {
          opacity: 0;
          animation: slowReveal 2.2s ease-out forwards;
        }

        @keyframes slowFade {
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        @keyframes slowReveal {
          to {
            opacity: 0.75;
          }
        }

        /* Extra small devices */
        @media (max-width: 374px) {
          .blue-letter {
            transform: translateY(32px) rotateX(-85deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CodeFusionHero;