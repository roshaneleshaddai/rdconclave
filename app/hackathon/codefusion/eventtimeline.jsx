'use client';
import { useState } from 'react';
import { 
  ClipboardCheck, CalendarX, Filter, 
  Megaphone, CreditCard, Hourglass, Rocket 
} from 'lucide-react';

const TimelineData = [
  { date: "DEC 25", title: "Registration Opens", icon: ClipboardCheck, desc: "Portal live for team details and problem statements." },
  { date: "JAN 08", title: "Registration Closes", icon: CalendarX, desc: "Final deadline; no late entries allowed." },
  { date: "JAN 09", title: "Shortlisting Round", icon: Filter, desc: "Technical evaluation by expert panels." },
  { date: "JAN 10", title: "Results Announcement", icon: Megaphone, desc: "Teams cleared for participation announced." },
  { date: "JAN 10", title: "Payment Window", icon: CreditCard, desc: "Fee submission enabled for shortlisted candidates." },
  { date: "JAN 13", title: "Payment Deadline", icon: Hourglass, desc: "Final cutoff to secure participation slots." },
  { date: "JAN 23–24", title: "Hackathon Kickoff", icon: Rocket, desc: "24-hour innovation sprint and technical demos." },
];

const HackathonTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{
      width: '100%',
      background: '#ffffff',
      padding: '48px 16px',
      fontFamily: 'serif',
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
          fontWeight: 'bold',
          color: '#0B3C5D',
          marginBottom: '12px'
        }}>
          Event Schedule
        </h2>
        <div style={{
          width: '96px',
          height: '4px',
          background: '#0B3C5D',
          margin: '0 auto 16px'
        }}></div>
        <p style={{
          color: '#4A6FA5',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '10px',
          fontWeight: '600'
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
          display: window.innerWidth >= 1024 ? 'block' : 'none'
        }}>
          {/* Central Axis */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'rgba(11, 60, 93, 0.1)',
            transform: 'translateY(-50%)'
          }}>
            <div style={{
              height: '100%',
              background: '#0B3C5D',
              animation: 'lineFlow 1.5s ease-in-out forwards'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            minHeight: '450px'
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
                  flex: 1
                }}>
                  {/* Central Node with Date */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid #0B3C5D',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B3C5D',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    zIndex: 30,
                    whiteSpace: 'nowrap',
                    padding: '0 8px'
                  }}>
                    {item.date}
                  </div>

                  {/* Alternating Content Card */}
                  <div 
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      width: '192px',
                      padding: '16px',
                      background: isHovered ? '#0B3C5D' : '#ffffff',
                      border: '1.5px solid #0B3C5D',
                      borderRadius: '8px',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      top: isTop ? '-140px' : 'auto',
                      bottom: isTop ? 'auto' : '-140px',
                      animation: `${isTop ? 'fadeInDown' : 'fadeInUp'} 0.5s ease-out forwards`,
                      animationDelay: `${0.1 * index}s`,
                      opacity: 0,
                      transition: 'all 0.3s ease-in-out',
                      transform: isHovered 
                        ? `translateY(${isTop ? -5 : 5}px) scale(1.02)` 
                        : 'translateY(0) scale(1)',
                      zIndex: isHovered ? 50 : 1,
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
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      ...(isTop ? {
                        borderTop: `8px solid ${isHovered ? '#0B3C5D' : '#0B3C5D'}`,
                        bottom: '-8px'
                      } : {
                        borderBottom: `8px solid ${isHovered ? '#0B3C5D' : '#0B3C5D'}`,
                        top: '-8px'
                      })
                    }} />

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      borderBottom: `1px solid ${isHovered ? '#ffffff' : 'rgba(11, 60, 93, 0.1)'}`,
                      paddingBottom: '8px'
                    }}>
                      <Icon 
                        size={18} 
                        style={{ 
                          color: isHovered ? '#ffffff' : '#0B3C5D', 
                          flexShrink: 0 
                        }} 
                        strokeWidth={2} 
                      />
                      <h3 style={{
                        color: isHovered ? '#ffffff' : '#0B3C5D',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        lineHeight: '1.2'
                      }}>
                        {item.title}
                      </h3>
                    </div>
                    <p style={{
                      color: isHovered ? '#ffffff' : '#4A6FA5',
                      fontSize: '14px',
                      lineHeight: '1.4'
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
          display: window.innerWidth < 1024 ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '32px',
          position: 'relative'
        }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: 0,
            height: '100%',
            width: '2px',
            background: 'rgba(11, 60, 93, 0.2)'
          }} />

          {TimelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.date + index} style={{
                position: 'relative',
                paddingLeft: '64px'
              }}>
                {/* Date Node */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #0B3C5D',
                  background: '#ffffff',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B3C5D',
                  fontWeight: 'bold',
                  fontSize: '9px',
                  whiteSpace: 'nowrap',
                  padding: '0 4px'
                }}>
                  {item.date}
                </div>
                {/* Content Box */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0B3C5D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '8px'
                  }}>
                    <Icon size={18} style={{ color: '#0B3C5D' }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    color: '#0B3C5D',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginBottom: '4px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#4A6FA5',
                    fontSize: '14px',
                    lineHeight: '1.5'
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