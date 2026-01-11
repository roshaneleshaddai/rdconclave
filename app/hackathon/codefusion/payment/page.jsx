"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  Check,
  X,
  ChevronRight,
} from "lucide-react";

const API_BASE = "https://rd-backend-7cuu.onrender.com/api/payment";

const CoinFlip = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full">
      <div className="w-24 h-24 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-base font-semibold text-blue-900">
        Processing Submission...
      </p>
    </div>
  </div>
);

const VerificationLoadingModal = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <div className="animate-spin">
            <CheckCircle size={32} className="text-blue-900" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-blue-900 mb-2">Verifying Team</h2>
        <p className="text-sm text-gray-600">
          Please wait while we verify your team ID...
        </p>
      </div>
    </div>
  </div>
);

const SuccessModal = ({ registrationId, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Payment Submitted Successfully
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Confirmation mail will be received within 48 hours
        </p>
        {/* <div className="bg-blue-900 rounded-lg p-4 mb-4">
          <p className="text-xs text-blue-100 mb-1 font-semibold">Final Team ID</p>
          <p className="text-xl sm:text-2xl font-bold text-white break-all">{registrationId}</p>
        </div> */}
        {/* <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 mb-4 flex items-start gap-2">
          <Mail size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-green-800 font-bold text-xs mb-1">Confirmation Email Sent!</p>
            <p className="text-green-700 text-xs">Check your email inbox (including spam folder)</p>
          </div>
        </div> */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-lg transition-all hover:bg-blue-950 hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Error</h2>
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 text-base font-bold text-white bg-blue-900 rounded-lg shadow-lg transition-all hover:bg-blue-950 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900 mb-3">
          Confirm Submission
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please verify that all information is correct and all payment proofs
          have been uploaded before submitting.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-blue-900 bg-gray-200 rounded-lg transition-all hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all hover:from-purple-700 hover:to-purple-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center flex-shrink-0">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
            i < currentStep
              ? "bg-blue-900 text-white"
              : i === currentStep
              ? "bg-purple-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {i < currentStep ? <Check size={16} /> : i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div
            className={`w-6 sm:w-8 md:w-12 h-0.5 mx-1 transition-all ${
              i < currentStep ? "bg-blue-900" : "bg-gray-300"
            }`}
          ></div>
        )}
      </div>
    ))}
  </div>
);

