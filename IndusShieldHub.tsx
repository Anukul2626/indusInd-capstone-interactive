import React, { useState } from "react";
import {
  ChevronLeft,
  Heart,
  Car,
  AlertTriangle,
  MessageCircle,
  PhoneCall,
  Home,
  Shield,
  X,
  Send,
  FileText,
  ChevronRight,
  Clock,
  Check,
  Search,
  User,
  Users,
  Baby,
  Plane,
  Briefcase,
  Scale,
  TrendingUp,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

interface IndusShieldHubProps {
  setCurrentScreen: (screen: string) => void;
}

// Policy data for family view
const familyPolicies = [
  {
    id: 1,
    name: "Indus Health Elite",
    type: "Health",
    icon: Heart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    coverage: "₹10,00,000",
    member: "Self (Rashmi)",
    memberIcon: User,
    status: "active",
    validTill: "Mar 2027",
  },
  {
    id: 2,
    name: "Comprehensive Motor",
    type: "Motor",
    icon: Car,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    coverage: "IDV ₹8,50,000",
    member: "Self",
    memberIcon: User,
    status: "expiring",
    validTill: "01 Aug 2026",
    vehicle: "MH 12 AB 3456",
  },
  {
    id: 3,
    name: "Family Floater Health",
    type: "Health",
    icon: Heart,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    coverage: "₹25,00,000",
    member: "Family (4 members)",
    memberIcon: Users,
    status: "active",
    validTill: "Dec 2026",
  },
  {
    id: 4,
    name: "Senior Citizen Care",
    type: "Health",
    icon: Heart,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    coverage: "₹5,00,000",
    member: "Parents",
    memberIcon: Users,
    status: "active",
    validTill: "Sep 2026",
  },
  {
    id: 5,
    name: "Child Education Plan",
    type: "Life",
    icon: Briefcase,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    coverage: "₹50,00,000",
    member: "Arjun (Son)",
    memberIcon: Baby,
    status: "active",
    validTill: "2035",
  },
  {
    id: 6,
    name: "Term Life Insurance",
    type: "Life",
    icon: Shield,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    coverage: "₹1,00,00,000",
    member: "Spouse (Rahul)",
    memberIcon: User,
    status: "active",
    validTill: "Jan 2045",
  },
];

// My policies (subset)
const myPolicies = familyPolicies.filter((p) => p.id <= 2);

// Browse categories
const browseCategories = [
  {
    id: "health",
    name: "Health Insurance",
    icon: Heart,
    color: "bg-blue-500",
    lightBg: "bg-blue-50",
    plans: 12,
    startingFrom: "₹299/mo",
  },
  {
    id: "motor",
    name: "Motor Insurance",
    icon: Car,
    color: "bg-orange-500",
    lightBg: "bg-orange-50",
    plans: 8,
    startingFrom: "₹2,499/yr",
  },
  {
    id: "life",
    name: "Life Insurance",
    icon: Shield,
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    plans: 15,
    startingFrom: "₹499/mo",
  },
  {
    id: "travel",
    name: "Travel Insurance",
    icon: Plane,
    color: "bg-purple-500",
    lightBg: "bg-purple-50",
    plans: 6,
    startingFrom: "₹199/trip",
  },
  {
    id: "home",
    name: "Home Insurance",
    icon: Home,
    color: "bg-teal-500",
    lightBg: "bg-teal-50",
    plans: 5,
    startingFrom: "₹1,999/yr",
  },
  {
    id: "cyber",
    name: "Cyber Insurance",
    icon: Shield,
    color: "bg-rose-500",
    lightBg: "bg-rose-50",
    plans: 4,
    startingFrom: "₹999/yr",
  },
];

// Compare plans data
const comparePlans = [
  {
    id: 1,
    name: "Indus Health Protect",
    provider: "IndusInd Insurance",
    coverage: "₹5,00,000",
    premium: "₹8,999/yr",
    rating: 4.5,
    features: ["Cashless", "No Copay", "Day 1 Cover"],
    recommended: false,
  },
  {
    id: 2,
    name: "Indus Health Elite",
    provider: "IndusInd Insurance",
    coverage: "₹10,00,000",
    premium: "₹14,999/yr",
    rating: 4.8,
    features: ["Cashless", "No Copay", "Global Cover", "OPD"],
    recommended: true,
  },
  {
    id: 3,
    name: "Indus Health Supreme",
    provider: "IndusInd Insurance",
    coverage: "₹25,00,000",
    premium: "₹24,999/yr",
    rating: 4.9,
    features: ["Cashless", "No Copay", "Global Cover", "OPD", "Dental"],
    recommended: false,
  },
];

const IndusShieldHub: React.FC<IndusShieldHubProps> = ({ setCurrentScreen }) => {
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [_selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState("Family View");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [swiping, setSwiping] = useState(false);
  const [swipeComplete, setSwipeComplete] = useState(false);

  const handleSwipe = () => {
    setSwiping(true);
    setTimeout(() => {
      setSwipeComplete(true);
      setTimeout(() => {
        setShowRenewalModal(false);
        setSwiping(false);
        setSwipeComplete(false);
      }, 1500);
    }, 1200);
  };

  const handleCategoryClick = (_categoryId: string) => {
    setSelectedCategory(_categoryId);
    setShowBrowseModal(false);
    setShowCompareModal(true);
  };

  // Filter policies based on search
  const currentPolicies = activeView === "Family View" ? familyPolicies : myPolicies;
  const filteredPolicies = currentPolicies.filter(
    (policy) =>
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-[#98272A] text-white px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen("banking_home")}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold">IndusShield Hub</h1>
              <p className="text-xs text-red-200 opacity-80">
                Your insurance ecosystem
              </p>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-base">🛡️</span>
            <span className="text-sm font-bold">85</span>
            <span className="text-xs opacity-70">/100</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search policies, members, coverage..."
            className="w-full bg-white text-gray-800 text-sm rounded-xl pl-10 pr-10 py-3 outline-none placeholder:text-gray-400 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Smart Renewal Alert */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-orange-400 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                      Action Required
                    </span>
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    Motor Insurance
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Expires in <span className="font-semibold text-orange-600">12 days</span>. 
                    Renew to keep your <span className="font-semibold">50% NCB</span>.
                  </p>
                  <button
                    onClick={() => setShowRenewalModal(true)}
                    className="mt-3 bg-[#98272A] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#7a1f22] transition-colors shadow-sm active:scale-95 transform"
                  >
                    1-Tap Renew | ₹1,240
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browse & Compare CTA */}
        <div className="px-4 pt-4">
          <div
            onClick={() => setShowBrowseModal(true)}
            className="bg-gradient-to-r from-[#98272A] to-[#c13a3d] rounded-xl p-4 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Browse & Compare</p>
                  <p className="text-xs opacity-80">
                    Find the perfect plan for you
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5">
                <Sparkles className="w-3 h-3" />
                <span className="text-xs font-semibold">50+ Plans</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="px-4 pt-4">
          <div className="bg-gray-200 rounded-xl p-1 flex">
            {["My Policies", "Family View"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activeView === view
                    ? "bg-white text-[#98272A] shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Active Coverage Cards */}
        <div className="px-4 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              {activeView === "Family View" ? "Family Coverage" : "My Coverage"}
              <span className="text-xs font-normal text-gray-400 ml-2">
                ({filteredPolicies.length} policies)
              </span>
            </p>
            {activeView === "Family View" && (
              <button className="flex items-center gap-1 text-xs text-[#98272A] font-semibold">
                <Filter className="w-3 h-3" />
                Filter
              </button>
            )}
          </div>

          {filteredPolicies.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No policies found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${policy.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <policy.icon className={`w-5 h-5 ${policy.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {policy.name}
                      </p>
                      {policy.status === "active" ? (
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                          <Check className="w-3 h-3" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          EXPIRES SOON
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <policy.memberIcon className="w-3 h-3" />
                        <span>{policy.member}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-semibold text-gray-700">
                        {policy.coverage}
                      </span>
                    </div>
                    {policy.vehicle && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {policy.vehicle}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          policy.status === "expiring"
                            ? "text-orange-500 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {policy.status === "expiring" ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>
                          {policy.status === "expiring"
                            ? `Expires ${policy.validTill}`
                            : `Valid till ${policy.validTill}`}
                        </span>
                      </div>
                      <button className="text-xs font-semibold text-[#98272A] flex items-center gap-0.5 hover:underline">
                        <FileText className="w-3 h-3" />
                        {policy.status === "expiring" ? "Renew" : "Details"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Protection Ecosystem */}
        <div className="px-4 pt-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Protection Ecosystem
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: PhoneCall,
                label: "Telemedicine",
                bg: "bg-blue-50",
                iconColor: "text-blue-500",
              },
              {
                icon: Car,
                label: "Roadside Help",
                bg: "bg-orange-50",
                iconColor: "text-orange-500",
              },
              {
                icon: Home,
                label: "Home Assist",
                bg: "bg-green-50",
                iconColor: "text-green-500",
              },
              {
                icon: Shield,
                label: "Cyber Check",
                bg: "bg-purple-50",
                iconColor: "text-purple-500",
              },
            ].map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 transform"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center`}
                >
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Protection Score Card */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-[#98272A] to-[#b83235] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                  Protection Score
                </p>
                <p className="text-3xl font-bold mt-1">
                  85<span className="text-lg opacity-60">/100</span>
                </p>
                <p className="text-xs opacity-70 mt-1">
                  Add Life Insurance to reach 100 🎯
                </p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeDasharray={`${85 * 1.76} ${100 * 1.76}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  🛡️
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Recommendations */}
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">
              Recommended for You
            </p>
            <button className="text-xs text-[#98272A] font-semibold flex items-center gap-0.5">
              View All
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              {
                name: "Term Life Plan",
                tagline: "Secure your family's future",
                price: "₹499/mo",
                icon: Shield,
                color: "from-emerald-500 to-emerald-600",
              },
              {
                name: "Travel Insurance",
                tagline: "For your upcoming trip",
                price: "₹199/trip",
                icon: Plane,
                color: "from-purple-500 to-purple-600",
              },
              {
                name: "Super Top-Up",
                tagline: "Boost health coverage",
                price: "₹2,999/yr",
                icon: TrendingUp,
                color: "from-blue-500 to-blue-600",
              },
            ].map((rec, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-40 bg-gradient-to-br ${rec.color} rounded-xl p-3 text-white cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => setShowBrowseModal(true)}
              >
                <rec.icon className="w-6 h-6 mb-2 opacity-90" />
                <p className="text-sm font-bold">{rec.name}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{rec.tagline}</p>
                <p className="text-xs font-bold mt-2 bg-white/20 rounded-full px-2 py-1 inline-block">
                  {rec.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="absolute bottom-6 right-4 w-14 h-14 bg-[#98272A] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#7a1f22] transition-all active:scale-90 transform z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* ========= Browse Insurance Modal ========= */}
      {showBrowseModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowBrowseModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up z-10 max-h-[85vh] overflow-y-auto">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <button
              onClick={() => setShowBrowseModal(false)}
              className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#98272A]/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#98272A]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Browse Insurance
                </h3>
                <p className="text-xs text-gray-500">
                  Compare plans across categories
                </p>
              </div>
            </div>

            {/* Search in modal */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search insurance type..."
                className="w-full bg-gray-100 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#98272A]/20"
              />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 gap-3">
              {browseCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-gray-50 rounded-xl p-4 text-left hover:bg-gray-100 transition-colors active:scale-[0.98] transform"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${category.lightBg} flex items-center justify-center mb-3`}
                  >
                    <category.icon
                      className={`w-5 h-5 ${category.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {category.plans} plans
                  </p>
                  <p className="text-xs font-semibold text-[#98272A] mt-2">
                    From {category.startingFrom}
                  </p>
                </button>
              ))}
            </div>

            {/* Popular Picks */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                🔥 Most Popular
              </p>
              <div className="space-y-2">
                {[
                  { name: "Indus Health Elite", category: "Health", saves: "2.4k users chose this" },
                  { name: "Comprehensive Motor", category: "Motor", saves: "1.8k users chose this" },
                ].map((pick, i) => (
                  <button
                    key={i}
                    onClick={() => handleCategoryClick("health")}
                    className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#98272A]/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {pick.name}
                      </p>
                      <p className="text-xs text-gray-400">{pick.saves}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= Compare Plans Modal ========= */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCompareModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl animate-slide-up z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 pb-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Compare Health Plans
                  </h3>
                  <p className="text-xs text-gray-500">
                    Swipe to compare features
                  </p>
                </div>
                <button className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600">
                  <Filter className="w-3 h-3" />
                  Filter
                </button>
              </div>
            </div>

            {/* Scrollable Plans */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-3">
                {comparePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl border-2 p-4 transition-all ${
                      plan.recommended
                        ? "border-[#98272A] bg-red-50/30"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-2.5 left-4 bg-[#98272A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        RECOMMENDED
                      </div>
                    )}

                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {plan.name}
                        </p>
                        <p className="text-xs text-gray-400">{plan.provider}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold text-yellow-700">
                          {plan.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-400">Coverage</p>
                        <p className="text-sm font-bold text-gray-900">
                          {plan.coverage}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div>
                        <p className="text-xs text-gray-400">Premium</p>
                        <p className="text-sm font-bold text-[#98272A]">
                          {plan.premium}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {plan.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 text-xs font-semibold text-[#98272A] border border-[#98272A] py-2 rounded-lg hover:bg-red-50 transition-colors">
                        View Details
                      </button>
                      <button
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                          plan.recommended
                            ? "bg-[#98272A] text-white hover:bg-[#7a1f22]"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        Buy Now
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compare Selected */}
              <div className="mt-4 p-4 bg-gray-100 rounded-xl">
                <p className="text-xs text-gray-500 text-center">
                  Select 2-3 plans to compare side by side
                </p>
                <button className="w-full mt-2 text-sm font-semibold text-[#98272A] py-2 border border-dashed border-[#98272A]/30 rounded-lg hover:bg-white transition-colors">
                  + Add to Compare
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= Renewal Bottom Sheet Modal ========= */}
      {showRenewalModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => {
              setShowRenewalModal(false);
              setSwiping(false);
              setSwipeComplete(false);
            }}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up z-10">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <button
              onClick={() => {
                setShowRenewalModal(false);
                setSwiping(false);
                setSwipeComplete(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <h3 className="text-xl font-bold text-gray-900">Confirm Renewal</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Your IndusInd bank account ending in{" "}
              <span className="font-semibold text-gray-700">4471</span> will be
              debited{" "}
              <span className="font-bold text-gray-900">₹1,240</span>.
            </p>

            <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Policy</span>
                <span className="font-medium text-gray-800">
                  Comprehensive Motor
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-medium text-gray-800">MH 12 AB 3456</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">NCB Discount</span>
                <span className="font-medium text-green-600">50% Applied</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="font-bold text-gray-900">₹1,240</span>
              </div>
            </div>

            <div className="mt-6">
              {swipeComplete ? (
                <div className="bg-green-500 text-white text-center py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Renewal Successful!
                </div>
              ) : (
                <button
                  onClick={handleSwipe}
                  disabled={swiping}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98] transform ${
                    swiping
                      ? "bg-green-400 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200"
                  }`}
                >
                  {swiping ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Swipe to Auto-Debit →"
                  )}
                </button>
              )}
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Secured by IndusInd Bank
            </p>
          </div>
        </div>
      )}

      {/* ========= Indus Genie Chatbot ========= */}
      {showChatbot && (
        <div className="absolute bottom-24 right-3 z-50 w-[calc(100%-24px)] max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-[#98272A] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">🧞</span>
              </div>
              <div>
                <p className="text-sm font-bold">Indus Genie</p>
                <p className="text-[10px] opacity-70">AI Insurance Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 h-48 overflow-y-auto bg-gray-50">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#98272A] flex items-center justify-center flex-shrink-0">
                <span className="text-xs">🧞</span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Hi! 👋 I can translate complex policy terms into simple
                  English. What do you need help with?
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["What is NCB?", "Claim process?", "Coverage details"].map(
                (q, i) => (
                  <button
                    key={i}
                    className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {q}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#98272A]/20 transition-shadow"
              />
              <button className="w-9 h-9 bg-[#98272A] rounded-xl flex items-center justify-center hover:bg-[#7a1f22] transition-colors active:scale-90 transform">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndusShieldHub;
