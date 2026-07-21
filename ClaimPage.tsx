import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Camera,
  FileText,
  Check,
  Clock,
  AlertCircle,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  IndianRupee,
  Heart,
  Car,
  Shield,
  CheckCircle,
  XCircle,
  ArrowRight,
  Plus,
  Image,
  File,
  Trash2,
  Info,
  Building,
  Stethoscope,
  Wrench,
  AlertTriangle,
  Search,
} from "lucide-react";

interface TimelineStep {
  step: string;
  date: string;
  completed: boolean;
  current?: boolean;
  rejected?: boolean;
}

interface ClaimData {
  id: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  policyName: string;
  description: string;
  amount: string;
  status: string;
  statusText: string;
  date: string;
  settledAmount?: string;
  rejectionReason?: string;
  timeline: TimelineStep[];
}

interface ClaimPageProps {
  setCurrentScreen: (screen: string) => void;
  policyId?: number;
}

// Existing claims data
const existingClaims: ClaimData[] = [
  {
    id: "CLM-2026-001",
    type: "Health",
    icon: Heart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    policyName: "Indus Health Elite",
    description: "Hospitalization - Apollo Hospital",
    amount: "₹45,000",
    status: "approved",
    statusText: "Approved",
    date: "15 Jun 2026",
    settledAmount: "₹43,500",
    timeline: [
      { step: "Claim Filed", date: "15 Jun 2026", completed: true },
      { step: "Documents Verified", date: "16 Jun 2026", completed: true },
      { step: "Under Review", date: "17 Jun 2026", completed: true },
      { step: "Approved", date: "18 Jun 2026", completed: true },
      { step: "Amount Settled", date: "19 Jun 2026", completed: true },
    ],
  },
  {
    id: "CLM-2026-002",
    type: "Motor",
    icon: Car,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    policyName: "Comprehensive Motor",
    description: "Windshield Replacement",
    amount: "₹12,000",
    status: "processing",
    statusText: "In Progress",
    date: "10 Jul 2026",
    timeline: [
      { step: "Claim Filed", date: "10 Jul 2026", completed: true },
      { step: "Documents Verified", date: "11 Jul 2026", completed: true },
      { step: "Surveyor Assigned", date: "12 Jul 2026", completed: true },
      { step: "Under Review", date: "13 Jul 2026", completed: false, current: true },
      { step: "Approval", date: "Pending", completed: false },
      { step: "Settlement", date: "Pending", completed: false },
    ],
  },
  {
    id: "CLM-2025-015",
    type: "Health",
    icon: Heart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    policyName: "Family Floater Health",
    description: "OPD Consultation",
    amount: "₹2,500",
    status: "rejected",
    statusText: "Rejected",
    date: "20 Dec 2025",
    rejectionReason: "Claim filed after 30-day window",
    timeline: [
      { step: "Claim Filed", date: "20 Dec 2025", completed: true },
      { step: "Documents Verified", date: "21 Dec 2025", completed: true },
      { step: "Under Review", date: "22 Dec 2025", completed: true },
      { step: "Rejected", date: "23 Dec 2025", completed: true, rejected: true },
    ],
  },
];

// Claim types for filing
const claimTypes = [
  {
    id: "hospitalization",
    name: "Hospitalization",
    icon: Building,
    desc: "Inpatient treatment claims",
    policyTypes: ["Health"],
  },
  {
    id: "opd",
    name: "OPD / Daycare",
    icon: Stethoscope,
    desc: "Outpatient & daycare procedures",
    policyTypes: ["Health"],
  },
  {
    id: "accident",
    name: "Accident Damage",
    icon: AlertTriangle,
    desc: "Vehicle accident claims",
    policyTypes: ["Motor"],
  },
  {
    id: "theft",
    name: "Theft / Total Loss",
    icon: Shield,
    desc: "Vehicle theft or total loss",
    policyTypes: ["Motor"],
  },
  {
    id: "ownDamage",
    name: "Own Damage",
    icon: Wrench,
    desc: "Repairs, windshield, parts",
    policyTypes: ["Motor"],
  },
  {
    id: "death",
    name: "Death Claim",
    icon: Heart,
    desc: "Life insurance death benefit",
    policyTypes: ["Life"],
  },
];

// Policies for claim filing
const policies = [
  { id: 1, name: "Indus Health Elite", type: "Health", icon: Heart, number: "IND-HLT-2024-789456" },
  { id: 2, name: "Comprehensive Motor", type: "Motor", icon: Car, number: "IND-MTR-2025-123456" },
  { id: 3, name: "Family Floater Health", type: "Health", icon: Heart, number: "IND-HLT-2024-456789" },
  { id: 6, name: "Term Life Insurance", type: "Life", icon: Shield, number: "IND-LIF-2023-TRM789" },
];

