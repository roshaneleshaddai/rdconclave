'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, GraduationCap, Send, CheckCircle, AlertCircle, Info, Mail, MailOpen } from 'lucide-react';

// Coin Flip Loading Component
const CoinFlip = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div style={{ perspective: '1200px', width: '150px', height: '150px' }}>
          <div className="coin">
            {/* FRONT */}
            <div className="coin-face front">
              <img
                src="/rdlogo.webp"
                alt="RD Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* BACK */}
            <div className="coin-face back">
              <img
                src="/golden.png"
                alt="Golden Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-lg font-semibold text-[#002147]">
          Submitting Registration...
        </p>
      </div>

      <style jsx>{`
        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spinY 1.2s linear infinite;
        }

        @keyframes spinY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        .coin-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

const SuccessModal = ({ registrationId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={48} className="text-[#002147]" />
          </div>

          <h2 className="text-3xl font-bold text-[#002147] mb-3">
            Registration Successful
          </h2>

         

          <p className="text-gray-600 mb-6 font-semibold text-lg">
            🎉 Your team has been successfully registered for CodeFusion 2025!
          </p>

          <div className="bg-[#002147] rounded-xl p-6 mb-6">
            <p className="text-xs text-blue-100 mb-2 font-semibold tracking-widest uppercase">
              Registration ID
            </p>
            <p className="text-3xl font-bold text-white tracking-wider">
              {registrationId}
            </p>
          </div>
           <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Mail size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-green-800 font-bold text-sm mb-1">
                Check Your Email!
              </p>
              <p className="text-green-700 text-xs leading-relaxed">
                A confirmation email has been sent to your registered email address.
                <span className="block mt-1 font-bold text-red-600">
                  ⚠️ Please also check your SPAM folder.
                </span>
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Please save your registration ID for future reference. You will need it
            for event check-in and communication.
          </p>

          <button
            onClick={onClose}
            className="w-full px-8 py-4 text-lg font-bold text-white bg-[#002147] rounded-xl shadow-lg transition-all hover:bg-[#001a35] hover:scale-105 hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};



// Error Modal Component
const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={48} className="text-red-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-[#002147] mb-3">
            Registration Failed
          </h2>
          
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm leading-relaxed">
              {message}
            </p>
          </div>
          
          <p className="text-gray-600 mb-6 text-base">
            Please verify your information and try again. If the issue persists, contact our support team.
          </p>
          
          <button
            onClick={onClose}
            className="w-full px-8 py-4 text-lg font-bold text-white bg-[#002147] rounded-xl shadow-lg transition-all hover:bg-[#001a35] hover:scale-105 hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '3',
    problemStatement: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCollege: '',
    leaderCollegeOther: '',
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

  const collegeOptions = [
    'KL University – Vaddeswaram',
    'SRM University AP – Amaravati region',
    'VIT-AP University – Amaravati region',
    'Velagapudi Ramakrishna Siddhartha Engineering College – Vijayawada',
    'Siddhartha Academy of Higher Education – Vijayawada',
    'Prasad V Potluri Siddhartha Institute of Technology (PVPSIT) – Vijayawada',
    'Gudlavalleru Engineering College – Gudlavalleru',
    'Dhanekula Institute of Engineering & Technology – Vijayawada',
    'Andhra Loyola College – Vijayawada',
    'KBN College – Vijayawada',
    'NRI Institute of Technology, Agiripalli',
    'Jawaharlal Nehru Technological University Kakinada (JNTUK) – Kakinada',
    'Sri Vishnu Engineering College for Women – Bhimavaram',
    'Sir C. R. Reddy College of Engineering – Eluru',
    'Gayatri Vidya Parishad College of Engineering – Visakhapatnam',
    'lakireddy Bali Reddy College of Engineering (LBRCE)',
    'PACE Institute of Technology, Ongole',
    'RVR & JC College of Engineering – Guntur',
    'Vignan\'s Foundation for Science, Technology & Research – Guntur',
    'Vasireddy Venkatadri Institute of Technology (VVIT) – Guntur'
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
    if (!formData.problemStatement) newErrors.problemStatement = 'Problem statement is required';

    if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
    if (!formData.leaderEmail.trim()) {
      newErrors.leaderEmail = 'Leader email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.leaderEmail)) {
      newErrors.leaderEmail = 'Enter a valid email address';
    }
    if (!formData.leaderPhone.trim()) newErrors.leaderPhone = 'Leader phone is required';
    if (!formData.leaderCollege || formData.leaderCollege === '') newErrors.leaderCollege = 'College/Institution is required';
    if (formData.leaderCollege === 'Others' && !formData.leaderCollegeOther.trim()) {
      newErrors.leaderCollegeOther = 'Please enter your college name';
    }
    if (!formData.leaderDepartment.trim()) newErrors.leaderDepartment = 'Department is required';
    if (!formData.leaderYear) newErrors.leaderYear = 'Year of study is required';

    if (!formData.member2Name.trim()) newErrors.member2Name = 'Member 2 name is required';
    if (!formData.member2Email.trim()) {
      newErrors.member2Email = 'Member 2 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member2Email)) {
      newErrors.member2Email = 'Enter a valid email address';
    }
    if (!formData.member2Phone.trim()) newErrors.member2Phone = 'Member 2 phone is required';

    if (!formData.member3Name.trim()) newErrors.member3Name = 'Member 3 name is required';
    if (!formData.member3Email.trim()) {
      newErrors.member3Email = 'Member 3 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member3Email)) {
      newErrors.member3Email = 'Enter a valid email address';
    }
    if (!formData.member3Phone.trim()) newErrors.member3Phone = 'Member 3 phone is required';

    if (formData.teamSize === '4') {
      if (!formData.member4Name.trim()) newErrors.member4Name = 'Member 4 name is required';
      if (!formData.member4Email.trim()) {
        newErrors.member4Email = 'Member 4 email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member4Email)) {
        newErrors.member4Email = 'Enter a valid email address';
      }
      if (!formData.member4Phone.trim()) newErrors.member4Phone = 'Member 4 phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      teamName: '',
      teamSize: '3',
      problemStatement: '',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      leaderCollege: '',
      leaderCollegeOther: '',
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
    setErrors({});
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setRegistrationId('');
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
    setApiError('');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log('Form has errors');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const collegeValue = formData.leaderCollege === 'Others' ? formData.leaderCollegeOther : formData.leaderCollege;

      const payload = {
        teamName: formData.teamName,
        teamSize: formData.teamSize,
        problemStatement: formData.problemStatement,
        leaderName: formData.leaderName,
        leaderEmail: formData.leaderEmail,
        leaderPhone: formData.leaderPhone,
        leaderCollege: collegeValue,
        leaderDepartment: formData.leaderDepartment,
        leaderYear: formData.leaderYear,
        member2Name: formData.member2Name,
        member2Email: formData.member2Email,
        member2Phone: formData.member2Phone,
        member3Name: formData.member3Name,
        member3Email: formData.member3Email,
        member3Phone: formData.member3Phone,
        ...(formData.teamSize === '4' && {
          member4Name: formData.member4Name,
          member4Email: formData.member4Email,
          member4Phone: formData.member4Phone
        })
      };

      const response = await fetch('https://rd-backend-m7gd.onrender.com/api/teams/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRegistrationId(data.registrationId);
        setShowSuccessModal(true);
      } else {
        setApiError(data.message || 'Registration failed. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Network error. Please check your connection and try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-40 md:pt-56 pb-12 font-[SUSE,sans-serif]">
      {isLoading && <CoinFlip />}
      {showSuccessModal && <SuccessModal registrationId={registrationId} onClose={handleSuccessClose} />}
      {showErrorModal && <ErrorModal message={apiError} onClose={handleErrorClose} />}
      
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-[#002147] mb-6 font-semibold text-base hover:text-[#7c3aed] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#002147] mb-3">
            Team Registration
          </h1>
          <div className="w-24 h-1 bg-[#002147] mx-auto mb-4"></div>
          <p className="text-lg text-gray-500 italic">
            Academic Research & Development Conclave • CodeFusion 2025
          </p>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="max-w-4xl mx-auto mb-8 bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4 animate-fadeIn">
          <AlertCircle size={32} className="text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-red-800 mb-2">
              Please fill all required fields
            </h3>
            <p className="text-red-700 text-sm">
              {Object.keys(errors).length} field(s) need attention. Scroll down and fill in the marked fields.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-[#002147]/10 rounded-2xl shadow-lg p-8 md:p-12">
          
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#002147] flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#002147]">
                Team Information
              </h2>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
              <div className={isMobile ? '' : 'col-span-2'}>
                <label className="block text-base font-bold text-[#002147] mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                    errors.teamName 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                  placeholder="Enter your team name"
                />
                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
              </div>

              <div>
                <label className="block text-base font-bold text-[#002147] mb-2">
                  Team Size *
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                    errors.teamSize 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                >
                  <option value="3">3 Members</option>
                  <option value="4">4 Members</option>
                </select>
                {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
              </div>

              <div>
                <label className="block text-base font-bold text-[#002147] mb-2">
                  Problem Statement *
                </label>
                <select
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                    errors.problemStatement 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                >
                  <option value="">Select Problem Statement</option>
                  <option value="AI Agents &systems">AI-Powered Agents & Autonomous Systems</option>
                  <option value="web Dev">Next-Gen Full-Stack Web Development</option>
                  <option value="Web 3.0">WEB 3.0 decentralised applications</option>
                  <option value="Remote sensing">Remote Sensing & Geographic Information System</option>
                  <option value="cybersecurity">Cyber Security and Privacy</option>
                  <option value="sustainability">Sustainability and Green Tech</option>
                  <option value="Open Innovation">Open Innovation</option>
                </select>
                {errors.problemStatement && <p className="text-red-500 text-sm mt-1">{errors.problemStatement}</p>}
                
                {formData.problemStatement === 'Open Innovation' && (
                  <div className="bg-blue-50 border-2 border-blue-900 rounded-lg p-3 flex items-start gap-2 animate-fadeIn mt-2 w-max">
                    <Info size={18} className="text-blue-900 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-900 font-semibold">
                      Limited slots available for this track.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#002147] flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#002147]">
                Team Leader Details
              </h2>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
              {[
                { name: 'leaderName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
                { name: 'leaderEmail', label: 'Email Address', type: 'email', placeholder: 'student@university.edu' },
                { name: 'leaderPhone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                { name: 'leaderDepartment', label: 'Department', type: 'text', placeholder: 'e.g., Computer Science' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-base font-bold text-[#002147] mb-2">
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                      errors[field.name] 
                        ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                        : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                    }`}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                </div>
              ))}

              <div className={isMobile ? '' : 'col-span-2'}>
                <label className="block text-base font-bold text-[#002147] mb-2">
                  College/Institution *
                </label>
                <select
                  name="leaderCollege"
                  value={formData.leaderCollege}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                    errors.leaderCollege 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                >
                  <option value="">Select College/Institution</option>
                  {collegeOptions.map((college) => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                  <option value="Others">Others</option>
                </select>
                {errors.leaderCollege && <p className="text-red-500 text-sm mt-1">{errors.leaderCollege}</p>}
              </div>

              {formData.leaderCollege === 'Others' && (
                <div className={isMobile ? '' : 'col-span-2'}>
                  <label className="block text-base font-bold text-[#002147] mb-2">
                    Enter Your College/Institution Name *
                  </label>
                  <input
                    type="text"
                    name="leaderCollegeOther"
                    value={formData.leaderCollegeOther}
                    onChange={handleInputChange}
                    className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                      errors.leaderCollegeOther 
                        ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                        : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                    }`}
                    placeholder="Enter your college/institution name"
                  />
                  {errors.leaderCollegeOther && <p className="text-red-500 text-sm mt-1">{errors.leaderCollegeOther}</p>}
                </div>
              )}

              <div>
                <label className="block text-base font-bold text-[#002147] mb-2">
                  Year of Study *
                </label>
                <select
                  name="leaderYear"
                  value={formData.leaderYear}
                  onChange={handleInputChange}
                  className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                    errors.leaderYear 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {errors.leaderYear && <p className="text-red-500 text-sm mt-1">{errors.leaderYear}</p>}
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#002147] flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#002147]">
                Team Members
              </h2>
            </div>

            <MemberSection
              memberNum="2"
              formData={formData}
              handleInputChange={handleInputChange}
              isMobile={isMobile}
              errors={errors}
              optional={false}
            />

           

            <MemberSection
              memberNum="3"
              formData={formData}
              handleInputChange={handleInputChange}
              isMobile={isMobile}
              errors={errors}
              optional={false}
            />

            {formData.teamSize === '4' && (
              <MemberSection
                memberNum="4"
                formData={formData}
                handleInputChange={handleInputChange}
                isMobile={isMobile}
                errors={errors}
                optional={false}
              />
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-xl shadow-lg flex items-center gap-3 transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

const MemberSection = ({ memberNum, formData, handleInputChange, isMobile, errors, optional }) => {
  const fields = [
    { name: `member${memberNum}Name`, placeholder: 'Full Name' },
    { name: `member${memberNum}Email`, placeholder: 'Email Address', type: 'email' },
    { name: `member${memberNum}Phone`, placeholder: 'Phone Number', type: 'tel' }
  ];

  return (
    <div className="mb-6 p-6 bg-[#002147]/[0.03] rounded-xl border-2 border-[#002147]/10">
      <h3 className="text-lg font-bold text-[#002147] mb-4">
        Member {memberNum} {optional ? '(Optional)' : '*'}
      </h3>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {fields.map((field) => (
          <div key={field.name}>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all bg-white ${
                errors[field.name] 
                  ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                  : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
              }`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationForm;