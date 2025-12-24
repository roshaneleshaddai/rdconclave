'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, GraduationCap, Send, CheckCircle, AlertCircle } from 'lucide-react';

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState({});
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

  // Handle responsive layout
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

    // Team Details Validation
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
    if (!formData.problemStatement) newErrors.problemStatement = 'Problem statement is required';

    // Leader Details Validation
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
    if (!formData.leaderEmail.trim()) {
      newErrors.leaderEmail = 'Leader email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.leaderEmail)) {
      newErrors.leaderEmail = 'Enter a valid email address';
    }
    if (!formData.leaderPhone.trim()) newErrors.leaderPhone = 'Leader phone is required';
    if (!formData.leaderCollege.trim()) newErrors.leaderCollege = 'College/Institution is required';
    if (!formData.leaderDepartment.trim()) newErrors.leaderDepartment = 'Department is required';
    if (!formData.leaderYear) newErrors.leaderYear = 'Year of study is required';

    // Member 2 Validation (Always Required)
    if (!formData.member2Name.trim()) newErrors.member2Name = 'Member 2 name is required';
    if (!formData.member2Email.trim()) {
      newErrors.member2Email = 'Member 2 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member2Email)) {
      newErrors.member2Email = 'Enter a valid email address';
    }
    if (!formData.member2Phone.trim()) newErrors.member2Phone = 'Member 2 phone is required';

    // Member 3 Validation (Always Required)
    if (!formData.member3Name.trim()) newErrors.member3Name = 'Member 3 name is required';
    if (!formData.member3Email.trim()) {
      newErrors.member3Email = 'Member 3 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member3Email)) {
      newErrors.member3Email = 'Enter a valid email address';
    }
    if (!formData.member3Phone.trim()) newErrors.member3Phone = 'Member 3 phone is required';

    // Member 4 Validation (Only if team size is 4)
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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
        setErrors({});
      }, 3000);
    } else {
      console.log('Form has errors');
    }
  };

  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-40 md:pt-56 pb-12 font-[SUSE,sans-serif]">
      {/* Header with Back Button */}
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

      {/* Success Message */}
      {isSubmitted && (
        <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-center gap-4 animate-fadeIn">
          <CheckCircle size={32} className="text-green-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-1">
              Registration Successful!
            </h3>
            <p className="text-green-700">
              Your team has been registered. Check your email for confirmation details.
            </p>
          </div>
        </div>
      )}

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && !isSubmitted && (
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

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-[#002147]/10 rounded-2xl shadow-lg p-8 md:p-12">
          
          {/* Team Details Section */}
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
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="blockchain">Blockchain Technology</option>
                  <option value="iot">Internet of Things</option>
                  <option value="healthcare">Healthcare Innovation</option>
                  <option value="education">Education Tech</option>
                  <option value="sustainability">Sustainability</option>
                </select>
                {errors.problemStatement && <p className="text-red-500 text-sm mt-1">{errors.problemStatement}</p>}
              </div>
            </div>
          </div>

          {/* Team Leader Section */}
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
                { name: 'leaderCollege', label: 'College/Institution', type: 'text', placeholder: 'Enter institution name' },
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

          {/* Team Members Section */}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-xl shadow-lg flex items-center gap-3 transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] hover:scale-105 hover:shadow-xl"
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