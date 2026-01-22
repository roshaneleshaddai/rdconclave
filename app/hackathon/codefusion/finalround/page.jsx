'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Github, Globe, TrendingUp, Award } from 'lucide-react';

// Success Modal Component - Enhanced for Final Round
const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scaleIn">
        <div className="p-10 text-center">
          {/* Trophy Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
              <Award size={48} className="text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-[#002147] mb-4">
            Final Submission Received!
          </h2>

          <p className="text-gray-600 mb-4 font-semibold text-lg">
            🎉 Congratulations on completing your journey!
          </p>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Your final submission has been successfully recorded. The judging panel will review your complete solution, including your live deployment and source code. Best of luck!
          </p>

          <div className="bg-gradient-to-r from-[#002147] to-[#001a35] rounded-xl p-6 mb-6">
            <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2">
              What's Next?
            </p>
            <p className="text-white text-sm">
              Results will be announced soon. Stay tuned to your email and our official channels for updates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#002147] to-[#001a35] rounded-xl shadow-lg transition-all hover:from-[#001a35] hover:to-[#001028] hover:scale-105 hover:shadow-xl"
          >
            Complete
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
          animation: scaleIn 0.4s ease-out;
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
            Please verify your information and try again. If the issue persists, contact support immediately.
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

const FinalSubmission = () => {
  // State for form data
  const [formData, setFormData] = useState({
    finalTeamId: '',
    trackSelected: '',
    liveDeploymentLink: '',
    githubRepository: '',
    scalabilityAndFutureScope: ''
  });

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [apiError, setApiError] = useState('');

  // Track options
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

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return true; // Empty is valid for optional fields
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Validate GitHub URL specifically
  const isValidGithubUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') 
        && (urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com');
    } catch {
      return false;
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.finalTeamId.trim()) {
      newErrors.finalTeamId = 'Team ID is required';
    }
    
    if (!formData.trackSelected) {
      newErrors.trackSelected = 'Track selection is required';
    }
    
    // Live Deployment Link is optional, but must be valid URL if provided
    if (formData.liveDeploymentLink.trim() && !isValidUrl(formData.liveDeploymentLink)) {
      newErrors.liveDeploymentLink = 'Please enter a valid URL (must start with http:// or https://)';
    }
    
    // GitHub Repository is required and must be a valid GitHub URL
    if (!formData.githubRepository.trim()) {
      newErrors.githubRepository = 'GitHub repository is required';
    } else if (!isValidGithubUrl(formData.githubRepository)) {
      newErrors.githubRepository = 'Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)';
    }
    
    if (!formData.scalabilityAndFutureScope.trim()) {
      newErrors.scalabilityAndFutureScope = 'Scalability and future scope details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      finalTeamId: '',
      trackSelected: '',
      liveDeploymentLink: '',
      githubRepository: '',
      scalabilityAndFutureScope: ''
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
        liveDeploymentLink: formData.liveDeploymentLink.trim() || undefined, // Send undefined if empty
        githubRepository: formData.githubRepository.trim(),
        scalabilityAndFutureScope: formData.scalabilityAndFutureScope.trim()
      };

      // Make API call
      const response = await fetch('https://rd-backend-m7gd.onrender.com/api/submission/final/submit', {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12 font-[SUSE,sans-serif] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Modals */}
      {showSuccessModal && <SuccessModal onClose={handleSuccessClose} />}
      {showErrorModal && <ErrorModal message={apiError} onClose={handleErrorClose} />}

      {/* Main Form Container */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 text-sm font-bold rounded-full mb-4 shadow-lg">
            ⭐ FINAL ROUND SUBMISSION ⭐
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Complete Your Journey
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">
            Submit your final solution for evaluation
          </p>
        </div>

        {/* Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 bg-red-900/50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3 animate-fadeIn backdrop-blur-sm">
            <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-red-200 mb-1">
                Validation Error
              </h3>
              <p className="text-red-300 text-sm">
                Please correct {Object.keys(errors).length} field(s) before submitting.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-white/20">
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
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all bg-white ${
                  errors.finalTeamId 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="e.g., CFRD01"
              />
              {errors.finalTeamId && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.finalTeamId}
                </p>
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
                className={`w-full h-12 px-4 border-2 rounded-lg outline-none transition-all cursor-pointer bg-white ${
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
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.trackSelected}
                </p>
              )}
            </div>

            {/* Live Deployment Link - Optional */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                Live Deployment Link
                <span className="ml-2 text-xs font-normal text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="liveDeploymentLink"
                  value={formData.liveDeploymentLink}
                  onChange={handleInputChange}
                  className={`w-full h-12 pl-12 pr-4 border-2 rounded-lg outline-none transition-all bg-white ${
                    errors.liveDeploymentLink 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                  placeholder="https://your-project.vercel.app"
                />
              </div>
              {errors.liveDeploymentLink && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.liveDeploymentLink}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1.5 ml-1">
                If your project is deployed live, share the URL here
              </p>
            </div>

            {/* GitHub Repository - Required */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2">
                GitHub Repository *
              </label>
              <div className="relative">
                <Github size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="githubRepository"
                  value={formData.githubRepository}
                  onChange={handleInputChange}
                  className={`w-full h-12 pl-12 pr-4 border-2 rounded-lg outline-none transition-all bg-white ${
                    errors.githubRepository 
                      ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                      : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                  }`}
                  placeholder="https://github.com/username/repository"
                />
              </div>
              {errors.githubRepository && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.githubRepository}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1.5 ml-1">
                Ensure your repository is public and includes a comprehensive README
              </p>
            </div>

            {/* Scalability & Future Scope */}
            <div>
              <label className="block text-base font-bold text-[#002147] mb-2 flex items-center gap-2">
                <TrendingUp size={20} />
                Scalability & Future Scope *
              </label>
              <textarea
                name="scalabilityAndFutureScope"
                value={formData.scalabilityAndFutureScope}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all resize-none bg-white ${
                  errors.scalabilityAndFutureScope 
                    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                    : 'border-[#002147]/20 focus:border-[#002147] focus:shadow-[0_0_0_3px_rgba(0,33,71,0.1)]'
                }`}
                placeholder="Discuss how your solution can scale, potential improvements, future enhancements, and long-term vision for the project..."
              />
              {errors.scalabilityAndFutureScope && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.scalabilityAndFutureScope}
                </p>
              )}
            </div>

            {/* Final Info Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Award size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-800">
                  <p className="font-bold mb-2 text-base text-[#002147]">Final Submission Checklist:</p>
                  <ul className="space-y-1.5 ml-4 list-disc">
                    <li>Verify all information is accurate and complete</li>
                    <li>Ensure your GitHub repository is public with proper documentation</li>
                    <li>Test your live deployment link (if provided)</li>
                    <li>Double-check that your README includes setup instructions</li>
                    <li className="font-bold text-[#002147]">This is your final submission - review carefully!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-16 py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 rounded-xl shadow-2xl flex items-center gap-3 transition-all hover:from-yellow-600 hover:via-yellow-700 hover:to-orange-700 hover:scale-105 hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Award size={24} />
                    <span>Submit Final Project</span>
                    <Send size={24} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-400 mt-6">
          CodeFusion 2026 • Final Round Evaluation
        </p>
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

export default FinalSubmission;