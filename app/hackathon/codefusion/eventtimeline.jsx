'use client';
import { useState, useEffect } from 'react';
import { 
  ClipboardCheck, CalendarX, Filter, 
  Megaphone, CreditCard, Hourglass, Rocket 
} from 'lucide-react';

const TimelineData = [
  { date: "DEC 29", title: "Registration Opens", icon: ClipboardCheck, desc: "Portal live for team details and Domain Selection." },
  { date: "JAN 08", title: "Registration Closes", icon: CalendarX, desc: "Final deadline; no late entries allowed." },
  { date: "JAN 11", title: "Shortlisting Round", icon: Filter, desc: "Technical evaluation by expert panels." },
  { date: "JAN 14", title: "Results Announcement", icon: Megaphone, desc: "Teams cleared for participation announced." },
  { date: "JAN 14", title: "Payment Window", icon: CreditCard, desc: "Fee submission enabled for shortlisted candidates." },
  { date: "JAN 18", title: "Payment Deadline", icon: Hourglass, desc: "Final cutoff to secure participation slots." },
  { date: "JAN 23–24", title: "Hackathon Kickoff", icon: Rocket, desc: "24-hour Kickoff & problem statements are released." },
];

const HackathonTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: '100%',
      background: '#ffffff',
      padding: '48px 16px',
      fontFamily: 'SUSE, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Section Header */}
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '96px'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          color: '#002147',
          marginBottom: '12px',
          fontFamily: 'SUSE, sans-serif'
        }}>
          Event Schedule
        </h2>
        <div style={{
          width: '96px',
          height: '4px',
          background: '#002147',
          margin: '0 auto 16px'
        }}></div>
        <p style={{
          color: '#6B7280',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '10px',
          fontWeight: '600',
          fontFamily: 'SUSE, sans-serif'
        }}>
          Academic Research & Development Conclave
        </p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        {/* Desktop/Large Tablet Horizontal Layout */}
        <div style={{
          display: isDesktop ? 'block' : 'none'
        }}>
          {/* Central Axis */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'rgba(0, 33, 71, 0.1)',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}>
            <div style={{
              height: '100%',
              background: '#002147',
              animation: 'lineFlow 1.5s ease-in-out forwards'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            minHeight: '600px',
            paddingTop: '80px',
            paddingBottom: '80px',
            gap: '20px'
          }}>
            {TimelineData.map((item, index) => {
              const isTop = index % 2 === 0;
              const Icon = item.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div key={item.date + index} style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  minHeight: '300px'
                }}>
                  {/* Central Node with Date */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #002147',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#002147',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    boxShadow: '0 2px 8px rgba(0, 33, 71, 0.1)',
                    zIndex: 30,
                    whiteSpace: 'nowrap',
                    padding: '0 8px',
                    fontFamily: 'SUSE, sans-serif',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    {item.date}
                  </div>

                  {/* Alternating Content Card */}
                  <div 
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      width: '220px',
                      padding: '24px',
                      background: isHovered ? '#002147' : '#ffffff',
                      border: '2px solid #002147',
                      borderRadius: '12px',
                      boxShadow: isHovered ? '0 4px 16px rgba(0, 33, 71, 0.2)' : '0 2px 8px rgba(0, 33, 71, 0.08)',
                      top: isTop ? '-64px' : 'auto',
                      bottom: isTop ? 'auto' : '-64px',
                      animation: `${isTop ? 'fadeInDown' : 'fadeInUp'} 0.5s ease-out forwards`,
                      animationDelay: `${0.1 * index}s`,
                      opacity: 0,
                      transition: 'all 0.3s ease-in-out',
                      transform: isHovered 
                        ? `scale(1.05)` 
                        : 'scale(1)',
                      zIndex: isHovered ? 50 : 20,
                      cursor: 'pointer'
                    }}
                  >
                    {/* Directional Arrow */}
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      ...(isTop ? {
                        borderTop: `10px solid ${isHovered ? '#002147' : '#002147'}`,
                        bottom: '-10px'
                      } : {
                        borderBottom: `10px solid ${isHovered ? '#002147' : '#002147'}`,
                        top: '-10px'
                      })
                    }} />

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      borderBottom: `1.5px solid ${isHovered ? '#ffffff' : 'rgba(0, 33, 71, 0.15)'}`,
                      paddingBottom: '10px'
                    }}>
                      <Icon 
                        size={20} 
                        style={{ 
                          color: isHovered ? '#ffffff' : '#002147', 
                          flexShrink: 0 
                        }} 
                        strokeWidth={2} 
                      />
                      <h3 style={{
                        color: isHovered ? '#ffffff' : '#002147',
                        fontWeight: '700',
                        fontSize: '15px',
                        textTransform: 'uppercase',
                        lineHeight: '1.2',
                        fontFamily: 'SUSE, sans-serif'
                      }}>
                        {item.title}
                      </h3>
                    </div>
                    <p style={{
                      color: isHovered ? '#ffffff' : '#6B7280',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      fontFamily: 'SUSE, sans-serif'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Layout */}
        <div style={{
          display: isDesktop ? 'none' : 'flex',
          flexDirection: 'column',
          gap: '32px',
          position: 'relative',
          paddingLeft: '40px'
        }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '19px',
            top: 0,
            height: '100%',
            width: '2px',
            background: 'rgba(0, 33, 71, 0.2)',
            zIndex: 0
          }} />

          {TimelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.date + index} style={{
                position: 'relative'
              }}>
                {/* Date Node */}
                <div style={{
                  position: 'absolute',
                  left: '-60px',
                  top: '0px',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '3px solid #002147',
                  background: '#ffffff',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#002147',
                  fontWeight: '700',
                  fontSize: '10px',
                  whiteSpace: 'nowrap',
                  padding: '0 4px',
                  fontFamily: 'SUSE, sans-serif',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 33, 71, 0.1)'
                }}>
                  {item.date}
                </div>
                {/* Content Box */}
                <div style={{
                  background: '#ffffff',
                  border: '2px solid rgba(0, 33, 71, 0.15)',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 33, 71, 0.08)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#002147';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 33, 71, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 33, 71, 0.15)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 33, 71, 0.08)';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '10px'
                  }}>
                    <Icon size={20} style={{ color: '#002147' }} strokeWidth={2} />
                  </div>
                  <h3 style={{
                    color: '#002147',
                    fontWeight: '700',
                    fontSize: '16px',
                    marginBottom: '8px',
                    fontFamily: 'SUSE, sans-serif'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#6B7280',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    fontFamily: 'SUSE, sans-serif'
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes lineFlow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HackathonTimeline;