'use client';
import { useState } from 'react';
import { ArrowLeft, Users, GraduationCap, Send, CheckCircle } from 'lucide-react';

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '3',
    problemStatement: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCollege: '',
    leaderDepartment: '',
    leaderYear: '',
    member2Name: '',
    member2Email: '',
    member2Phone: '',
    member3Name: '',
    member3Email: '',
    member3Phone: '',
    member4Name: '',
    member4Email: '',
    member4Phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        teamName: '',
        teamSize: '3',
        problemStatement: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        leaderCollege: '',
        leaderDepartment: '',
        leaderYear: '',
        member2Name: '',
        member2Email: '',
        member2Phone: '',
        member3Name: '',
        member3Email: '',
        member3Phone: '',
        member4Name: '',
        member4Email: '',
        member4Phone: ''
      });
    }, 3000);
  };

  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: '226px 16px 48px 16px',
      fontFamily: 'SUSE, sans-serif'
    }}>
      {/* Header with Back Button */}
      <div style={{
        maxWidth: '896px',
        margin: '0 auto 32px'
      }}>
        <button
          onClick={handleBackClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#002147',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '24px',
            fontFamily: 'SUSE, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#002147'}
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'SUSE, sans-serif',
            fontSize: '40px',
            fontWeight: '700',
            color: '#002147',
            marginBottom: '12px'
          }}>
            Team Registration
          </h1>
          <div style={{
            width: '96px',
            height: '4px',
            background: '#002147',
            margin: '0 auto 16px'
          }}></div>
          <p style={{
            fontFamily: 'SUSE, sans-serif',
            fontSize: '18px',
            color: '#6B7280',
            fontStyle: 'italic'
          }}>
            Academic Research & Development Conclave • CodeFusion 2025
          </p>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div style={{
          maxWidth: '896px',
          margin: '0 auto 32px',
          background: '#f0fdf4',
          border: '2px solid #22c55e',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <CheckCircle size={32} style={{ color: '#22c55e', flexShrink: 0 }} />
          <div>
            <h3 style={{
              fontFamily: 'SUSE, sans-serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#166534',
              marginBottom: '4px'
            }}>
              Registration Successful!
            </h3>
            <p style={{
              fontFamily: 'SUSE, sans-serif',
              color: '#15803d'
            }}>
              Your team has been registered. Check your email for confirmation details.
            </p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          border: '2px solid rgba(0, 33, 71, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 33, 71, 0.1)',
          padding: '48px'
        }}>
          
          {/* Team Details Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#002147',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{
                fontFamily: 'SUSE, sans-serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147'
              }}>
                Team Information
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '24px'
            }}>
              <div style={{ gridColumn: window.innerWidth >= 768 ? 'span 2' : 'span 1' }}>
                <label style={{
                  fontFamily: 'SUSE, sans-serif',
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#002147',
                  marginBottom: '8px'
                }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: 'SUSE, sans-serif',
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    border: '2px solid rgba(0, 33, 71, 0.2)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  placeholder="Enter your team name"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#002147';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'SUSE, sans-serif',
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#002147',
                  marginBottom: '8px'
                }}>
                  Team Size *
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: 'SUSE, sans-serif',
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    border: '2px solid rgba(0, 33, 71, 0.2)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#002147';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="3">3 Members</option>
                  <option value="4">4 Members</option>
                </select>
              </div>

              <div>
                <label style={{
                  fontFamily: 'SUSE, sans-serif',
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#002147',
                  marginBottom: '8px'
                }}>
                  Problem Statement *
                </label>
                <select
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: 'SUSE, sans-serif',
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    border: '2px solid rgba(0, 33, 71, 0.2)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#002147';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select Problem Statement</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="blockchain">Blockchain Technology</option>
                  <option value="iot">Internet of Things</option>
                  <option value="healthcare">Healthcare Innovation</option>
                  <option value="education">Education Tech</option>
                  <option value="sustainability">Sustainability</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Leader Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#002147',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{
                fontFamily: 'SUSE, sans-serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147'
              }}>
                Team Leader Details
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '24px'
            }}>
              {[
                { name: 'leaderName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
                { name: 'leaderEmail', label: 'Email Address', type: 'email', placeholder: 'student@university.edu' },
                { name: 'leaderPhone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                { name: 'leaderCollege', label: 'College/Institution', type: 'text', placeholder: 'Enter institution name' },
                { name: 'leaderDepartment', label: 'Department', type: 'text', placeholder: 'e.g., Computer Science' }
              ].map((field) => (
                <div key={field.name}>
                  <label style={{
                    fontFamily: 'SUSE, sans-serif',
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#002147',
                    marginBottom: '8px'
                  }}>
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={{
                      fontFamily: 'SUSE, sans-serif',
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      border: '2px solid rgba(0, 33, 71, 0.2)',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    placeholder={field.placeholder}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#002147';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  fontFamily: 'SUSE, sans-serif',
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#002147',
                  marginBottom: '8px'
                }}>
                  Year of Study *
                </label>
                <select
                  name="leaderYear"
                  value={formData.leaderYear}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: 'SUSE, sans-serif',
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    border: '2px solid rgba(0, 33, 71, 0.2)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#002147';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#002147',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={20} style={{ color: '#ffffff' }} />
              </div>
              <h2 style={{
                fontFamily: 'SUSE, sans-serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147'
              }}>
                Team Members
              </h2>
            </div>

            {/* Member 2 */}
            <MemberSection
              memberNum="2"
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Member 3 */}
            <MemberSection
              memberNum="3"
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Member 4 (Optional) */}
            {formData.teamSize === '4' && (
              <MemberSection
                memberNum="4"
                formData={formData}
                handleInputChange={handleInputChange}
                optional={true}
              />
            )}
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSubmit}
              style={{
                fontFamily: 'SUSE, sans-serif',
                padding: '16px 48px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                background: 'linear-gradient(to right, #7c3aed, #6b21a8)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #6b21a8, #5b21b6)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed, #6b21a8)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span>Submit Registration</span>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Helper component for member sections
const MemberSection = ({ memberNum, formData, handleInputChange, optional = false }) => {
  const fields = [
    { name: `member${memberNum}Name`, placeholder: 'Full Name' },
    { name: `member${memberNum}Email`, placeholder: 'Email Address', type: 'email' },
    { name: `member${memberNum}Phone`, placeholder: 'Phone Number', type: 'tel' }
  ];

  return (
    <div style={{
      marginBottom: '24px',
      padding: '24px',
      background: 'rgba(0, 33, 71, 0.03)',
      borderRadius: '12px',
      border: '2px solid rgba(0, 33, 71, 0.1)'
    }}>
      <h3 style={{
        fontFamily: 'SUSE, sans-serif',
        fontSize: '18px',
        fontWeight: '700',
        color: '#002147',
        marginBottom: '16px'
      }}>
        Member {memberNum} {optional ? '(Optional)' : '*'}
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : '1fr',
        gap: '16px'
      }}>
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            style={{
              fontFamily: 'SUSE, sans-serif',
              height: '48px',
              padding: '0 16px',
              border: '2px solid rgba(0, 33, 71, 0.2)',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.3s',
              background: '#ffffff'
            }}
            placeholder={field.placeholder}
            onFocus={(e) => {
              e.target.style.borderColor = '#002147';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 33, 71, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 33, 71, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RegistrationForm;