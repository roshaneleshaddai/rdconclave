'use client';
import { useState, useEffect } from 'react';
import { Users, DollarSign, Coffee, MapPin } from 'lucide-react';

const EventRegistration = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const handleRegisterClick = () => {
    window.location.href = '/hackathon/codefusion/register';
  };

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
          width: '105px',
          height: '105px',
          marginBottom: '12px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#ffffff',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(26, 43, 74, 0.08)'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#1a2b4a',
              fontFamily: '"Times New Roman", Times, serif'
            }}>
              {String(value).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.8px',
          color: '#64748b',
          textTransform: 'capitalize',
          fontFamily: '"Times New Roman", Times, serif'
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
          border: '2px solid ' + (isHovered ? '#cbd5e1' : '#e2e8f0'),
          borderRadius: '16px',
          padding: '26px 24px',
          boxShadow: isHovered ? '0 12px 32px rgba(26, 43, 74, 0.12)' : '0 3px 10px rgba(26, 43, 74, 0.06)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '125px',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '18px',
          height: '100%'
        }}>
          <div style={{
            flexShrink: 0,
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: isHovered 
              ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
              : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.08) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}>
            <Icon style={{ width: '24px', height: '24px', color: '#1a2b4a' }} strokeWidth={2} />
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{
              fontSize: '17px',
              fontWeight: '700',
              color: '#1a2b4a',
              marginBottom: '6px',
              lineHeight: '1.3',
              fontFamily: '"Times New Roman", Times, serif'
            }}>
              {title}
            </h3>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              lineHeight: '1.5',
              fontWeight: '500',
              fontFamily: '"Times New Roman", Times, serif'
            }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: '50px 20px',
      fontFamily: '"Times New Roman", Times, serif'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#1a2b4a',
            letterSpacing: '-0.5px',
            fontFamily: '"Times New Roman", Times, serif'
          }}>
            Event Starts In
          </h1>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '45px',
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
          marginBottom: '50px'
        }}>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleRegisterClick}
              style={{
                position: 'relative',
                padding: '18px 56px',
                fontSize: '20px',
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
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 35px rgba(124, 58, 237, 0.45), 0 6px 18px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.35), 0 4px 12px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(124, 58, 237, 0.4), 0 3px 10px rgba(124, 58, 237, 0.3)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 35px rgba(124, 58, 237, 0.45), 0 6px 18px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
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
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
          gap: '18px',
          maxWidth: '950px',
          margin: '0 auto'
        }}>
          <InfoCard 
            icon={Users}
            title="Team Size"
            description="3–4 Members per Team"
          />
          <InfoCard 
            icon={DollarSign}
            title="Registration Fee"
            description="₹500 per Team"
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