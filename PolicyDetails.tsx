import React, { useState } from "react";
import {
  ChevronLeft,
  Heart,
  Car,
  Shield,
  Briefcase,
  Download,
  Phone,
  FileText,
  Check,
  Users,
  User,
  AlertTriangle,
  ChevronRight,
  Copy,
  Share2,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";

interface PolicyDetailsProps {
  setCurrentScreen: (screen: string) => void;
  policyId: number;
}

const policyData: Record<number, any> = {
  1: {
    id: 1,
    name: "Indus Health Elite",
    type: "Health Insurance",
    icon: Heart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    coverage: "₹10,00,000",
    premium: "₹14,999/year",
    member: "Self (Rashmi)",
    memberIcon: User,
    status: "active",
    validFrom: "15 Mar 2024",
    validTill: "14 Mar 2027",
    policyNumber: "IND-HLT-2024-789456",
    sumInsured: "₹10,00,000",
    deductible: "₹0",
    copay: "0%",
    roomRent: "No Limit",
    preExisting: "Covered after 2 years",
    maternity: "Covered after 3 years",
    daycare: "500+ procedures covered",
    networkHospitals: "8,500+",
    claimSettlement: "98.2%",
    renewalBonus: "10% per claim-free year",
    features: [
      "Cashless hospitalization",
      "No room rent capping",
      "Day 1 coverage for accidents",
      "Pre & post hospitalization (60/180 days)",
      "Domiciliary hospitalization",
      "Annual health check-up",
      "Ambulance charges covered",
      "AYUSH treatment covered",
      "Restore benefit - 100%",
      "Air ambulance up to ₹5 lakh",
    ],
    exclusions: [
      "Self-inflicted injuries",
      "Cosmetic treatments",
      "Dental (unless accident)",
      "War and nuclear perils",
    ],
    documents: [
      { name: "Policy Document", size: "2.4 MB" },
      { name: "Health Card", size: "156 KB" },
      { name: "Claim Form", size: "340 KB" },
      { name: "Network Hospital List", size: "1.2 MB" },
    ],
    insurer: "IndusInd Insurance Co. Ltd.",
    insurerLogo: "🏦",
  },
  2: {
    id: 2,
    name: "Comprehensive Motor",
    type: "Motor Insurance",
    icon: Car,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-600",
    coverage: "IDV ₹8,50,000",
    premium: "₹12,480/year",
    member: "Self",
    memberIcon: User,
    status: "expiring",
    validFrom: "01 Aug 2025",
    validTill: "01 Aug 2026",
    policyNumber: "IND-MTR-2025-123456",
    vehicle: "MH 12 AB 3456",
    vehicleType: "Hyundai Creta SX(O)",
    vehicleYear: "2023",
    engineNo: "G4FGDU789456",
    chassisNo: "MALBA51BPGM123456",
    idv: "₹8,50,000",
    ncb: "50%",
    ownDamage: "Covered",
    thirdParty: "Covered (Unlimited)",
    personalAccident: "₹15,00,000",
    features: [
      "Own damage cover",
      "Third-party liability (unlimited)",
      "Personal accident cover - ₹15L",
      "24x7 roadside assistance",
      "Cashless repairs at 4,500+ garages",
      "Zero depreciation add-on",
      "Engine protector add-on",
      "Return to invoice add-on",
      "NCB protection add-on",
      "Key replacement cover",
    ],
    exclusions: [
      "Drunk driving",
      "Driving without valid license",
      "Consequential damage",
      "Normal wear and tear",
    ],
    documents: [
      { name: "Policy Document", size: "1.8 MB" },
      { name: "RC Copy", size: "890 KB" },
      { name: "Claim Form", size: "280 KB" },
      { name: "Garage Network", size: "980 KB" },
    ],
    insurer: "IndusInd General Insurance",
    insurerLogo: "🚗",
  },
  3: {
    id: 3,
    name: "Family Floater Health",
    type: "Health Insurance",
    icon: Heart,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-600",
    coverage: "₹25,00,000",
    premium: "₹28,999/year",
    member: "Family (4 members)",
    memberIcon: Users,
    status: "active",
    validFrom: "01 Dec 2024",
    validTill: "30 Nov 2026",
    policyNumber: "IND-HLT-2024-456789",
    members: [
      { name: "Rashmi (Self)", age: 32, relation: "Primary" },
      { name: "Rahul (Spouse)", age: 35, relation: "Spouse" },
      { name: "Arjun (Son)", age: 8, relation: "Child" },
      { name: "Anaya (Daughter)", age: 5, relation: "Child" },
    ],
    sumInsured: "₹25,00,000",
    deductible: "₹0",
    copay: "0%",
    roomRent: "Single Private AC",
    features: [
      "Family floater benefit",
      "Cashless at 8,500+ hospitals",
      "Maternity cover included",
      "New born baby cover from Day 1",
      "Vaccination cover for children",
      "Annual health check-up (all members)",
      "Worldwide emergency cover",
      "Restore benefit - 100%",
      "No claim bonus - 50% max",
    ],
    exclusions: [
      "Pre-existing diseases (4 year wait)",
      "Cosmetic surgery",
      "Self-inflicted injuries",
    ],
    documents: [
      { name: "Policy Document", size: "3.1 MB" },
      { name: "Family Health Cards", size: "420 KB" },
      { name: "Member Details", size: "180 KB" },
    ],
    insurer: "IndusInd Insurance Co. Ltd.",
    insurerLogo: "🏦",
  },
  4: {
    id: 4,
    name: "Senior Citizen Care",
    type: "Health Insurance",
    icon: Heart,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
    coverage: "₹5,00,000",
    premium: "₹18,999/year",
    member: "Parents",
    memberIcon: Users,
    status: "active",
    validFrom: "15 Sep 2024",
    validTill: "14 Sep 2026",
    policyNumber: "IND-HLT-2024-789123",
    members: [
      { name: "Suresh Kumar (Father)", age: 62, relation: "Father" },
      { name: "Meera Kumar (Mother)", age: 58, relation: "Mother" },
    ],
    sumInsured: "₹5,00,000",
    deductible: "₹25,000",
    copay: "10%",
    roomRent: "Up to ₹5,000/day",
    features: [
      "No medical test up to 65 years",
      "Pre-existing covered from Day 1",
      "Cataract surgery covered",
      "Joint replacement covered",
      "Domiciliary treatment",
      "Daily hospital cash ₹2,000/day",
      "Ambulance charges",
      "AYUSH treatment",
    ],
    documents: [
      { name: "Policy Document", size: "2.2 MB" },
      { name: "Health Cards", size: "210 KB" },
    ],
    insurer: "IndusInd Insurance Co. Ltd.",
    insurerLogo: "🏦",
  },
  5: {
    id: 5,
    name: "Child Education Plan",
    type: "Life Insurance",
    icon: Briefcase,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-indigo-600",
    coverage: "₹50,00,000",
    premium: "₹60,000/year",
    member: "Arjun (Son)",
    memberIcon: User,
    status: "active",
    validFrom: "01 Apr 2024",
    validTill: "01 Apr 2035",
    policyNumber: "IND-LIF-2024-EDU456",
    policyTerm: "15 years",
    premiumTerm: "12 years",
    maturityBenefit: "₹50,00,000 + Bonuses",
    deathBenefit: "₹50,00,000 + Future premiums waived",
    features: [
      "Guaranteed education fund",
      "Premium waiver on parent's death",
      "Child continues to receive benefits",
      "Flexible payout options",
      "Partial withdrawal allowed",
      "Tax benefits under 80C",
      "Loyalty additions",
      "Milestone payouts at 18, 21, 25 years",
    ],
    documents: [
      { name: "Policy Bond", size: "1.5 MB" },
      { name: "Premium Receipt", size: "120 KB" },
      { name: "Benefit Illustration", size: "340 KB" },
    ],
    insurer: "IndusInd Life Insurance",
    insurerLogo: "📚",
  },
  6: {
    id: 6,
    name: "Term Life Insurance",
    type: "Life Insurance",
    icon: Shield,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-600",
    coverage: "₹1,00,00,000",
    premium: "₹12,000/year",
    member: "Spouse (Rahul)",
    memberIcon: User,
    status: "active",
    validFrom: "15 Jan 2023",
    validTill: "14 Jan 2045",
    policyNumber: "IND-LIF-2023-TRM789",
    policyTerm: "25 years",
    lifeAssured: "Rahul Sharma",
    sumAssured: "₹1,00,00,000",
    deathBenefit: "Lump sum or Monthly income",
    criticalIllness: "₹25,00,000",
    accidentalDeath: "₹2,00,00,000",
    features: [
      "Pure protection plan",
      "Critical illness cover included",
      "Accidental death benefit (2x)",
      "Terminal illness cover",
      "Choice of payout: Lump sum / Monthly",
      "Premium waiver on disability",
      "Tax benefits under 80C & 10(10D)",
      "Online premium payment",
    ],
    documents: [
      { name: "Policy Bond", size: "1.8 MB" },
      { name: "Premium Receipt", size: "95 KB" },
      { name: "Nominee Details", size: "85 KB" },
    ],
    insurer: "IndusInd Life Insurance",
    insurerLogo: "🛡️",
  },
};

const PolicyDetails: React.FC<PolicyDetailsProps> = ({
  setCurrentScreen,
  policyId,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const policy = policyData[policyId] || policyData[1];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "coverage", label: "Coverage" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div
        className={`bg-gradient-to-br ${policy.gradientFrom} ${policy.gradientTo} text-white px-4 pt-10 pb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center`}
          >
            <policy.icon className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium opacity-80">{policy.type}</p>
            <h1 className="text-xl font-bold mt-0.5">{policy.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              {policy.status === "active" ? (
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  ACTIVE
                </span>
              ) : (
                <span className="text-xs font-bold bg-orange-400/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  EXPIRES SOON
                </span>
              )}
              <span className="text-xs opacity-80">
                Valid till {policy.validTill}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-5">
          <div className="flex-1 bg-white/15 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wide opacity-70">
              Coverage
            </p>
            <p className="text-lg font-bold mt-0.5">{policy.coverage}</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wide opacity-70">
              Premium
            </p>
            <p className="text-lg font-bold mt-0.5">{policy.premium}</p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id ? "text-[#98272A]" : "text-gray-400"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#98272A]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "overview" && (
          <div className="p-4 space-y-4">
            {/* Policy Number */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Policy Number</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    {policy.policyNumber}
                  </p>
                </div>
                <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Insurer */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                  {policy.insurerLogo}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Insurer</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {policy.insurer}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>
            </div>

            {/* Policy Period */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-3">Policy Period</p>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{policy.validFrom}</span>
                  </div>
                </div>
                <div className="text-gray-300">→</div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-600">
                    <span className="text-sm">{policy.validTill}</span>
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                65% of policy term completed
              </p>
            </div>

            {/* Members (for family policies) */}
            {policy.members && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-3">Covered Members</p>
                <div className="space-y-3">
                  {policy.members.map((member: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {member.relation}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Age {member.age}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicle Details (for motor) */}
            {policy.vehicle && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-3">Vehicle Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Registration No.
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.vehicle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Vehicle</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.vehicleType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.vehicleYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">IDV</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.idv}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">NCB</span>
                    <span className="text-sm font-semibold text-green-600">
                      {policy.ncb}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Key Benefits */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-3">Key Benefits</p>
              <div className="space-y-2">
                {policy.features?.slice(0, 5).map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              {policy.features?.length > 5 && (
                <button className="text-xs text-[#98272A] font-semibold mt-3 flex items-center gap-1">
                  +{policy.features.length - 5} more benefits
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "coverage" && (
          <div className="p-4 space-y-4">
            {/* Coverage Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-3">Coverage Summary</p>
              <div className="space-y-3">
                {policy.sumInsured && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Sum Insured</span>
                    <span className="text-sm font-bold text-gray-900">
                      {policy.sumInsured}
                    </span>
                  </div>
                )}
                {policy.deductible !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Deductible</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.deductible}
                    </span>
                  </div>
                )}
                {policy.copay !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Co-pay</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.copay}
                    </span>
                  </div>
                )}
                {policy.roomRent && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Room Rent</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {policy.roomRent}
                    </span>
                  </div>
                )}
                {policy.networkHospitals && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">
                      Network Hospitals
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {policy.networkHospitals}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* All Features */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-3">What's Covered</p>
              <div className="space-y-2">
                {policy.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions */}
            {policy.exclusions && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-3">What's Not Covered</p>
                <div className="space-y-2">
                  {policy.exclusions.map((exclusion: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="p-4 space-y-4">
            {/* Download Documents */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <p className="text-xs text-gray-400 p-4 pb-2">Policy Documents</p>
              {policy.documents?.map((doc: any, i: number) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-400">PDF • {doc.size}</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>

            {/* Request Documents */}
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900">
                Need a document?
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Request official copies of your policy documents
              </p>
              <button className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Request Document
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <Phone className="w-4 h-4" />
          Support
        </button>
        {policy.status === "expiring" ? (
          <button
            onClick={() => setCurrentScreen("renew_policy")}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#98272A] rounded-xl text-sm font-bold text-white hover:bg-[#7a1f22] transition-colors"
          >
            Renew Now
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentScreen(`claims_policy_${policyId}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#98272A] rounded-xl text-sm font-bold text-white hover:bg-[#7a1f22] transition-colors"
          >
            <FileText className="w-4 h-4" />
            File Claim
          </button>
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;