const ClaimPage: React.FC<ClaimPageProps> = ({ setCurrentScreen, policyId }) => {
  const [activeTab, setActiveTab] = useState<"track" | "file">("track");
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [showFileClaimFlow, setShowFileClaimFlow] = useState(false);
  const [fileClaimStep, setFileClaimStep] = useState(1);
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(policyId || null);
  const [selectedClaimType, setSelectedClaimType] = useState<string | null>(null);
  const [claimAmount, setClaimAmount] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile = `Document_${uploadedFiles.length + 1}.pdf`;
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmitClaim = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetClaimFlow = () => {
    setShowFileClaimFlow(false);
    setFileClaimStep(1);
    setSelectedPolicy(null);
    setSelectedClaimType(null);
    setClaimAmount("");
    setClaimDescription("");
    setUploadedFiles([]);
    setSubmitted(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-3 h-3" />;
      case "processing":
        return <Clock className="w-3 h-3" />;
      case "rejected":
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const filteredClaims = existingClaims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClaimData = existingClaims.find((c) => c.id === selectedClaim);
  const selectedPolicyData = policies.find((p) => p.id === selectedPolicy);
  const filteredClaimTypes = selectedPolicyData
    ? claimTypes.filter((ct) => ct.policyTypes.includes(selectedPolicyData.type))
    : [];

  // Claim submitted success screen
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-500 to-emerald-600">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-white text-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Claim Submitted!</h1>
          <p className="text-green-100 mt-2">
            Your claim has been registered successfully
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 mt-8 w-full max-w-xs">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-80">Claim ID</span>
                <span className="font-semibold">CLM-2026-003</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Policy</span>
                <span className="font-semibold">{selectedPolicyData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Amount</span>
                <span className="font-bold text-lg">₹{claimAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Status</span>
                <span className="font-semibold">Under Review</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/10 rounded-xl p-4 w-full max-w-xs">
            <p className="text-sm opacity-90">
              📧 Confirmation sent to rashmi@email.com
            </p>
            <p className="text-xs opacity-70 mt-1">
              Expected resolution: 5-7 business days
            </p>
          </div>

          <div className="mt-8 space-y-3 w-full max-w-xs">
            <button
              onClick={() => {
                resetClaimFlow();
                setActiveTab("track");
              }}
              className="w-full py-3.5 bg-white text-green-600 font-bold rounded-xl"
            >
              Track Your Claim
            </button>
            <button
              onClick={() => setCurrentScreen("insurance_hub")}
              className="w-full py-3.5 bg-white/20 text-white font-semibold rounded-xl"
            >
              Back to IndusShield Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Claim details view
  if (selectedClaimData) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-[#98272A] text-white px-4 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setSelectedClaim(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Claim Details</h1>
              <p className="text-xs text-red-200">{selectedClaimData.id}</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white/15 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${selectedClaimData.iconBg} flex items-center justify-center`}>
                  <selectedClaimData.icon className={`w-6 h-6 ${selectedClaimData.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-bold">{selectedClaimData.policyName}</p>
                  <p className="text-xs opacity-80">{selectedClaimData.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{selectedClaimData.amount}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedClaimData.status === "approved" ? "bg-green-400/30" :
                  selectedClaimData.status === "processing" ? "bg-blue-400/30" : "bg-red-400/30"
                }`}>
                  {selectedClaimData.statusText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Settlement Info (if approved) */}
          {selectedClaimData.status === "approved" && selectedClaimData.settledAmount && (
            <div className="p-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900">Claim Settled</p>
                    <p className="text-xs text-green-700">
                      Amount credited to your IndusInd account ****4471
                    </p>
                  </div>
                  <p className="text-lg font-bold text-green-700">
                    {selectedClaimData.settledAmount}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Reason (if rejected) */}
          {selectedClaimData.status === "rejected" && selectedClaimData.rejectionReason && (
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Claim Rejected</p>
                    <p className="text-xs text-red-700 mt-0.5">
                      Reason: {selectedClaimData.rejectionReason}
                    </p>
                    <button className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
                      Appeal Decision
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Claim Timeline */}
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-700 mb-4">Claim Timeline</p>
            <div className="relative">
              {selectedClaimData.timeline.map((step, i) => (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? step.rejected
                          ? "bg-red-500"
                          : "bg-green-500"
                        : step.current
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-200"
                    }`}>
                      {step.completed ? (
                        step.rejected ? (
                          <X className="w-4 h-4 text-white" />
                        ) : (
                          <Check className="w-4 h-4 text-white" />
                        )
                      ) : step.current ? (
                        <Clock className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </div>
                    {i < selectedClaimData.timeline.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${
                        step.completed ? "bg-green-300" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <p className={`text-sm font-semibold ${
                      step.current ? "text-blue-600" : step.completed ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {step.step}
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      step.current ? "text-blue-500" : "text-gray-400"
                    }`}>
                      {step.date}
                    </p>
                    {step.current && (
                      <p className="text-xs text-blue-600 mt-1 bg-blue-50 px-2 py-1 rounded-lg inline-block">
                        Currently in progress
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Claim Details */}
          <div className="p-4 pt-0">
            <p className="text-sm font-semibold text-gray-700 mb-3">Claim Information</p>
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Claim ID</span>
                <span className="font-semibold text-gray-900">{selectedClaimData.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Filed On</span>
                <span className="font-semibold text-gray-900">{selectedClaimData.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Claim Type</span>
                <span className="font-semibold text-gray-900">{selectedClaimData.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Claim Amount</span>
                <span className="font-semibold text-gray-900">{selectedClaimData.amount}</span>
              </div>
              {selectedClaimData.settledAmount && (
                <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-500">Settled Amount</span>
                  <span className="font-bold text-green-600">{selectedClaimData.settledAmount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="p-4 pt-0">
            <p className="text-sm font-semibold text-gray-700 mb-3">Submitted Documents</p>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {["Discharge Summary.pdf", "Bills & Invoices.pdf", "ID Proof.pdf"].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700">
            <Phone className="w-4 h-4" />
            Call Support
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#98272A] rounded-xl text-sm font-bold text-white">
            <MessageCircle className="w-4 h-4" />
            Chat with Us
          </button>
        </div>
      </div>
    );
  }

  // File claim flow
  if (showFileClaimFlow) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-[#98272A] text-white px-4 pt-10 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => {
                if (fileClaimStep > 1) {
                  setFileClaimStep(fileClaimStep - 1);
                } else {
                  resetClaimFlow();
                }
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">File a Claim</h1>
              <p className="text-xs text-red-200">Step {fileClaimStep} of 4</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  fileClaimStep >= step ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Step 1: Select Policy */}
          {fileClaimStep === 1 && (
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Select Policy
              </p>
              <div className="space-y-3">
                {policies.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => setSelectedPolicy(policy.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedPolicy === policy.id
                        ? "border-[#98272A] bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPolicy === policy.id
                          ? "border-[#98272A] bg-[#98272A]"
                          : "border-gray-300"
                      }`}>
                        {selectedPolicy === policy.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <policy.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {policy.name}
                        </p>
                        <p className="text-xs text-gray-500">{policy.number}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {policy.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Claim Type */}
          {fileClaimStep === 2 && (
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                What type of claim?
              </p>
              <div className="space-y-3">
                {filteredClaimTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedClaimType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedClaimType === type.id
                        ? "border-[#98272A] bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedClaimType === type.id
                          ? "border-[#98272A] bg-[#98272A]"
                          : "border-gray-300"
                      }`}>
                        {selectedClaimType === type.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <type.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {type.name}
                        </p>
                        <p className="text-xs text-gray-500">{type.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Info Card */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Cashless Option Available
                    </p>
                    <p className="text-xs text-blue-700 mt-0.5">
                      For hospitalization, visit any of our 8,500+ network hospitals for cashless treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Claim Details */}
          {fileClaimStep === 3 && (
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Claim Amount (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#98272A] focus:ring-2 focus:ring-[#98272A]/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Date of Incident/Treatment
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#98272A] focus:ring-2 focus:ring-[#98272A]/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  placeholder="Describe your claim in detail..."
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#98272A] focus:ring-2 focus:ring-[#98272A]/10 resize-none"
                />
              </div>

              {selectedPolicyData?.type === "Motor" && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Incident Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#98272A] focus:ring-2 focus:ring-[#98272A]/10"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {fileClaimStep === 4 && (
            <div className="p-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Upload Documents
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Upload all relevant bills, prescriptions, and reports
                </p>

                {/* Upload Area */}
                <button
                  onClick={handleFileUpload}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#98272A] hover:bg-red-50/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    Tap to upload files
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG • Max 10MB each
                  </p>
                </button>

                {/* Quick Upload Options */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleFileUpload}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700"
                  >
                    <Camera className="w-4 h-4" />
                    Camera
                  </button>
                  <button
                    onClick={handleFileUpload}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700"
                  >
                    <Image className="w-4 h-4" />
                    Gallery
                  </button>
                  <button
                    onClick={handleFileUpload}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700"
                  >
                    <File className="w-4 h-4" />
                    Files
                  </button>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Uploaded ({uploadedFiles.length})
                  </p>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file}</p>
                            <p className="text-xs text-gray-400">1.2 MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(i)}
                          className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Documents Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  Required Documents
                </p>
                <ul className="space-y-1">
                  {selectedPolicyData?.type === "Health" ? (
                    <>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Discharge Summary
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Hospital Bills & Invoices
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Prescription & Reports
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> ID Proof
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> FIR Copy (if applicable)
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Damage Photos
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Repair Estimate
                      </li>
                      <li className="text-xs text-amber-700 flex items-center gap-2">
                        <Check className="w-3 h-3" /> Driving License & RC
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          {fileClaimStep < 4 ? (
            <button
              onClick={() => setFileClaimStep(fileClaimStep + 1)}
              disabled={
                (fileClaimStep === 1 && !selectedPolicy) ||
                (fileClaimStep === 2 && !selectedClaimType) ||
                (fileClaimStep === 3 && !claimAmount)
              }
              className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                ((fileClaimStep === 1 && selectedPolicy) ||
                  (fileClaimStep === 2 && selectedClaimType) ||
                  (fileClaimStep === 3 && claimAmount))
                  ? "bg-[#98272A] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitClaim}
              disabled={uploadedFiles.length === 0 || submitting}
              className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                uploadedFiles.length > 0 && !submitting
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit Claim
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Main claims page
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#98272A] text-white px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Claims</h1>
            <p className="text-xs text-red-200">File & track your claims</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="bg-white/15 rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab("track")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "track" ? "bg-white text-[#98272A]" : "text-white"
            }`}
          >
            Track Claims
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "file" ? "bg-white text-[#98272A]" : "text-white"
            }`}
          >
            File New Claim
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "track" ? (
          <>
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Claim ID or Policy..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#98272A]"
                />
              </div>
            </div>

            {/* Claims List */}
            <div className="px-4 space-y-3">
              {filteredClaims.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No claims found</p>
                </div>
              ) : (
                filteredClaims.map((claim) => (
                  <button
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim.id)}
                    className="w-full bg-white rounded-xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-xl ${claim.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <claim.icon className={`w-5 h-5 ${claim.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {claim.policyName}
                          </p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${getStatusColor(claim.status)}`}>
                            {getStatusIcon(claim.status)}
                            {claim.statusText}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {claim.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{claim.id}</span>
                          <span className="text-sm font-bold text-gray-900">
                            {claim.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Claim Stats */}
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Claim Statistics
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-green-600">1</p>
                  <p className="text-[10px] text-gray-500 mt-1">Approved</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-blue-600">1</p>
                  <p className="text-[10px] text-gray-500 mt-1">In Progress</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-red-600">1</p>
                  <p className="text-[10px] text-gray-500 mt-1">Rejected</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4">
            {/* File New Claim Card */}
            <button
              onClick={() => setShowFileClaimFlow(true)}
              className="w-full bg-gradient-to-r from-[#98272A] to-[#c13a3d] rounded-xl p-5 text-white text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plus className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold">File a New Claim</p>
                  <p className="text-sm opacity-80 mt-0.5">
                    Submit your claim in 4 easy steps
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </div>
            </button>

            {/* Quick Tips */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Before You File
              </p>
              <div className="space-y-3">
                {[
                  { icon: Clock, title: "File Within 30 Days", desc: "Submit claims within 30 days of treatment/incident" },
                  { icon: FileText, title: "Keep Original Documents", desc: "Retain all original bills and prescriptions" },
                  { icon: Camera, title: "Clear Photos", desc: "Take clear photos of all documents" },
                  { icon: Phone, title: "24/7 Support", desc: "Call 1800-123-4567 for claim assistance" },
                ].map((tip, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{tip.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cashless Network */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">
                    Cashless Treatment
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    8,500+ network hospitals for cashless claims
                  </p>
                </div>
                <button className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  Find Hospital
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB for filing claim */}
      {activeTab === "track" && (
        <button
          onClick={() => {
            setActiveTab("file");
            setShowFileClaimFlow(true);
          }}
          className="absolute bottom-6 right-4 w-14 h-14 bg-[#98272A] text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ClaimPage;
