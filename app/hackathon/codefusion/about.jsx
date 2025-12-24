'use client';
import { useState, useEffect } from 'react';
import { Users, Coffee, MapPin, IndianRupee } from 'lucide-react';

const EventRegistration = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleRegisterClick = () => {
    window.location.href = '/hackathon/codefusion/register';
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-01-23T00:00:00+05:30');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const CountdownUnit = ({ value, label }) => (
    <div style={{ perspective: '1000px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          position: 'relative',
          width: isMobile ? '75px' : '105px',
          height: isMobile ? '75px' : '105px',
          marginBottom: '12px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 33, 71, 0.05)',
            border: '2px solid #002147',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 33, 71, 0.08)'
          }}>
            <span style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              color: '#002147',
              fontFamily: 'SUSE, sans-serif'
            }}>
              {String(value).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div style={{
          fontSize: isMobile ? '11px' : '13px',
          fontWeight: '600',
          letterSpacing: '0.8px',
          color: '#6B7280',
          textTransform: 'capitalize',
          fontFamily: 'SUSE, sans-serif'
        }}>
          {label}
        </div>
      </div>
    </div>
  );

  const InfoCard = ({ icon: Icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: '#ffffff',
          border: '2px solid ' + (isHovered ? '#002147' : '#e2e8f0'),
          borderRadius: '16px',
          padding: isMobile ? '20px 16px' : '26px 24px',
          boxShadow: isHovered ? '0 12px 32px rgba(0, 33, 71, 0.12)' : '0 3px 10px rgba(0, 33, 71, 0.06)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: isMobile ? 'auto' : '125px',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: isMobile ? '12px' : '18px',
          height: '100%',
          flexDirection: isMobile ? 'row' : 'row'
        }}>
          <div style={{
            flexShrink: 0,
            width: isMobile ? '44px' : '52px',
            height: isMobile ? '44px' : '52px',
            borderRadius: '12px',
            background: isHovered 
              ? 'rgba(0, 33, 71, 0.15)'
              : 'rgba(0, 33, 71, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.08) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}>
            <Icon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#002147' }} strokeWidth={2} />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{
              fontSize: isMobile ? '15px' : '17px',
              fontWeight: '700',
              color: '#002147',
              marginBottom: '6px',
              lineHeight: '1.3',
              fontFamily: 'SUSE, sans-serif'
            }}>
              {title}
            </h3>
            <p style={{
              fontSize: isMobile ? '13px' : '14.5px',
              color: '#6B7280',
              lineHeight: '1.5',
              fontWeight: '500',
              fontFamily: 'SUSE, sans-serif'
            }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shine {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }
      
      .register-button-shine::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
        animation: shine 2s infinite;
      }

      @media (max-width: 768px) {
        .register-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: isMobile ? '30px 16px' : '50px 20px',
      fontFamily: 'SUSE, sans-serif'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '30px' : '40px'
        }}>
          <h1 style={{
            fontSize: isMobile ? '28px' : '42px',
            fontWeight: '700',
            color: '#002147',
            letterSpacing: '-0.5px',
            fontFamily: 'SUSE, sans-serif',
            lineHeight: '1.2'
          }}>
            Event Starts In
          </h1>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '8px' : '16px',
          marginBottom: isMobile ? '35px' : '45px',
          flexWrap: 'wrap'
        }}>
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: isMobile ? '40px' : '50px',
          padding: isMobile ? '0 10px' : '0'
        }}>
          <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}>
            <button 
              onClick={handleRegisterClick}
              className="register-button-shine register-button"
              style={{
                position: 'relative',
                padding: isMobile ? '16px 32px' : '18px 56px',
                width: isMobile ? '100%' : 'auto',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '700',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #6b21a8 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35), 0 4px 12px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                fontFamily: '"Times New Roman", Times, serif'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 14px 35px rgba(124, 58, 237, 0.45), 0 6px 18px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.35), 0 4px 12px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseDown={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(124, 58, 237, 0.4), 0 3px 10px rgba(124, 58, 237, 0.3)';
                }
              }}
              onMouseUp={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 14px 35px rgba(124, 58, 237, 0.45), 0 6px 18px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                Register Now
              </span>
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '14px' : '18px',
          maxWidth: '950px',
          margin: '0 auto'
        }}>
          <InfoCard 
            icon={Users}
            title="Team Size"
            description="3–4 Members per Team"
          />
          <InfoCard 
            icon={IndianRupee}
            title="Registration Fee"
            description="₹300 per Person"
          />
          <InfoCard 
            icon={Coffee}
            title="Food & Refreshments"
            description="Food & Snacks Provided"
          />
          <InfoCard 
            icon={MapPin}
            title="Venue"
            description="Siddhartha Academy of Higher Education, Vijayawada"
          />
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;