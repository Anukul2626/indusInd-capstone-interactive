import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Check,
  Shield,
  CreditCard,
  FileText,
  ArrowRight,
  Smartphone,
  Building2,
  Lock,
  CheckCircle,
  Fingerprint,
  Eye,
  EyeOff,
  RefreshCw,
  Link,
  Database,
  Heart,
  Wallet,
  Clock,
  Star,
  Download,
  Share2,
  Phone,
  Mail,
  Calendar,
  Users,
  BadgeCheck,
  Loader2,
} from "lucide-react";

interface BuyPolicyFlowProps {
  setCurrentScreen: (screen: string) => void;
  selectedPlan?: any;
  category?: string;
}

const BuyPolicyFlow: React.FC<BuyPolicyFlowProps> = ({
  setCurrentScreen,
  selectedPlan,
  category = "health",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // e-KYC States
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [panVerified, setPanVerified] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  
  // KYC Data (simulated response)
  const [kycData, setKycData] = useState<any>(null);
  
  // Account Aggregator States
  const [aaConsent, setAaConsent] = useState(false);
  const [aaConnecting, setAaConnecting] = useState(false);
  const [aaConnected, setAaConnected] = useState(false);
  const [selectedFips, setSelectedFips] = useState<string[]>([]);
  const [aaData, setAaData] = useState<any>(null);
  
  // Nominee States
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [nomineeDob, setNomineeDob] = useState("");
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "enach" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [bankAccount, setBankAccount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [mandateCreated, setMandateCreated] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Policy States
  const [policyIssued, setPolicyIssued] = useState(false);
  const [policyNumber, setPolicyNumber] = useState("");
  const [bimaSugamId, setBimaSugamId] = useState("");

  // Timer for 3-minute flow
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Default plan if none provided
  const plan = selectedPlan || {
    name: "Indus Health Elite",
    coverage: "₹10,00,000",
    premium: "₹14,999/yr",
    premiumMonthly: "₹1,250/mo",
    provider: "IndusInd Insurance",
  };

  const steps = [
    { id: 1, name: "Plan", icon: FileText },
    { id: 2, name: "e-KYC", icon: Fingerprint },
    { id: 3, name: "Data", icon: Database },
    { id: 4, name: "Nominee", icon: Users },
    { id: 5, name: "Pay", icon: Wallet },
    { id: 6, name: "Policy", icon: Shield },
  ];

  // Aadhaar OTP Send
  const sendAadhaarOtp = () => {
    if (aadhaarNumber.length !== 12) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  // Verify Aadhaar OTP
  const verifyAadhaarOtp = () => {
    if (aadhaarOtp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setAadhaarVerified(true);
      setKycData({
        name: "RASHMI SHARMA",
        dob: "15-03-1992",
        gender: "Female",
        address: "402, Sunshine Apartments, Bandra West, Mumbai - 400050",
        photo: "👩",
      });
      setLoading(false);
    }, 2000);
  };

  // Verify PAN
  const verifyPan = () => {
    if (panNumber.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setPanVerified(true);
      setLoading(false);
    }, 1500);
  };

  // Account Aggregator Connect
  const connectAccountAggregator = () => {
    setAaConnecting(true);
    setTimeout(() => {
      setAaConnecting(false);
      setAaConnected(true);
      setAaData({
        healthRecords: {
          lastCheckup: "12 Jan 2026",
          conditions: "None reported",
          bmi: "22.4 (Normal)",
        },
        financialSummary: {
          avgMonthlyIncome: "₹1,25,000",
          existingPolicies: 2,
          creditScore: 782,
        },
      });
    }, 3000);
  };

  // Verify UPI
  const verifyUpi = () => {
    if (!upiId.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setUpiVerified(true);
      setLoading(false);
    }, 1500);
  };

  // Create e-NACH Mandate
  const createMandate = () => {
    setLoading(true);
    setTimeout(() => {
      setMandateCreated(true);
      setLoading(false);
    }, 2000);
  };

  // Process Payment
  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
      // Auto-advance to policy issuance
      setTimeout(() => {
        setCurrentStep(6);
        issuePolicyViaBimaSugam();
      }, 1000);
    }, 3000);
  };

  // Issue Policy via Bima Sugam
  const issuePolicyViaBimaSugam = () => {
    setLoading(true);
    setTimeout(() => {
      setPolicyIssued(true);
      setPolicyNumber(`INDUS-${category.toUpperCase()}-2026-${Math.random().toString().slice(2, 8)}`);
      setBimaSugamId(`BIMA-${Math.random().toString().slice(2, 10).toUpperCase()}`);
      setLoading(false);
    }, 2500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true;
      case 2: return aadhaarVerified && panVerified;
      case 3: return aaConnected || !aaConsent;
      case 4: return nomineeName && nomineeRelation;
      case 5: return paymentComplete;
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 6 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Policy Issued Success Screen
  if (policyIssued) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-500 to-emerald-600">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Policy Issued!</h1>
          <p className="text-green-100 mt-2">Your policy is now active</p>
          
          {/* Time taken */}
          <div className="flex items-center gap-2 mt-4 bg-white/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Completed in {formatTime(elapsedTime)}</span>
          </div>

          {/* Policy Card */}
          <div className="bg-white rounded-2xl p-5 mt-6 w-full max-w-sm text-left text-gray-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#98272A] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">IndusInd Insurance</p>
                  <p className="text-sm font-bold">{plan.name}</p>
                </div>
              </div>
              <BadgeCheck className="w-8 h-8 text-green-500" />
            </div>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Policy Number</span>
                <span className="font-mono font-semibold text-xs">{policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bima Sugam ID</span>
                <span className="font-mono font-semibold text-xs">{bimaSugamId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sum Insured</span>
                <span className="font-semibold">{plan.coverage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Premium Paid</span>
                <span className="font-semibold text-green-600">{plan.premium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Valid From</span>
                <span className="font-semibold">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Policyholder</span>
                <span className="font-semibold">{kycData?.name || "RASHMI SHARMA"}</span>
              </div>
            </div>

            {/* Bima Sugam Badge */}
            <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-900">Registered on Bima Sugam</p>
                <p className="text-[10px] text-blue-600">India's National Insurance Marketplace</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 w-full max-w-sm">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/20 rounded-xl text-sm font-semibold">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/20 rounded-xl text-sm font-semibold">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Notifications */}
          <div className="mt-6 space-y-2 w-full max-w-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm">
              <Mail className="w-4 h-4" />
              <span>Policy sent to rashmi@email.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm">
              <Phone className="w-4 h-4" />
              <span>SMS confirmation sent to +91 98XXX XXXXX</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="mt-8 w-full max-w-sm py-4 bg-white text-green-600 font-bold rounded-xl"
          >
            Go to IndusShield Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#98272A] text-white px-4 pt-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setCurrentScreen("insurance_hub")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Buy {plan.name}</h1>
              <p className="text-xs text-red-200">3-Minute Instant Policy</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-mono font-semibold">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.id
                      ? "bg-green-500"
                      : currentStep === step.id
                      ? "bg-white text-[#98272A]"
                      : "bg-white/20"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span className="text-[9px] mt-1 opacity-80">{step.name}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 rounded-full ${
                    currentStep > step.id ? "bg-green-400" : "bg-white/20"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Step 1: Plan Summary */}
        {currentStep === 1 && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Coverage</p>
                  <p className="text-lg font-bold text-gray-900">{plan.coverage}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Premium</p>
                  <p className="text-lg font-bold text-[#98272A]">{plan.premium}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Key Benefits</p>
                <div className="flex flex-wrap gap-2">
                  {["Cashless", "No Copay", "8,500+ Hospitals", "OPD Cover"].map((b, i) => (
                    <span key={i} className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Purchase Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">3-Minute Instant Policy</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Complete Aadhaar e-KYC → Verify PAN → Connect Account Aggregator → Pay via UPI → Get Policy Instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-[10px]">IRDAI Approved</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="text-[10px]">256-bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-[10px]">Bima Sugam</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: e-KYC (Aadhaar + PAN) */}
        {currentStep === 2 && (
          <div className="p-4 space-y-4">
            {/* Aadhaar e-KYC */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${aadhaarVerified ? 'bg-green-100' : 'bg-orange-100'}`}>
                  <Fingerprint className={`w-5 h-5 ${aadhaarVerified ? 'text-green-600' : 'text-orange-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Aadhaar e-KYC</p>
                  <p className="text-xs text-gray-500">UIDAI Verified Identity</p>
                </div>
                {aadhaarVerified && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
              </div>

              {!aadhaarVerified ? (
                <>
                  {!otpSent ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                          Aadhaar Number
                        </label>
                        <div className="relative">
                          <input
                            type={showAadhaar ? "text" : "password"}
                            value={aadhaarNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                            placeholder="XXXX XXXX XXXX"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A] font-mono tracking-wider"
                          />
                          <button
                            onClick={() => setShowAadhaar(!showAadhaar)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showAadhaar ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={sendAadhaarOtp}
                        disabled={aadhaarNumber.length !== 12 || loading}
                        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                          aadhaarNumber.length === 12
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Send OTP to Aadhaar-linked Mobile'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-700">OTP sent to mobile ending ***456</span>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                          Enter 6-digit OTP
                        </label>
                        <div className="flex gap-2">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <input
                              key={i}
                              type="text"
                              maxLength={1}
                              value={aadhaarOtp[i] || ''}
                              onChange={(e) => {
                                const newOtp = aadhaarOtp.split('');
                                newOtp[i] = e.target.value;
                                setAadhaarOtp(newOtp.join(''));
                                if (e.target.value && e.target.nextElementSibling) {
                                  (e.target.nextElementSibling as HTMLInputElement).focus();
                                }
                              }}
                              className="w-10 h-12 text-center bg-gray-50 border border-gray-200 rounded-lg text-lg font-bold outline-none focus:border-orange-500"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Resend OTP
                        </button>
                        <span className="text-xs text-gray-400">Valid for 3:00</span>
                      </div>
                      <button
                        onClick={verifyAadhaarOtp}
                        disabled={aadhaarOtp.length !== 6 || loading}
                        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                          aadhaarOtp.length === 6
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Verify OTP'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      {kycData?.photo}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-900">{kycData?.name}</p>
                      <p className="text-xs text-green-700">DOB: {kycData?.dob} • {kycData?.gender}</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">{kycData?.address}</p>
                </div>
              )}
            </div>

            {/* PAN Verification */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${panVerified ? 'bg-green-100' : 'bg-blue-100'}`}>
                  <CreditCard className={`w-5 h-5 ${panVerified ? 'text-green-600' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">PAN Verification</p>
                  <p className="text-xs text-gray-500">Income Tax Department</p>
                </div>
                {panVerified && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
              </div>

              {!panVerified ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase().slice(0, 10))}
                      placeholder="ABCDE1234F"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A] font-mono tracking-wider uppercase"
                    />
                  </div>
                  <button
                    onClick={verifyPan}
                    disabled={panNumber.length !== 10 || loading}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      panNumber.length === 10
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Verify PAN'}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-green-900">{panNumber}</p>
                      <p className="text-xs text-green-700">{kycData?.name}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              )}
            </div>

            {/* UIDAI/IT Dept Info */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Lock className="w-3 h-3" />
                <span className="text-[10px]">UIDAI Secured</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Shield className="w-3 h-3" />
                <span className="text-[10px]">IT Dept Verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Account Aggregator */}
        {currentStep === 3 && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Account Aggregator</p>
                  <p className="text-xs text-gray-500">RBI Licensed Data Sharing</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-4">
                Securely fetch your health and financial data for faster underwriting and better premium rates.
              </p>

              {!aaConsent ? (
                <>
                  {/* FIP Selection */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-gray-700">Select data sources:</p>
                    {[
                      { id: 'health', name: 'Health Records (ABDM)', icon: Heart, desc: 'Medical history & reports' },
                      { id: 'bank', name: 'Bank Statements', icon: Building2, desc: 'Income verification' },
                      { id: 'insurance', name: 'Existing Policies', icon: Shield, desc: 'Policy portability' },
                    ].map((fip) => (
                      <button
                        key={fip.id}
                        onClick={() => {
                          setSelectedFips(prev => 
                            prev.includes(fip.id) 
                              ? prev.filter(f => f !== fip.id)
                              : [...prev, fip.id]
                          );
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                          selectedFips.includes(fip.id)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          selectedFips.includes(fip.id) ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                        }`}>
                          {selectedFips.includes(fip.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <fip.icon className={`w-5 h-5 ${selectedFips.includes(fip.id) ? 'text-purple-600' : 'text-gray-400'}`} />
                        <div className="text-left flex-1">
                          <p className="text-sm font-medium text-gray-900">{fip.name}</p>
                          <p className="text-[10px] text-gray-500">{fip.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Consent */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-600 mb-3">
                      By proceeding, you consent to share your data securely via RBI-regulated Account Aggregator framework. 
                      Your data will only be used for this insurance application.
                    </p>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="consent" className="mt-0.5" onChange={(e) => setAaConsent(e.target.checked)} />
                      <label htmlFor="consent" className="text-xs text-gray-700">
                        I agree to the <span className="text-purple-600 font-semibold">data sharing terms</span> and privacy policy
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={connectAccountAggregator}
                    disabled={!aaConsent || selectedFips.length === 0}
                    className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
                      aaConsent && selectedFips.length > 0
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Link className="w-4 h-4" />
                    Connect & Fetch Data
                  </button>
                </>
              ) : aaConnecting ? (
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                  <p className="text-sm font-semibold text-gray-900">Connecting to Account Aggregator...</p>
                  <p className="text-xs text-gray-500 mt-1">Fetching your data securely</p>
                </div>
              ) : aaConnected ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">Data fetched successfully!</span>
                  </div>

                  {/* Health Data */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Health Summary (ABDM)
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Health Check</span>
                        <span className="font-semibold text-gray-900">{aaData?.healthRecords.lastCheckup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pre-existing Conditions</span>
                        <span className="font-semibold text-green-600">{aaData?.healthRecords.conditions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BMI</span>
                        <span className="font-semibold text-gray-900">{aaData?.healthRecords.bmi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Data */}
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Financial Summary
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Monthly Income</span>
                        <span className="font-semibold text-gray-900">{aaData?.financialSummary.avgMonthlyIncome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Existing Policies</span>
                        <span className="font-semibold text-gray-900">{aaData?.financialSummary.existingPolicies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credit Score</span>
                        <span className="font-semibold text-green-600">{aaData?.financialSummary.creditScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Underwriting Result */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <p className="font-bold">Instant Approval!</p>
                    </div>
                    <p className="text-sm opacity-90">
                      Based on your health and financial data, you qualify for standard rates with no additional premium.
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Skip Option */}
              {!aaConnected && !aaConnecting && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full mt-3 py-2 text-xs text-gray-500 font-medium"
                >
                  Skip for now (manual underwriting may take 24-48 hours)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Nominee Details */}
        {currentStep === 4 && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Nominee Details</p>
                  <p className="text-xs text-gray-500">Who should receive the benefits?</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Nominee Full Name
                  </label>
                  <input
                    type="text"
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    placeholder="Enter nominee's full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Relationship
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Spouse', 'Parent', 'Child', 'Sibling', 'Other'].map((rel) => (
                      <button
                        key={rel}
                        onClick={() => setNomineeRelation(rel)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          nomineeRelation === rel
                            ? 'bg-[#98272A] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Nominee Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={nomineeDob}
                      onChange={(e) => setNomineeDob(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#98272A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Policyholder Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3">Policyholder</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                  {kycData?.photo || '👤'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{kycData?.name || 'RASHMI SHARMA'}</p>
                  <p className="text-xs text-gray-500">DOB: {kycData?.dob || '15-03-1992'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {currentStep === 5 && (
          <div className="p-4 space-y-4">
            {/* Amount Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-gray-900">Payment Summary</p>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                  No cost EMI available
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Premium</span>
                  <span className="text-gray-900">{plan.premium}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>GST (included)</span>
                  <span>₹2,700</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-[#98272A]">{plan.premium}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-3">Payment Method</p>
              <div className="space-y-2">
                {[
                  { id: 'upi', name: 'UPI', desc: 'Pay instantly via UPI', icon: Smartphone },
                  { id: 'enach', name: 'e-NACH Mandate', desc: 'Auto-debit for renewals', icon: Building2 },
                  { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#98272A] bg-red-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? 'border-[#98272A] bg-[#98272A]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-[#98272A]' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{method.name}</p>
                      <p className="text-[10px] text-gray-500">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Enter UPI ID</p>
                {!upiVerified ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A]"
                      />
                    </div>
                    <button
                      onClick={verifyUpi}
                      disabled={!upiId.includes('@') || loading}
                      className={`w-full py-3 rounded-xl text-sm font-semibold ${
                        upiId.includes('@') ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Verify UPI ID'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-semibold text-green-700">{upiId}</span>
                      </div>
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                    {!paymentProcessing && !paymentComplete && (
                      <button
                        onClick={processPayment}
                        className="w-full py-4 bg-green-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-5 h-5" />
                        Pay {plan.premium} via UPI
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* e-NACH Mandate */}
            {paymentMethod === 'enach' && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Setup e-NACH Mandate</p>
                {!mandateCreated ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Bank Account Number</label>
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        placeholder="Enter account number"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">IFSC Code</label>
                      <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                        placeholder="INDB0001234"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A] uppercase"
                      />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-700">
                        <strong>e-NACH Mandate</strong> allows automatic premium deduction on renewal dates. 
                        You can cancel anytime from your bank.
                      </p>
                    </div>
                    <button
                      onClick={createMandate}
                      disabled={!bankAccount || !ifscCode || loading}
                      className={`w-full py-3 rounded-xl text-sm font-semibold ${
                        bankAccount && ifscCode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Create e-NACH Mandate'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-semibold text-green-700">Mandate Created</span>
                      </div>
                      <p className="text-xs text-green-600">
                        A/c: ****{bankAccount.slice(-4)} • Max: ₹50,000/month
                      </p>
                    </div>
                    {!paymentProcessing && !paymentComplete && (
                      <button
                        onClick={processPayment}
                        className="w-full py-4 bg-green-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-5 h-5" />
                        Pay {plan.premium} & Activate Policy
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Payment Processing */}
            {paymentProcessing && (
              <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                <Loader2 className="w-12 h-12 text-[#98272A] animate-spin mx-auto mb-4" />
                <p className="text-sm font-bold text-gray-900">Processing Payment...</p>
                <p className="text-xs text-gray-500 mt-1">Please don't close this screen</p>
              </div>
            )}

            {/* Payment Complete */}
            {paymentComplete && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-green-900">Payment Successful!</p>
                    <p className="text-xs text-green-700">Transaction ID: TXN{Date.now()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Note */}
            <div className="flex items-center justify-center gap-3 py-2">
              <Lock className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] text-gray-400">256-bit SSL Encryption • PCI DSS Compliant</span>
            </div>
          </div>
        )}

        {/* Step 6: Policy Issuance (handled by success screen) */}
        {currentStep === 6 && !policyIssued && (
          <div className="p-4">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <Loader2 className="w-12 h-12 text-[#98272A] animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-gray-900">Issuing Your Policy...</p>
              <p className="text-xs text-gray-500 mt-1">Registering on Bima Sugam Marketplace</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600">Bima Sugam - India's Insurance Marketplace</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {currentStep < 5 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              canProceed()
                ? 'bg-[#98272A] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {currentStep === 4 ? 'Proceed to Payment' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyPolicyFlow;
