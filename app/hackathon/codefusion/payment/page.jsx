'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, GraduationCap, Send, CheckCircle, AlertCircle, Info, Mail, Check, X, ChevronRight } from 'lucide-react';

const CoinFlip = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center max-w-sm w-full">
        <div style={{ perspective: '1200px', width: '120px', height: '120px' }}>
          <div className="relative w-full h-full animate-spin-y" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute w-full h-full rounded-full" style={{ backfaceVisibility: 'hidden' }}>
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">CF</span>
              </div>
            </div>
            <div className="absolute w-full h-full rounded-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">25</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-base font-semibold text-blue-900">Processing Payment...</p>
      </div>
      <style jsx>{`
        @keyframes spin-y {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-spin-y {
          animation: spin-y 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

const VerificationLoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <div className="animate-spin">
              <CheckCircle size={32} className="text-blue-900" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-blue-900 mb-2">Verifying Team</h2>
          <p className="text-sm text-gray-600">Please wait while we verify your team ID...</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const SuccessModal = ({ registrationId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Registration Successful!</h2>
          <p className="text-sm text-gray-600 mb-4">Your payment registration has been completed successfully</p>
          <div className="bg-blue-900 rounded-lg p-4 mb-4">
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
          <button onClick={onClose} className="w-full px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-lg transition-all hover:bg-blue-950 hover:scale-105">
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Submission Error</h2>
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{message}</p>
          </div>
          <button onClick={onClose} className="w-full px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-lg transition-all hover:bg-blue-950 hover:scale-105">
            Try Again
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Confirm Submission</h2>
          <p className="text-sm text-gray-600 mb-6">Please verify that all information is correct and all payment proofs have been uploaded before submitting.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900">
              Confirm
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
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
            i < currentStep ? 'bg-blue-900 text-white' : i === currentStep ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {i < currentStep ? <Check size={16} /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-6 sm:w-8 md:w-12 h-0.5 mx-1 transition-all ${i < currentStep ? 'bg-blue-900' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const CodeFusionPaymentForm = () => {
  const [step, setStep] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
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

    const totalSteps = teamSize === 0 ? 3 : 2 + teamSize;


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
    if (teamSize === 0) newErrors.teamSize = 'Please select a team size';
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
    if (step === 3 && !validateMember(2)) return;
    if (step === 4 && teamSize >= 3 && !validateMember(3)) return;
    if (step === 5 && teamSize === 4 && !validateMember(4)) return;
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
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
      setTeamSize(0);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pt-60 font-sans">

      {isLoading && <CoinFlip />}
      {isVerifying && <VerificationLoadingModal />}
      {showSuccessModal && <SuccessModal registrationId={registrationId} onClose={handleSuccessClose} />}
      {showErrorModal && <ErrorModal message={apiError} onClose={handleErrorClose} />}
      {showConfirmModal && <ConfirmationModal onConfirm={handleFinalSubmit} onCancel={() => setShowConfirmModal(false)} />}

      <div className="max-w-3xl mx-auto mb-6">
        <button onClick={handleBackClick} className="flex items-center gap-2 text-blue-900 mb-4 font-semibold text-sm hover:text-purple-600 transition-colors">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2">Payment Registration</h1>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto mb-3"></div>
          <p className="text-xs sm:text-sm text-gray-600">CodeFusion 2025 • Payment & Verification Portal</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {step > 0 && <StepIndicator currentStep={step} totalSteps={totalSteps} />}

        <div className="bg-white border-2 border-blue-900/10 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          {step === 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-blue-900">Team Verification</h2>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-blue-900 mb-1.5">Team ID *</label>
                <input
                  type="text"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                    errors.teamId ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'
                  }`}
                  placeholder="Enter your team ID"
                />
                {errors.teamId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.teamId}</p>}
              </div>

              <button
                onClick={handleTeamVerification}
                disabled={isVerifying}
                className="w-full h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md transition-all hover:from-purple-700 hover:to-purple-900 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Team
              </button>
            </div>
          )}

          {step === 1 && (
            <TeamDetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              teamSize={teamSize}
              setTeamSize={setTeamSize}
              setErrors={setErrors}
              onNext={handleNextStep}
              onPrevious={() => setStep(0)}
            />
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
            />
          )}

          {step === 3 && (
            <Member2DetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(step - 1)}
            />
          )}

          {step === 4 && teamSize >= 3 && (
            <Member3DetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(step - 1)}
              teamSize={teamSize}
            />
          )}

          {step === 5 && teamSize === 4 && (
            <Member4DetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(step - 1)}
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

const TeamDetailsSection = ({ formData, handleInputChange, errors, teamSize, setTeamSize, setErrors, onNext, onPrevious }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
          <Users size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blue-900">Team Details</h2>
      </div>

      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">Team Name *</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.teamName ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'
            }`}
            placeholder="Enter your team name"
          />
          {errors.teamName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.teamName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Team Size *</label>
            <select
              value={teamSize}
              onChange={(e) => {
                setTeamSize(parseInt(e.target.value));
                setErrors(prev => ({ ...prev, teamSize: '' }));
              }}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors.teamSize ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'
              }`}
            >
              <option value="0">Select Team Size</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
            </select>
            {errors.teamSize && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.teamSize}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Problem Domain *</label>
            <select
              name="problemDomain"
              value={formData.problemDomain}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors.problemDomain ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'
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
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300">
          Back
        </button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const LeaderDetailsSection = ({ formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
          <GraduationCap size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blue-900">Team Leader Details</h2>
      </div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Full Name *</label>
            <input type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.leaderName ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="Enter full name" />
            {errors.leaderName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderName}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Email Address *</label>
            <input type="email" name="leaderEmail" value={formData.leaderEmail} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.leaderEmail ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="student@email.com" />
            {errors.leaderEmail && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderEmail}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Phone Number *</label>
            <input type="tel" name="leaderPhone" value={formData.leaderPhone} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.leaderPhone ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="10-digit phone number" maxLength="10" />
            {errors.leaderPhone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderPhone}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">College/University *</label>
            <select name="leaderCollege" value={formData.leaderCollege} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${errors.leaderCollege ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`}>
              <option value="">Select College</option>
              {collegeOptions.map((college) => (<option key={college} value={college}>{college}</option>))}
            </select>
            {errors.leaderCollege && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderCollege}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Year of Study *</label>
            <select name="leaderYear" value={formData.leaderYear} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${errors.leaderYear ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`}>
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
      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"><Info size={16} />Payment Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Complete Payment</label>
            <button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105">Pay Now</button>
            <p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Upload Payment Proof *</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'leaderPaymentProof')} className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${errors.leaderPaymentProof ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
            {formData.leaderPaymentProof && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><Check size={12} /> {formData.leaderPaymentProof.name?.substring(0, 25)}...</p>}
            {errors.leaderPaymentProof && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderPaymentProof}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">Transaction ID *</label>
          <input type="text" name="leaderTransactionId" value={formData.leaderTransactionId} onChange={handleInputChange} placeholder="Enter your transaction ID" className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.leaderTransactionId ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
          {errors.leaderTransactionId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.leaderTransactionId}</p>}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300">Back</button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2">Next Member <ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