const CodeFusionPaymentForm = () => {
  const [step, setStep] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const collegeOptions = [
     'SRM University AP – Amaravati region',
     'VIT-AP University – Amaravati region',
    'Velagapudi Ramakrishna Siddhartha Engineering College – Vijayawada',
     'Siddhartha Academy of Higher Education – Vijayawada',
     'Prasad V Potluri Siddhartha Institute of Technology (PVPSIT) – Vijayawada',
     'Gudlavalleru Engineering College – Gudlavalleru',
     'Dhanekula Institute of Engineering & Technology – Vijayawada',
     'Andhra Loyola College – Vijayawada',
     'Aditya Engineering College',
     'KBN College – Vijayawada',
    'NRI Institute of Technology, Agiripalli',
     'Jawaharlal Nehru Technological University Kakinada (JNTUK) – Kakinada',
     'Sri Vishnu Engineering College for Women – Bhimavaram',
     'Sir C. R. Reddy College of Engineering – Eluru',
     'Sri vasavi institute of engineering and technology',
     'Gayatri Vidya Parishad College of Engineering – Visakhapatnam',
     'lakireddy Bali Reddy College of Engineering (LBRCE)',
   'PACE Institute of Technology, Ongole',
    'RVR & JC College of Engineering – Guntur',
     'Vignan\'s Foundation for Science, Technology & Research – Guntur',
     'Vasireddy Venkatadri Institute of Technology (VVIT) – Guntur',
     'Bapatla Engineering College – Bapatla',
     'DVR & DR HS MIC COLLEGE OF TECHNOLOGY ',
     'KL University – Vaddeswaram',
     'Vignan nirula institute of technology and science for women',
     'Vignan LARA Institute of Technology & Science',
     'Kakatiya institute of technology and science warangal',
     'VKR VNB & AGK COLLEGE OF ENGINEERING',
   'Visvesvaraya College of Engineering and Technology',
     'Jawaharlal Nehru Technological University Narasaraopet',
     'P.B. Siddhartha College of Arts & Science Vijayawada, AP',
     'Swarnandhra College of Engineering and Technology',
     'Others'
  ];

  const [formData, setFormData] = useState({
    teamId: "",
    teamName: "",
    problemDomain: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    leaderCollege: "",
    leaderYear: "",
    leaderPaymentProof: null,
    leaderTransactionId: "",
    member2Name: "",
    member2Phone: "",
    member2College: "",
    member2Email: "",
    member2PaymentProof: null,
    member2TransactionId: "",
    member3Name: "",
    member3Phone: "",
    member3College: "",
    member3Email: "",
    member3PaymentProof: null,
    member3TransactionId: "",
    member4Name: "",
    member4Phone: "",
    member4College: "",
    member4Email: "",
    member4PaymentProof: null,
    member4TransactionId: "",
  });

  const totalSteps = teamSize === 0 ? 3 : 2 + teamSize;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ""));

  const handleTeamVerification = async () => {
    if (!formData.teamId.trim()) {
      setErrors({ teamId: "Team ID is required" });
      return;
    }
    setIsVerifying(true);
    try {
      const response = await fetch(`${API_BASE}/verify-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: formData.teamId }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setApiError(data.message || "Team verification failed");
        setShowErrorModal(true);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        teamName: data.team.teamName,
        problemDomain: data.team.problemStatement,
      }));
      setStep(1);
      setErrors({});
    } catch (error) {
      setApiError("Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "Only image files allowed (JPG, PNG, etc.)",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "File size must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (teamSize === 0) newErrors.teamSize = "Please select a team size";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLeader = () => {
    const newErrors = {};
    if (!formData.leaderName.trim()) newErrors.leaderName = "Name is required";
    if (!formData.leaderEmail.trim())
      newErrors.leaderEmail = "Email is required";
    else if (!validateEmail(formData.leaderEmail))
      newErrors.leaderEmail = "Invalid email format";
    if (!formData.leaderPhone.trim())
      newErrors.leaderPhone = "Phone number is required";
    else if (!validatePhone(formData.leaderPhone))
      newErrors.leaderPhone = "Phone must be 10 digits";
    if (!formData.leaderCollege)
      newErrors.leaderCollege = "College is required";
    if (!formData.leaderYear)
      newErrors.leaderYear = "Year of study is required";
    if (!formData.leaderPaymentProof)
      newErrors.leaderPaymentProof = "Payment proof is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMember = (memberNum) => {
    const newErrors = {};
    const prefix = `member${memberNum}`;
    if (!formData[`${prefix}Name`]?.trim())
      newErrors[`${prefix}Name`] = "Name is required";
    if (!formData[`${prefix}Phone`]?.trim())
      newErrors[`${prefix}Phone`] = "Phone is required";
    else if (!validatePhone(formData[`${prefix}Phone`]))
      newErrors[`${prefix}Phone`] = "Phone must be 10 digits";
    if (!formData[`${prefix}College`])
      newErrors[`${prefix}College`] = "College is required";
    if (!formData[`${prefix}Email`]?.trim())
      newErrors[`${prefix}Email`] = "Email is required";
    else if (!validateEmail(formData[`${prefix}Email`]))
      newErrors[`${prefix}Email`] = "Invalid email";
    if (!formData[`${prefix}PaymentProof`])
      newErrors[`${prefix}PaymentProof`] = "Payment proof is required";
    if (!formData[`${prefix}TransactionId`]?.trim()) {
      newErrors[`${prefix}TransactionId`] = "Transaction ID is required";
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("teamId", formData.teamId);
      formDataToSend.append("teamName", formData.teamName);
      formDataToSend.append("problemStatement", formData.problemDomain);

      formDataToSend.append("leaderName", formData.leaderName);
      formDataToSend.append("leaderEmail", formData.leaderEmail);
      formDataToSend.append("leaderPhone", formData.leaderPhone);
      formDataToSend.append("leaderCollege", formData.leaderCollege);
      formDataToSend.append("leaderPaymentProof", formData.leaderPaymentProof);

      formDataToSend.append("member2Name", formData.member2Name);
      formDataToSend.append("member2Email", formData.member2Email);
      formDataToSend.append("member2Phone", formData.member2Phone);
      formDataToSend.append("member2College", formData.member2College);
      formDataToSend.append(
        "member2PaymentProof",
        formData.member2PaymentProof
      );

      formDataToSend.append("member3Name", formData.member3Name);
      formDataToSend.append("member3Email", formData.member3Email);
      formDataToSend.append("member3Phone", formData.member3Phone);
      formDataToSend.append("member3College", formData.member3College);
      formDataToSend.append(
        "member3PaymentProof",
        formData.member3PaymentProof
      );

      formDataToSend.append(
        "leaderTransactionId",
        formData.leaderTransactionId
      );

      // Member 2
      formDataToSend.append(
        "member2TransactionId",
        formData.member2TransactionId
      );

      // Member 3
      formDataToSend.append(
        "member3TransactionId",
        formData.member3TransactionId
      );

      // Member 4 (Conditional)
      if (teamSize === 4) {
        formDataToSend.append(
          "member4TransactionId",
          formData.member4TransactionId
        );
      }

      if (teamSize === 4) {
        formDataToSend.append("member4Name", formData.member4Name);
        formDataToSend.append("member4Email", formData.member4Email);
        formDataToSend.append("member4Phone", formData.member4Phone);
        formDataToSend.append("member4College", formData.member4College);
        formDataToSend.append(
          "member4PaymentProof",
          formData.member4PaymentProof
        );
      }

      formDataToSend.append("paymentId", "PENDING");
      formDataToSend.append("amount", teamSize * 250);

      const response = await fetch(`${API_BASE}/pay`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setApiError(data.message || "Submission failed. Please try again.");
        setShowErrorModal(true);
        return;
      }

      setRegistrationId(data.finalTeamId);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        teamId: "",
        teamName: "",
        problemDomain: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        leaderCollege: "",
        leaderYear: "",
        leaderPaymentProof: null,
        leaderTransactionId: "",
        member2Name: "",
        member2Phone: "",
        member2College: "",
        member2Email: "",
        member2PaymentProof: null,
        member2TransactionId: "",
        member3Name: "",
        member3Phone: "",
        member3College: "",
        member3Email: "",
        member3PaymentProof: null,
        member3TransactionId: "",
        member4Name: "",
        member4Phone: "",
        member4College: "",
        member4Email: "",
        member4PaymentProof: null,
        member4TransactionId: "",
      });
      setTeamSize(0);
      setStep(0);
    } catch (error) {
      setApiError("Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pt-20 pb-8 font-sans mt-20">
      {isLoading && <CoinFlip />}
      {isVerifying && <VerificationLoadingModal />}
      {showSuccessModal && (
        <SuccessModal
          registrationId={registrationId}
          onClose={() => {
            setShowSuccessModal(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
      {showErrorModal && (
        <ErrorModal
          message={apiError}
          onClose={() => setShowErrorModal(false)}
        />
      )}
      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleFinalSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={() =>
            step === 0 ? window.history.back() : setStep(step - 1)
          }
          className="flex items-center gap-2 text-blue-900 mb-4 font-semibold text-sm hover:text-purple-600 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="text-center mt-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Payment Registration
          </h1>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto mb-3"></div>
          <p className="text-xs sm:text-sm text-gray-600">
            CodeFusion 2025 • Payment & Verification Portal
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {step > 0 && (
          <StepIndicator currentStep={step} totalSteps={totalSteps} />
        )}

        <div className="bg-white border-2 border-blue-900/10 rounded-xl shadow-lg p-4 mt-12 sm:p-6 md:p-8">
          {step === 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-blue-900">
                  Team Verification
                </h2>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-bold text-blue-900 mb-1.5">
                  Team ID *
                </label>
                <input
                  type="text"
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                    errors.teamId
                      ? "border-red-500"
                      : "border-blue-900/20 focus:border-blue-900"
                  }`}
                  placeholder="Enter your team ID"
                />
                {errors.teamId && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.teamId}
                  </p>
                )}
              </div>
              <button
                onClick={handleTeamVerification}
                disabled={isVerifying}
                className="w-full h-11 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md transition-all hover:from-purple-700 hover:to-purple-900 hover:scale-105 disabled:opacity-50"
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
              onPrevious={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <MemberDetailsSection
              memberNum={2}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(2)}
            />
          )}
          {step === 4 && teamSize >= 3 && (
            <MemberDetailsSection
              memberNum={3}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(3)}
              teamSize={teamSize}
            />
          )}
          {step === 5 && teamSize === 4 && (
            <MemberDetailsSection
              memberNum={4}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              errors={errors}
              collegeOptions={collegeOptions}
              onNext={handleNextStep}
              onPrevious={() => setStep(4)}
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

const TeamDetailsSection = ({
  formData,
  teamSize,
  setTeamSize,
  setErrors,
  onNext,
  onPrevious,
  errors,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-5">
      <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
        <Users size={18} className="text-white" />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-blue-900">
        Team Details
      </h2>
    </div>
    <div className="space-y-4 mb-5">
      <div>
        <label className="block text-sm font-bold text-blue-900 mb-1.5">
          Team Name *
        </label>
        <input
          type="text"
          value={formData.teamName}
          disabled
          className="w-full h-11 px-4 border-2 rounded-lg outline-none text-sm bg-gray-100 border-blue-900/20 text-gray-700 cursor-not-allowed"
          placeholder="Auto-filled from verification"
        />
        <p className="text-xs text-gray-500 mt-1">
          Auto-filled from team verification
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Team Size *
          </label>
          <select
            value={teamSize}
            onChange={(e) => {
              setTeamSize(parseInt(e.target.value));
              setErrors((prev) => ({ ...prev, teamSize: "" }));
            }}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
              errors.teamSize
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
          >
            <option value="0">Select Team Size</option>
            <option value="3">3 Members</option>
            <option value="4">4 Members</option>
          </select>
          {errors.teamSize && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.teamSize}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Problem Statement *
          </label>
          <input
            type="text"
            value={formData.problemDomain}
            disabled
            className="w-full h-11 px-4 border-2 rounded-lg outline-none text-sm bg-gray-100 border-blue-900/20 text-gray-700 cursor-not-allowed"
            placeholder="Auto-filled from verification"
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-filled from team verification
          </p>
        </div>
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
        Next <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const LeaderDetailsSection = ({
  formData,
  handleInputChange,
  handleFileChange,
  errors,
  collegeOptions,
  onNext,
  onPrevious,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-5">
      <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
        <GraduationCap size={18} className="text-white" />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-blue-900">
        Team Leader Details
      </h2>
    </div>
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="leaderName"
            value={formData.leaderName}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.leaderName
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
            placeholder="Enter full name"
          />
          {errors.leaderName && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            name="leaderEmail"
            value={formData.leaderEmail}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.leaderEmail
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
            placeholder="student@email.com"
          />
          {errors.leaderEmail && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderEmail}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="leaderPhone"
            value={formData.leaderPhone}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.leaderPhone
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
            placeholder="10-digit phone number"
            maxLength="10"
          />
          {errors.leaderPhone && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderPhone}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            College/University *
          </label>
          <select
            name="leaderCollege"
            value={formData.leaderCollege}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
              errors.leaderCollege
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
          >
            <option value="">Select College</option>
            {collegeOptions.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
          {errors.leaderCollege && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderCollege}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Year of Study *
          </label>
          <select
            name="leaderYear"
            value={formData.leaderYear}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
              errors.leaderYear
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          {errors.leaderYear && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderYear}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
      <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
        <Info size={16} />
        Payment Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-2">
            Complete Payment
          </label>
          <a
            href="https://vrsec.campx.in/sahe/ums/public/form/695cd13508b4c95ea665f366"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105 flex items-center justify-center"
          >
            Pay Now
          </a>
          <p className="text-xs text-gray-600 mt-1.5">
            Complete your payment to proceed
          </p>
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-2">
            Upload Payment Proof *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "leaderPaymentProof")}
            className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${
              errors.leaderPaymentProof
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
          />
          {formData.leaderPaymentProof && (
            <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
              <Check size={12} />
              {formData.leaderPaymentProof.name?.substring(0, 25)}...
            </p>
          )}
          {errors.leaderPaymentProof && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderPaymentProof}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-900 mb-1.5">
            Transaction ID *
          </label>
          <input
            type="text"
            name="leaderTransactionId" // Matches state key exactly
            value={formData.leaderTransactionId}
            onChange={handleInputChange}
            className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
              errors.leaderTransactionId // Check for Transaction ID error, not Email
                ? "border-red-500"
                : "border-blue-900/20 focus:border-blue-900"
            }`}
            placeholder="TRANSAC12345XYZ"
          />
          {errors.leaderTransactionId && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.leaderTransactionId}
            </p>
          )}
        </div>
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
        Next Member <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const MemberDetailsSection = ({
  memberNum,
  formData,
  handleInputChange,
  handleFileChange,
  errors,
  collegeOptions,
  onNext,
  onPrevious,
  teamSize,
}) => {
  const prefix = `member${memberNum}`;
  const isLastMember = (memberNum === 3 && teamSize === 3) || memberNum === 4;
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
          <Users size={18} className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blue-900">
          Member {memberNum} Details
        </h2>
      </div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name={`${prefix}Name`}
              value={formData[`${prefix}Name`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Name`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
              placeholder="Enter full name"
            />
            {errors[`${prefix}Name`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}Name`]}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name={`${prefix}Phone`}
              value={formData[`${prefix}Phone`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Phone`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
              placeholder="10-digit phone number"
              maxLength="10"
            />
            {errors[`${prefix}Phone`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}Phone`]}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">
              College/University *
            </label>
            <select
              name={`${prefix}College`}
              value={formData[`${prefix}College`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none text-sm cursor-pointer transition-all ${
                errors[`${prefix}College`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
            >
              <option value="">Select College</option>
              {collegeOptions.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            {errors[`${prefix}College`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}College`]}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name={`${prefix}Email`}
              value={formData[`${prefix}Email`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}Email`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
              placeholder="student@email.com"
            />
            {errors[`${prefix}Email`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}Email`]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-900/5 to-purple-600/5 border-2 border-blue-900/10 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Info size={16} />
          Payment Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">
              Complete Payment
            </label>
            <a
              href="https://vrsec.campx.in/sahe/ums/public/form/695cd13508b4c95ea665f366"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-12 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow-md transition-all hover:from-blue-950 hover:to-black hover:scale-105 flex items-center justify-center"
            >
              Pay Now
            </a>
            <p className="text-xs text-gray-600 mt-1.5">
              Complete your payment to proceed
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">
              Upload Payment Proof *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, `${prefix}PaymentProof`)}
              className={`w-full px-3 py-2.5 border-2 rounded-lg outline-none transition-all cursor-pointer text-sm ${
                errors[`${prefix}PaymentProof`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
            />
            {formData[`${prefix}PaymentProof`] && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <Check size={12} />
                {formData[`${prefix}PaymentProof`].name?.substring(0, 25)}...
              </p>
            )}
            {errors[`${prefix}PaymentProof`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}PaymentProof`]}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-1.5">
              Transaction ID *
            </label>
            <input
              type="text"
              name={`${prefix}TransactionId`} // This becomes member2TransactionId, etc.
              value={formData[`${prefix}TransactionId`]}
              onChange={handleInputChange}
              className={`w-full h-11 px-4 border-2 rounded-lg outline-none transition-all text-sm ${
                errors[`${prefix}TransactionId`]
                  ? "border-red-500"
                  : "border-blue-900/20 focus:border-blue-900"
              }`}
              placeholder="TRANSAC12345XYZ"
            />
            {errors[`${prefix}TransactionId`] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors[`${prefix}TransactionId`]}
              </p>
            )}
          </div>
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
          {isLastMember ? "Review & Submit" : "Next Member"}{" "}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const FinalReviewSection = ({ formData, teamSize, onConfirm, onPrevious }) => {
  const isUploaded = (key) => formData[key] !== null;
  const allPaymentsComplete = () => {
    if (!isUploaded("leaderPaymentProof")) return false;
    if (!isUploaded("member2PaymentProof")) return false;
    if (!isUploaded("member3PaymentProof")) return false;
    if (teamSize === 4 && !isUploaded("member4PaymentProof")) return false;
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
          <Info size={16} />
          Payment Status
        </h3>
        {[
          ["Team Leader", "leaderPaymentProof"],
          ["Member 2", "member2PaymentProof"],
          ["Member 3", "member3PaymentProof"],
          ...(teamSize === 4 ? [["Member 4", "member4PaymentProof"]] : []),
        ].map(([label, key]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm mb-2"
          >
            <span className="font-semibold text-sm">{label}</span>
            {isUploaded(key) ? (
              <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                <CheckCircle size={16} />
                Uploaded
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 font-bold text-xs">
                <X size={16} />
                Pending
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
