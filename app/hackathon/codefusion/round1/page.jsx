'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Success Modal Component
const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-[#002147] mb-3">
            Submission Successful
          </h2>

          <p className="text-gray-600 mb-6 font-semibold text-lg">
            🎉 Your Round 1 submission has been received!
          </p>

          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Your submission has been successfully recorded. Good luck with the evaluation!
          </p>

          <button
            onClick={onClose}
            className="w-full px-8 py-4 text-lg font-bold text-white bg-[#002147] rounded-xl shadow-lg transition-all hover:bg-[#001a35] hover:scale-105 hover:shadow-xl"
          >
            Close
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
            Submission Failed
          </h2>
          
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm leading-relaxed">
              {message}
            </p>
          </div>
          
          <p className="text-gray-600 mb-6 text-base">
            Please verify your information and try again. If the issue persists, contact support.
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

const Round1Submission = () => {
  // State for form data
  const [formData, setFormData] = useState({
    finalTeamId: '',
    trackSelected: '',
    problemStatementNumber: '',
    problemUnderstanding: '',
    proposedSolution: '',
    techStack: '',
    feasibility: ''
  });

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [apiError, setApiError] = useState('');

  // Track options (based on reference code)
  const trackOptions = [
    'AI-Powered Agents & Autonomous Systems',
    'Next-Gen Full-Stack Web Development',
    'WEB 3.0 decentralised applications',
    'Remote Sensing & Geographic Information System',
    'Cyber Security and Privacy',
    'Sustainability and Green Tech',
    'Open Innovation'
  ];

  // Handle input changes
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

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.finalTeamId.trim()) {
      newErrors.finalTeamId = 'Team ID is required';
    }
    if (!formData.trackSelected) {
      newErrors.trackSelected = 'Track selection is required';
    }
    if (!formData.problemStatementNumber) {
      newErrors.problemStatementNumber = 'Problem statement number is required';
    }
    if (!formData.problemUnderstanding.trim()) {
      newErrors.problemUnderstanding = 'Problem understanding is required';
    }
    if (!formData.proposedSolution.trim()) {
      newErrors.proposedSolution = 'Proposed solution is required';
    }
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }
    if (!formData.feasibility.trim()) {
      newErrors.feasibility = 'Feasibility analysis is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      finalTeamId: '',
      trackSelected: '',
      problemStatementNumber: '',
      problemUnderstanding: '',
      proposedSolution: '',
      techStack: '',
      feasibility: ''
    });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form first
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // Prepare payload for API
      const payload = {
        finalTeamId: formData.finalTeamId.trim(),
        trackSelected: formData.trackSelected,
        problemStatementNumber: parseInt(formData.problemStatementNumber),
        problemUnderstanding: formData.problemUnderstanding.trim(),
        proposedSolution: formData.proposedSolution.trim(),
        techStack: formData.techStack.trim(),
        feasibility: formData.feasibility.trim()
      };

      // Make API call
      const response = await fetch('https://rd-backend-m7gd.onrender.com/api/submission/round1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Handle response
      if (response.ok && data.success) {
        setShowSuccessModal(true);
      } else {
        setApiError(data.message || 'Submission failed. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setApiError('Network error. Please check your connection and try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle error modal close
  const handleErrorClose = () => {
    setShowErrorModal(false);
    setApiError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 pt-20 font-[SUSE,sans-serif]">
      {/* Modals */}
      {showSuccessModal && <SuccessModal onClose={handleSuccessClose} />}
      {showErrorModal && <ErrorModal message={apiError} onClose={handleErrorClose} />}

      {/* Main Form Container */}
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#002147] mb-3">
            Round 1 Submission
          </h1>
          <div className="w-24 h-1 bg-[#002147] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">
            CodeFusion 2026 • Academic Research & Development Conclave
          </p>
        </div>

        {/* Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
            <AlertCircle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-red-800 mb-1">
                Please fill all required fields
              </h3>
              <p className="text-red-700 text-sm">
                {Object.keys(errors).length} field(s) need attention.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#002147]/10">
          <div className="space-y-6">
            {/* Final Team ID */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Final Team ID *
              </label>
              <input
                type="text"
                name="finalTeamId"
                value={formData.finalTeamId}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                  errors.finalTeamId 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="e.g., CFRD01"
              />
              {errors.finalTeamId && (
                <p className="text-red-500 text-sm mt-1">{errors.finalTeamId}</p>
              )}
            </div>

            {/* Track Selected */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Track Selected *
              </label>
              <select
                name="trackSelected"
                value={formData.trackSelected}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                  errors.trackSelected 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
              >
                <option value="">Select Track</option>
                {trackOptions.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
              {errors.trackSelected && (
                <p className="text-red-500 text-sm mt-1">{errors.trackSelected}</p>
              )}
            </div>

            {/* Problem Statement Number */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Problem Statement Number *
              </label>
              <input
                type="number"
                name="problemStatementNumber"
                value={formData.problemStatementNumber}
                onChange={handleInputChange}
                min="1"
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                  errors.problemStatementNumber 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="e.g., 3"
              />
              {errors.problemStatementNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.problemStatementNumber}</p>
              )}
            </div>

            {/* Problem Understanding */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Problem Understanding *
              </label>
              <textarea
                name="problemUnderstanding"
                value={formData.problemUnderstanding}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all resize-none ${
                  errors.problemUnderstanding 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="Describe your understanding of the problem statement..."
              />
              {errors.problemUnderstanding && (
                <p className="text-red-500 text-sm mt-1">{errors.problemUnderstanding}</p>
              )}
            </div>

            {/* Proposed Solution */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Proposed Solution *
              </label>
              <textarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all resize-none ${
                  errors.proposedSolution 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="Explain your proposed solution approach..."
              />
              {errors.proposedSolution && (
                <p className="text-red-500 text-sm mt-1">{errors.proposedSolution}</p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Tech Stack *
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all ${
                  errors.techStack 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="e.g., React, Node.js, MongoDB, TensorFlow"
              />
              {errors.techStack && (
                <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
              )}
            </div>

            {/* Feasibility */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Feasibility Analysis *
              </label>
              <textarea
                name="feasibility"
                value={formData.feasibility}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all resize-none ${
                  errors.feasibility 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="Discuss the feasibility of your solution..."
              />
              {errors.feasibility && (
                <p className="text-red-500 text-sm mt-1">{errors.feasibility}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#002147] to-[#001a35] rounded-xl shadow-lg flex items-center gap-3 transition-all hover:from-[#001a35] hover:to-[#001028] hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Round 1</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
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

export default Round1Submission;