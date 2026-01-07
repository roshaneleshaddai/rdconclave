'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, GraduationCap, Send, CheckCircle, AlertCircle, Info, Mail, Check, X, ChevronRight } from 'lucide-react';

const CoinFlip = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center max-w-sm w-full">
        <div style={{ perspective: '1200px', width: '120px', height: '120px' }}>
          <div className="coin">
            <div className="coin-face front">
              <div className="w-full h-full bg-gradient-to-br from-[#002147] to-[#001a35] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">CF</span>
              </div>
            </div>
            <div className="coin-face back">
              <div className="w-full h-full bg-gradient-to-br from-[#7c3aed] to-[#6b21a8] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">25</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-base font-semibold text-[#002147]">Processing Payment...</p>
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

const VerificationLoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scaleIn">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <div className="animate-spin">
              <CheckCircle size={32} className="text-[#002147]" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#002147] mb-2">Verifying Team</h2>
          <p className="text-sm text-gray-600">Please wait while we verify your team ID...</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const SuccessModal = ({ registrationId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scaleIn">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#002147] mb-2">Registration Successful!</h2>
          <p className="text-sm text-gray-600 mb-4">Your payment registration has been completed successfully</p>
          <div className="bg-[#002147] rounded-lg p-4 mb-4">
            <p className="text-xs text-blue-100 mb-1 font-semibold">Registration ID</p>
            <p className="text-xl sm:text-2xl font-bold text-white break-all">{registrationId}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 mb-4 flex items-start gap-2">
            <Mail size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-green-800 font-bold text-xs mb-1">Confirmation Email Sent!</p>
              <p className="text-green-700 text-xs">Please check your email inbox (including spam folder)</p>
            </div>
          </div>
          <button onClick={onClose} className="w-full px-6 py-3 text-base font-bold text-white bg-[#002147] rounded-lg shadow-lg transition-all hover:bg-[#001a35] hover:scale-105">
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scaleIn">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#002147] mb-3">Submission Error</h2>
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{message}</p>
          </div>
          <button onClick={onClose} className="w-full px-6 py-3 text-base font-bold text-white bg-[#002147] rounded-lg shadow-lg transition-all hover:bg-[#001a35] hover:scale-105">
            Try Again
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scaleIn">
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-[#002147] mb-3">Confirm Submission</h2>
          <p className="text-sm text-gray-600 mb-6">Please verify that all information is correct and all payment proofs have been uploaded before submitting.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 text-sm font-bold text-[#002147] bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg transition-all hover:from-[#6b21a8] hover:to-[#5b21b6]">
              Confirm
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
            i < currentStep ? 'bg-[#002147] text-white' : i === currentStep ? 'bg-[#7c3aed] text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {i < currentStep ? <Check size={16} /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-6 sm:w-8 md:w-12 h-0.5 mx-1 transition-all ${i < currentStep ? 'bg-[#002147]' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const CodeFusionPaymentForm = () => {
  const [step, setStep] = useState(0);
  const [teamSize, setTeamSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const collegeOptions = [
    'KL University – Vaddeswaram',
    'SRM University AP – Amaravati',
    'VIT-AP University – Amaravati',
    'Velagapudi Ramakrishna Siddhartha Engineering College',
    'Siddhartha Academy of Higher Education',
    'Prasad V Potluri Siddhartha Institute of Technology',
    'Gudlavalleru Engineering College',
    'Dhanekula Institute of Engineering & Technology',
    'Andhra Loyola College',
    'KBN College',
    'NRI Institute of Technology',
    'JNTUK Kakinada',
    'Sri Vishnu Engineering College for Women',
    'Sir C. R. Reddy College of Engineering',
    'Gayatri Vidya Parishad College of Engineering',
    'Lakireddy Bali Reddy College of Engineering',
    'PACE Institute of Technology',
    'RVR & JC College of Engineering',
    'Vignan\'s Foundation for Science & Technology',
    'Vasireddy Venkatadri Institute of Technology',
    'Bapatla Engineering College',
    'Others'
  ];

  const [formData, setFormData] = useState({
    teamId: '',
    teamName: '',
    problemDomain: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCollege: '',
    leaderYear: '',
    leaderPaymentProof: null,
    leaderTransactionId: '',
    member2Name: '',
    member2Phone: '',
    member2College: '',
    member2Email: '',
    member2PaymentProof: null,
    member2TransactionId: '',
    member3Name: '',
    member3Phone: '',
    member3College: '',
    member3Email: '',
    member3PaymentProof: null,
    member3TransactionId: '',
    member4Name: '',
    member4Phone: '',
    member4College: '',
    member4Email: '',
    member4PaymentProof: null,
    member4TransactionId: '',
  });

  const totalSteps = 3 + teamSize;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
  const validateTransactionId = (id) => id.trim().length >= 5;

  const handleTeamVerification = async () => {
    if (!formData.teamId.trim()) {
      setErrors({ teamId: 'Team ID is required' });
      return;
    }
    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({ ...prev, teamName: `Team ${formData.teamId}` }));
      setStep(1);
      setErrors({});
    } catch (error) {
      setApiError('Team verification failed. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [fieldName]: 'Only image files are allowed (JPG, PNG, etc.)' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.problemDomain) newErrors.problemDomain = 'Problem domain is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLeader = () => {
    const newErrors = {};
    if (!formData.leaderName.trim()) newErrors.leaderName = 'Name is required';
    if (!formData.leaderEmail.trim()) newErrors.leaderEmail = 'Email is required';
    else if (!validateEmail(formData.leaderEmail)) newErrors.leaderEmail = 'Invalid email format';
    if (!formData.leaderPhone.trim()) newErrors.leaderPhone = 'Phone number is required';
    else if (!validatePhone(formData.leaderPhone)) newErrors.leaderPhone = 'Phone number must be 10 digits';
    if (!formData.leaderCollege) newErrors.leaderCollege = 'College is required';
    if (!formData.leaderYear) newErrors.leaderYear = 'Year of study is required';
    if (!formData.leaderPaymentProof) newErrors.leaderPaymentProof = 'Payment proof is required';
    if (!formData.leaderTransactionId.trim()) newErrors.leaderTransactionId = 'Transaction ID is required';
    else if (!validateTransactionId(formData.leaderTransactionId)) newErrors.leaderTransactionId = 'Transaction ID must be at least 5 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMember = (memberNum) => {
    const newErrors = {};
    const prefix = `member${memberNum}`;
    if (!formData[`${prefix}Name`]?.trim()) newErrors[`${prefix}Name`] = 'Name is required';
    if (!formData[`${prefix}Phone`]?.trim()) newErrors[`${prefix}Phone`] = 'Phone number is required';
    else if (!validatePhone(formData[`${prefix}Phone`])) newErrors[`${prefix}Phone`] = 'Phone number must be 10 digits';
    if (!formData[`${prefix}College`]) newErrors[`${prefix}College`] = 'College is required';
    if (!formData[`${prefix}Email`]?.trim()) newErrors[`${prefix}Email`] = 'Email is required';
    else if (!validateEmail(formData[`${prefix}Email`])) newErrors[`${prefix}Email`] = 'Invalid email format';
    if (!formData[`${prefix}PaymentProof`]) newErrors[`${prefix}PaymentProof`] = 'Payment proof is required';
    if (!formData[`${prefix}TransactionId`]?.trim()) newErrors[`${prefix}TransactionId`] = 'Transaction ID is required';
    else if (!validateTransactionId(formData[`${prefix}TransactionId`])) newErrors[`${prefix}TransactionId`] = 'Transaction ID must be at least 5 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateLeader()) return;
    if (step > 2 && !validateMember(step - 1)) return;
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    if (!validateMember(teamSize)) return;
    setShowConfirmModal(false);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setRegistrationId(`CF-2025-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setShowSuccessModal(true);
      setFormData({
        teamId: '', teamName: '', problemDomain: '',
        leaderName: '', leaderEmail: '', leaderPhone: '', leaderCollege: '', leaderYear: '', leaderPaymentProof: null, leaderTransactionId: '',
        member2Name: '', member2Phone: '', member2College: '', member2Email: '', member2PaymentProof: null, member2TransactionId: '',
        member3Name: '', member3Phone: '', member3College: '', member3Email: '', member3PaymentProof: null, member3TransactionId: '',
        member4Name: '', member4Phone: '', member4College: '', member4Email: '', member4PaymentProof: null, member4TransactionId: '',
      });
      setStep(0);
    } catch (error) {
      setApiError('Submission failed. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  const handleBackClick = () => {
    if (step === 0) {
      window.history.back();
    } else {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pt-52 sm:pt-60 md:pt-72 pb-8 font-sans">


      {isLoading && <CoinFlip />}
      {isVerifying && <VerificationLoadingModal />}
      {showSuccessModal && <SuccessModal registrationId={registrationId} onClose={handleSuccessClose} />}
      {showErrorModal && <ErrorModal message={apiError} onClose={handleErrorClose} />}
      {showConfirmModal && <ConfirmationModal onConfirm={handleFinalSubmit} onCancel={() => setShowConfirmModal(false)} />}

      <div className="max-w-3xl mx-auto mb-6">
        <button onClick={handleBackClick} className="flex items-center gap-2 text-[#002147] mb-4 font-semibold text-sm hover:text-[#7c3aed] transition-colors">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#002147] mb-2">Payment Registration</h1>
          <div className="w-20 h-0.5 bg-[#002147] mx-auto mb-3"></div>
          <p className="text-xs sm:text-sm text-gray-600">CodeFusion 2025 • Payment & Verification Portal</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {step > 0 && <StepIndicator currentStep={step} totalSteps={totalSteps} />}

        <div className="bg-white border-2 border-[#002147]/10 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          {step === 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#002147] flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#002147]">Team Verification</h2>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-[#002147] mb-1.5">Team ID *</label>
                <input
                  type="text"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                    errors.teamId ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
                  }`}
                  placeholder="Enter your team ID"
                />
                {errors.teamId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.teamId}</p>}
              </div>

              <button
                onClick={handleTeamVerification}
                disabled={isVerifying}
                className="w-full h-11 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg shadow-md transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Team
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#002147] flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#002147]">Team Details</h2>
              </div>

              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-sm font-bold text-[#002147] mb-1.5">Team Name *</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                      errors.teamName ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
                    }`}
                    placeholder="Enter your team name"
                  />
                  {errors.teamName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.teamName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#002147] mb-1.5">Team Size *</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="w-full h-11 px-4 border-2 border-[#002147]/20 rounded-lg outline-none text-sm cursor-pointer focus:border-[#002147]"
                    >
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#002147] mb-1.5">Problem Domain *</label>
                    <select
                      name="problemDomain"
                      value={formData.problemDomain}
                      onChange={handleInputChange}
                      className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                        errors.problemDomain ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
                      }`}
                    >
                      <option value="">Select Domain</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Web 3.0">Web 3.0</option>
                      <option value="Remote Sensing">Remote Sensing</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Open Innovation">Open Innovation</option>
                    </select>
                    {errors.problemDomain && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.problemDomain}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 h-11 text-sm font-bold text-[#002147] bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
                  Back
                </button>
                <button onClick={handleNextStep} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] flex items-center justify-center gap-2">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <LeaderDetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(step - 1)}
              isMobile={isMobile}
            />
          )}

          {step > 2 && step < totalSteps && (
            <MemberDetailsSection
              memberNum={step - 1}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(step - 1)}
              isMobile={isMobile}
            />
          )}

          {step === totalSteps && (
            <FinalReviewSection
              formData={formData}
              teamSize={teamSize}
              onConfirm={() => setShowConfirmModal(true)}
              onPrevious={() => setStep(step - 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const LeaderDetailsSection = ({ formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious, isMobile }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#002147] flex items-center justify-center">
          <GraduationCap size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#002147]">Team Leader Details</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Full Name *</label>
            <input
              type="text"
              name="leaderName"
              value={formData.leaderName}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors.leaderName ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="Enter full name"
            />
            {errors.leaderName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderName}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Email Address *</label>
            <input
              type="email"
              name="leaderEmail"
              value={formData.leaderEmail}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors.leaderEmail ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="student@email.com"
            />
            {errors.leaderEmail && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Phone Number *</label>
            <input
              type="tel"
              name="leaderPhone"
              value={formData.leaderPhone}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors.leaderPhone ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="10-digit phone number"
              maxLength="10"
            />
            {errors.leaderPhone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderPhone}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">College/University *</label>
            <select
              name="leaderCollege"
              value={formData.leaderCollege}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors.leaderCollege ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
            >
              <option value="">Select College</option>
              {collegeOptions.map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
            {errors.leaderCollege && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderCollege}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Year of Study *</label>
            <select
              name="leaderYear"
              value={formData.leaderYear}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors.leaderYear ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            {errors.leaderYear && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderYear}</p>}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#002147]/5 to-[#7c3aed]/5 border-2 border-[#002147]/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-[#002147] mb-4 flex items-center gap-2">
          <Info size={16} />
          Payment Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-[#002147] mb-2">Complete Payment</label>
            <button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-[#002147] to-[#001a35] rounded-lg shadow-md transition-all hover:from-[#001a35] hover:to-[#000d1a] hover:scale-105">
              Pay Now
            </button>
            <p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-2">Upload Payment Proof *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'leaderPaymentProof')}
              className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${
                errors.leaderPaymentProof ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
            />
            {formData.leaderPaymentProof && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <Check size={12} /> {formData.leaderPaymentProof.name?.substring(0, 25)}...
              </p>
            )}
            {errors.leaderPaymentProof && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderPaymentProof}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#002147] mb-1.5">Transaction ID *</label>
          <input
            type="text"
            name="leaderTransactionId"
            value={formData.leaderTransactionId}
            onChange={handleInputChange}
            placeholder="Enter your transaction ID"
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.leaderTransactionId ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
            }`}
          />
          {errors.leaderTransactionId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderTransactionId}</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-[#002147] bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
          Back
        </button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] flex items-center justify-center gap-2">
          Next Member <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const MemberDetailsSection = ({ memberNum, formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious, isMobile }) => {
  const prefix = `member${memberNum}`;
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#002147] flex items-center justify-center">
          <Users size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#002147]">Member {memberNum} Details</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Full Name *</label>
            <input
              type="text"
              name={`${prefix}Name`}
              value={formData[`${prefix}Name`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Name`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="Enter full name"
            />
            {errors[`${prefix}Name`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}Name`]}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Phone Number *</label>
            <input
              type="tel"
              name={`${prefix}Phone`}
              value={formData[`${prefix}Phone`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Phone`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="10-digit phone number"
              maxLength="10"
            />
            {errors[`${prefix}Phone`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}Phone`]}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">College/University *</label>
            <select
              name={`${prefix}College`}
              value={formData[`${prefix}College`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors[`${prefix}College`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
            >
              <option value="">Select College</option>
              {collegeOptions.map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
            {errors[`${prefix}College`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}College`]}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-1.5">Email Address *</label>
            <input
              type="email"
              name={`${prefix}Email`}
              value={formData[`${prefix}Email`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Email`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
              placeholder="student@email.com"
            />
            {errors[`${prefix}Email`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}Email`]}</p>}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#002147]/5 to-[#7c3aed]/5 border-2 border-[#002147]/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-[#002147] mb-4 flex items-center gap-2">
          <Info size={16} />
          Payment Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-[#002147] mb-2">Complete Payment</label>
            <button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-[#002147] to-[#001a35] rounded-lg shadow-md transition-all hover:from-[#001a35] hover:to-[#000d1a] hover:scale-105">
              Pay Now
            </button>
            <p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#002147] mb-2">Upload Payment Proof *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, `${prefix}PaymentProof`)}
              className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${
                errors[`${prefix}PaymentProof`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
              }`}
            />
            {formData[`${prefix}PaymentProof`] && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <Check size={12} /> {formData[`${prefix}PaymentProof`].name?.substring(0, 25)}...
              </p>
            )}
            {errors[`${prefix}PaymentProof`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}PaymentProof`]}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#002147] mb-1.5">Transaction ID *</label>
          <input
            type="text"
            name={`${prefix}TransactionId`}
            value={formData[`${prefix}TransactionId`]}
            onChange={handleInputChange}
            placeholder="Enter your transaction ID"
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors[`${prefix}TransactionId`] ? 'border-red-500' : 'border-[#002147]/20 focus:border-[#002147]'
            }`}
          />
          {errors[`${prefix}TransactionId`] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[`${prefix}TransactionId`]}</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-[#002147] bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
          Back
        </button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] flex items-center justify-center gap-2">
          {memberNum === 3 ? 'Review & Submit' : 'Next Member'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const FinalReviewSection = ({ formData, teamSize, onConfirm, onPrevious }) => {
  const getMemberStatus = (memberNum, isLeader = false) => {
    const prefix = isLeader ? 'leader' : `member${memberNum}`;
    return formData[`${prefix}PaymentProof`] !== null;
  };

  const allPaymentsComplete = () => {
    const leader = getMemberStatus(1, true);
    const member2 = getMemberStatus(2);
    const member3 = getMemberStatus(3);
    const member4 = teamSize === 4 ? getMemberStatus(4) : true;
    return leader && member2 && member3 && member4;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#002147] flex items-center justify-center">
          <CheckCircle size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#002147]">Final Review</h2>
      </div>

      <div className="bg-gradient-to-br from-[#002147]/5 to-[#7c3aed]/5 border-2 border-[#002147]/10 rounded-lg p-4 sm:p-5 mb-5">
        <h3 className="text-sm font-bold text-[#002147] mb-3 flex items-center gap-2">
          <Info size={16} />
          Payment Status Overview
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <span className="font-semibold text-sm">Team Leader</span>
            {getMemberStatus(1, true) ? (
              <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                <CheckCircle size={16} /> Proof Uploaded
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 font-bold text-xs">
                <X size={16} /> Pending
              </div>
            )}
          </div>

          {[2, 3].map((m) => (
            <div key={m} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-sm">Member {m}</span>
              {getMemberStatus(m) ? (
                <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                  <CheckCircle size={16} /> Proof Uploaded
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 font-bold text-xs">
                  <X size={16} /> Pending
                </div>
              )}
            </div>
          ))}

          {teamSize === 4 && (
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-sm">Member 4</span>
              {getMemberStatus(4) ? (
                <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                  <CheckCircle size={16} /> Proof Uploaded
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 font-bold text-xs">
                  <X size={16} /> Pending
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!allPaymentsComplete() && (
        <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-3 mb-5 flex items-start gap-2">
          <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-bold mb-1">Incomplete Payment Information</p>
            <p className="text-xs">Please ensure all team members have uploaded their payment proofs before submitting.</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-3 mb-6 flex items-start gap-2">
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-bold mb-1">Before You Submit</p>
          <p className="text-xs">Please verify that all information is accurate and all payment proofs are uploaded. Once submitted, changes cannot be made.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-[#002147] bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
          Back
        </button>
        <button onClick={onConfirm} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6b21a8] rounded-lg transition-all hover:from-[#6b21a8] hover:to-[#5b21b6] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Submit Registration <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default CodeFusionPaymentForm;