const Member2DetailsSection = ({ formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center"><Users size={18} className="text-white" /></div><h2 className="text-lg sm:text-xl font-bold text-blue-900">Member 2 Details</h2></div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Full Name *</label>
            <input type="text" name="member2Name" value={formData.member2Name} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member2Name ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="Enter full name" />
            {errors.member2Name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2Name}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Phone Number *</label>
            <input type="tel" name="member2Phone" value={formData.member2Phone} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member2Phone ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="10-digit phone number" maxLength="10" />
            {errors.member2Phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2Phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">College/University *</label>
            <select name="member2College" value={formData.member2College} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${errors.member2College ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`}>
              <option value="">Select College</option>
              {collegeOptions.map((college) => (<option key={college} value={college}>{college}</option>))}
            </select>
            {errors.member2College && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2College}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Email Address *</label>
            <input type="email" name="member2Email" value={formData.member2Email} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member2Email ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="student@email.com" />
            {errors.member2Email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2Email}</p>}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"><Info size={16} />Payment Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-bold text-blue-900 mb-2">Complete Payment</label><button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105">Pay Now</button><p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p></div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Upload Payment Proof *</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'member2PaymentProof')} className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${errors.member2PaymentProof ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
            {formData.member2PaymentProof && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><Check size={12} /> {formData.member2PaymentProof.name?.substring(0, 25)}...</p>}
            {errors.member2PaymentProof && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2PaymentProof}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">Transaction ID *</label>
          <input type="text" name="member2TransactionId" value={formData.member2TransactionId} onChange={handleInputChange} placeholder="Enter your transaction ID" className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member2TransactionId ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
          {errors.member2TransactionId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member2TransactionId}</p>}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300">Back</button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2">Next Member <ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

const Member3DetailsSection = ({ formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious, teamSize }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center"><Users size={18} className="text-white" /></div><h2 className="text-lg sm:text-xl font-bold text-blue-900">Member 3 Details</h2></div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Full Name *</label>
            <input type="text" name="member3Name" value={formData.member3Name} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member3Name ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="Enter full name" />
            {errors.member3Name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3Name}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Phone Number *</label>
            <input type="tel" name="member3Phone" value={formData.member3Phone} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member3Phone ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="10-digit phone number" maxLength="10" />
            {errors.member3Phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3Phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">College/University *</label>
            <select name="member3College" value={formData.member3College} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${errors.member3College ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`}>
              <option value="">Select College</option>
              {collegeOptions.map((college) => (<option key={college} value={college}>{college}</option>))}
            </select>
            {errors.member3College && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3College}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Email Address *</label>
            <input type="email" name="member3Email" value={formData.member3Email} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member3Email ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="student@email.com" />
            {errors.member3Email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3Email}</p>}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"><Info size={16} />Payment Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-bold text-blue-900 mb-2">Complete Payment</label><button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105">Pay Now</button><p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p></div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Upload Payment Proof *</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'member3PaymentProof')} className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${errors.member3PaymentProof ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
            {formData.member3PaymentProof && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><Check size={12} /> {formData.member3PaymentProof.name?.substring(0, 25)}...</p>}
            {errors.member3PaymentProof && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3PaymentProof}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">Transaction ID *</label>
          <input type="text" name="member3TransactionId" value={formData.member3TransactionId} onChange={handleInputChange} placeholder="Enter your transaction ID" className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member3TransactionId ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
          {errors.member3TransactionId && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member3TransactionId}</p>}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onPrevious} className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300">Back</button>
        <button onClick={onNext} className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2">
          {teamSize === 3 ? 'Review & Submit' : 'Next Member'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Member4DetailsSection = ({ formData, handleInputChange, handleFileChange, errors, collegeOptions, onNext, onPrevious }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5"><div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center"><Users size={18} className="text-white" /></div><h2 className="text-lg sm:text-xl font-bold text-blue-900">Member 4 Details</h2></div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Full Name *</label>
            <input type="text" name="member4Name" value={formData.member4Name} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member4Name ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="Enter full name" />
            {errors.member4Name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member4Name}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Phone Number *</label>
            <input type="tel" name="member4Phone" value={formData.member4Phone} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member4Phone ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="10-digit phone number" maxLength="10" />
            {errors.member4Phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member4Phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">College/University *</label>
            <select name="member4College" value={formData.member4College} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${errors.member4College ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`}>
              <option value="">Select College</option>
              {collegeOptions.map((college) => (<option key={college} value={college}>{college}</option>))}
            </select>
            {errors.member4College && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member4College}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">Email Address *</label>
            <input type="email" name="member4Email" value={formData.member4Email} onChange={handleInputChange} className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member4Email ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} placeholder="student@email.com" />
            {errors.member4Email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member4Email}</p>}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"><Info size={16} />Payment Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-bold text-blue-900 mb-2">Complete Payment</label><button className="w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105">Pay Now</button><p className="text-xs text-gray-600 mt-1.5">Complete your payment to proceed</p></div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Upload Payment Proof *</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'member4PaymentProof')} className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${errors.member4PaymentProof ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
            {formData.member4PaymentProof && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><Check size={12} /> {formData.member4PaymentProof.name?.substring(0, 25)}...</p>}
            {errors.member4PaymentProof && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.member4PaymentProof}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">Transaction ID *</label>
          <input type="text" name="member4TransactionId" value={formData.member4TransactionId} onChange={handleInputChange} placeholder="Enter your transaction ID" className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${errors.member4TransactionId ? 'border-red-500' : 'border-blue-900/20 focus:border-blue-900'}`} />
          {errors.member4TransactionId && (
  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
    <AlertCircle size={12} />
    {errors.member4TransactionId}
  </p>
)}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2"
        >
          Review & Submit <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const FinalReviewSection = ({ formData, teamSize, onConfirm, onPrevious }) => {
  const isUploaded = (key) => formData[key] !== null;

  const allPaymentsComplete = () => {
    if (!isUploaded('leaderPaymentProof')) return false;
    if (!isUploaded('member2PaymentProof')) return false;
    if (!isUploaded('member3PaymentProof')) return false;
    if (teamSize === 4 && !isUploaded('member4PaymentProof')) return false;
    return true;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
          <CheckCircle size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blue-900">
          Final Review
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Info size={16} /> Payment Status
        </h3>

        {[
          ['Team Leader', 'leaderPaymentProof'],
          ['Member 2', 'member2PaymentProof'],
          ['Member 3', 'member3PaymentProof'],
          ...(teamSize === 4 ? [['Member 4', 'member4PaymentProof']] : []),
        ].map(([label, key]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm mb-2"
          >
            <span className="font-semibold text-sm">{label}</span>
            {isUploaded(key) ? (
              <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                <CheckCircle size={16} /> Uploaded
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 font-bold text-xs">
                <X size={16} /> Pending
              </span>
            )}
          </div>
        ))}
      </div>

      {!allPaymentsComplete() && (
        <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-3 mb-6 flex items-start gap-2">
          <AlertCircle size={18} className="text-amber-600 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm">
              Incomplete Payment
            </p>
            <p className="text-xs text-amber-800">
              Please upload payment proofs for all team members.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex-1 h-11 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!allPaymentsComplete()}
          className="flex-1 h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Registration <Send size={16} />
        </button>
      </div>
    </div>
  );
};
export default CodeFusionPaymentForm;
