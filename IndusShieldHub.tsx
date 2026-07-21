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

// Compare plans data with detailed information
const comparePlans = [
  {
    id: 1,
    name: "Indus Health Protect",
    provider: "IndusInd Insurance",
    coverage: "₹5,00,000",
    premium: "₹8,999/yr",
    premiumMonthly: "₹750/mo",
    rating: 4.5,
    reviews: 1250,
    claimSettlement: "96.5%",
    features: ["Cashless", "No Copay", "Day 1 Cover"],
    recommended: false,
    details: {
      sumInsured: "₹5,00,000",
      roomRent: "₹4,000/day",
      icuCharges: "₹8,000/day",
      copay: "10% above 60 yrs",
      deductible: "₹0",
      preExistingWait: "3 years",
      maternityWait: "Not Covered",
      networkHospitals: "5,500+",
      daycare: "140+ procedures",
      ambulance: "₹2,000/hospitalization",
      healthCheckup: "Not included",
      restoreBenefit: "50%",
      noClaimBonus: "10% per year (max 50%)",
      ayush: "Up to ₹25,000",
      domiciliary: "Not Covered",
      organDonor: "Covered",
      preHospitalization: "30 days",
      postHospitalization: "60 days",
    },
    highlights: ["Best for individuals", "Affordable premium", "Basic coverage"],
    exclusions: ["Maternity", "OPD", "Dental", "Pre-existing (3 yr wait)"],
  },
  {
    id: 2,
    name: "Indus Health Elite",
    provider: "IndusInd Insurance",
    coverage: "₹10,00,000",
    premium: "₹14,999/yr",
    premiumMonthly: "₹1,250/mo",
    rating: 4.8,
    reviews: 3420,
    claimSettlement: "98.2%",
    features: ["Cashless", "No Copay", "Global Cover", "OPD"],
    recommended: true,
    details: {
      sumInsured: "₹10,00,000",
      roomRent: "No Limit (Single Private)",
      icuCharges: "No Limit",
      copay: "0% (No Copay)",
      deductible: "₹0",
      preExistingWait: "2 years",
      maternityWait: "9 months (₹50,000)",
      networkHospitals: "8,500+",
      daycare: "540+ procedures",
      ambulance: "₹5,000/hospitalization",
      healthCheckup: "Annual (₹5,000)",
      restoreBenefit: "100%",
      noClaimBonus: "20% per year (max 100%)",
      ayush: "Up to ₹50,000",
      domiciliary: "Up to ₹2,00,000",
      organDonor: "Covered (Full)",
      preHospitalization: "60 days",
      postHospitalization: "180 days",
      opdCover: "₹15,000/year",
      globalCover: "Emergency worldwide",
      airAmbulance: "Up to ₹5,00,000",
      secondOpinion: "Included",
    },
    highlights: ["Most Popular", "Comprehensive cover", "Zero copay", "OPD included"],
    exclusions: ["Cosmetic surgery", "Self-inflicted injuries"],
  },
  {
    id: 3,
    name: "Indus Health Supreme",
    provider: "IndusInd Insurance",
    coverage: "₹25,00,000",
    premium: "₹24,999/yr",
    premiumMonthly: "₹2,083/mo",
    rating: 4.9,
    reviews: 890,
    claimSettlement: "99.1%",
    features: ["Cashless", "No Copay", "Global Cover", "OPD", "Dental"],
    recommended: false,
    details: {
      sumInsured: "₹25,00,000",
      roomRent: "No Limit (Any Room)",
      icuCharges: "No Limit",
      copay: "0% (No Copay)",
      deductible: "₹0",
      preExistingWait: "1 year",
      maternityWait: "9 months (₹1,00,000)",
      networkHospitals: "10,000+",
      daycare: "580+ procedures",
      ambulance: "Unlimited",
      healthCheckup: "Annual (₹10,000)",
      restoreBenefit: "Unlimited",
      noClaimBonus: "25% per year (max 150%)",
      ayush: "Up to ₹1,00,000",
      domiciliary: "Up to ₹5,00,000",
      organDonor: "Covered (Full + Travel)",
      preHospitalization: "90 days",
      postHospitalization: "365 days",
      opdCover: "₹30,000/year",
      globalCover: "Worldwide (Planned + Emergency)",
      airAmbulance: "Up to ₹15,00,000",
      secondOpinion: "Unlimited",
      dentalCover: "₹20,000/year",
      visionCover: "₹10,000/year",
      mentalHealth: "Full Cover",
      infertility: "Up to ₹2,00,000",
    },
    highlights: ["Premium Plan", "Maximum coverage", "All benefits included", "Lowest wait periods"],
    exclusions: ["Cosmetic surgery only"],
  },
];

// Motor Insurance Plans
const motorPlans = [
  {
    id: 1,
    name: "Third Party Only",
    provider: "IndusInd General Insurance",
    coverage: "Unlimited",
    premium: "₹2,094/yr",
    rating: 4.2,
    reviews: 2150,
    claimSettlement: "94.5%",
    recommended: false,
    highlights: ["Mandatory cover", "Budget friendly", "Legal compliance"],
    details: {
      ownDamage: "Not Covered",
      thirdPartyLiability: "Unlimited",
      personalAccident: "₹15,00,000",
      legalLiability: "Covered",
      garages: "N/A",
      claimProcess: "Reimbursement",
      ncbApplicable: "No",
      addOns: "Not Available",
    },
    exclusions: ["Own damage", "Theft", "Fire", "Natural calamities"],
  },
  {
    id: 2,
    name: "Comprehensive Basic",
    provider: "IndusInd General Insurance",
    coverage: "IDV Based",
    premium: "₹8,499/yr",
    rating: 4.5,
    reviews: 3840,
    claimSettlement: "96.8%",
    recommended: false,
    highlights: ["Own damage cover", "Theft protection", "Fire & flood cover"],
    details: {
      ownDamage: "Covered (IDV)",
      thirdPartyLiability: "Unlimited",
      personalAccident: "₹15,00,000",
      legalLiability: "Covered",
      garages: "3,500+ cashless",
      claimProcess: "Cashless & Reimbursement",
      ncbApplicable: "Yes (up to 50%)",
      depreciation: "Standard deduction",
      roadside: "Basic (₹1,500 limit)",
      addOns: "4 available",
    },
    exclusions: ["Depreciation on parts", "Wear & tear", "Mechanical breakdown"],
  },
  {
    id: 3,
    name: "Comprehensive Plus",
    provider: "IndusInd General Insurance",
    coverage: "IDV + Add-ons",
    premium: "₹12,999/yr",
    rating: 4.8,
    reviews: 5620,
    claimSettlement: "98.5%",
    recommended: true,
    highlights: ["Zero depreciation", "Engine protect", "24x7 RSA", "NCB protect"],
    details: {
      ownDamage: "Covered (IDV)",
      thirdPartyLiability: "Unlimited",
      personalAccident: "₹15,00,000",
      legalLiability: "Covered",
      garages: "4,500+ cashless",
      claimProcess: "Cashless & Reimbursement",
      ncbApplicable: "Yes (up to 50%)",
      depreciation: "Zero Depreciation",
      roadside: "Unlimited RSA",
      engineProtect: "Covered",
      keyReplace: "Up to ₹5,000",
      tyreProtect: "Covered",
      returnToInvoice: "Available",
      consumables: "Covered",
      addOns: "All included",
    },
    exclusions: ["Drunk driving", "Invalid license"],
  },
];

// Life Insurance Plans
const lifePlans = [
  {
    id: 1,
    name: "Indus Term Protect",
    provider: "IndusInd Life Insurance",
    coverage: "₹50,00,000",
    premium: "₹6,999/yr",
    premiumMonthly: "₹583/mo",
    rating: 4.4,
    reviews: 1850,
    claimSettlement: "97.2%",
    recommended: false,
    highlights: ["Pure protection", "Affordable premium", "Tax benefits"],
    details: {
      sumAssured: "₹50,00,000",
      policyTerm: "10-40 years",
      premiumTerm: "Same as policy",
      entryAge: "18-65 years",
      deathBenefit: "Lump sum",
      criticalIllness: "Not Covered",
      accidentalDeath: "Not Covered",
      terminalIllness: "Covered",
      premiumWaiver: "Not Covered",
      taxBenefits: "80C & 10(10D)",
    },
    exclusions: ["Suicide (1st year)", "Pre-existing undisclosed"],
  },
  {
    id: 2,
    name: "Indus Term Elite",
    provider: "IndusInd Life Insurance",
    coverage: "₹1,00,00,000",
    premium: "₹12,999/yr",
    premiumMonthly: "₹1,083/mo",
    rating: 4.7,
    reviews: 4250,
    claimSettlement: "98.5%",
    recommended: true,
    highlights: ["Critical illness", "Accidental cover", "Flexible payout", "Premium waiver"],
    details: {
      sumAssured: "₹1,00,00,000",
      policyTerm: "10-50 years",
      premiumTerm: "Limited pay available",
      entryAge: "18-65 years",
      deathBenefit: "Lump sum / Monthly income",
      criticalIllness: "₹25,00,000 (36 conditions)",
      accidentalDeath: "2x Sum Assured",
      terminalIllness: "Accelerated benefit",
      premiumWaiver: "On disability",
      taxBenefits: "80C, 80D & 10(10D)",
      incomeBenefit: "₹1,00,000/month option",
      increasingCover: "5% yearly increase",
    },
    exclusions: ["Suicide (1st year)"],
  },
  {
    id: 3,
    name: "Indus Term Supreme",
    provider: "IndusInd Life Insurance",
    coverage: "₹2,00,00,000",
    premium: "₹24,999/yr",
    premiumMonthly: "₹2,083/mo",
    rating: 4.9,
    reviews: 1680,
    claimSettlement: "99.1%",
    recommended: false,
    highlights: ["Maximum cover", "Whole life option", "Return of premium", "All riders included"],
    details: {
      sumAssured: "₹2,00,00,000",
      policyTerm: "Whole life / Term",
      premiumTerm: "Limited pay (5/7/10 yrs)",
      entryAge: "18-60 years",
      deathBenefit: "Lump sum + Monthly income",
      criticalIllness: "₹50,00,000 (64 conditions)",
      accidentalDeath: "3x Sum Assured",
      terminalIllness: "100% accelerated",
      premiumWaiver: "On CI/Disability",
      taxBenefits: "80C, 80D & 10(10D)",
      returnOfPremium: "105% of premiums",
      wholeLifeCover: "Up to age 99",
      wealthBonus: "Additional cover over time",
    },
    exclusions: ["None after 1 year"],
  },
];

// Travel Insurance Plans
const travelPlans = [
  {
    id: 1,
    name: "Domestic Explorer",
    provider: "IndusInd General Insurance",
    coverage: "₹5,00,000",
    premium: "₹199/trip",
    rating: 4.3,
    reviews: 980,
    claimSettlement: "95.5%",
    recommended: false,
    highlights: ["Budget travel", "Basic medical", "Trip cancellation"],
    details: {
      medicalExpenses: "₹2,00,000",
      tripCancellation: "₹50,000",
      baggageLoss: "₹25,000",
      flightDelay: "₹5,000 (6+ hrs)",
      personalAccident: "₹5,00,000",
      coverage: "India only",
      duration: "Up to 30 days",
    },
    exclusions: ["Adventure sports", "Pre-existing conditions"],
  },
  {
    id: 2,
    name: "International Shield",
    provider: "IndusInd General Insurance",
    coverage: "₹50,00,000",
    premium: "₹899/trip",
    rating: 4.7,
    reviews: 2450,
    claimSettlement: "97.8%",
    recommended: true,
    highlights: ["Global coverage", "Medical evacuation", "24/7 assistance", "COVID cover"],
    details: {
      medicalExpenses: "₹50,00,000",
      medicalEvacuation: "₹25,00,000",
      tripCancellation: "₹2,00,000",
      baggageLoss: "₹75,000",
      flightDelay: "₹15,000 (4+ hrs)",
      personalAccident: "₹25,00,000",
      coverage: "Worldwide",
      duration: "Up to 180 days",
      covidCover: "Full hospitalization",
      adventureSports: "Covered (basic)",
      lossOfPassport: "₹10,000",
    },
    exclusions: ["Extreme sports", "War zones"],
  },
  {
    id: 3,
    name: "Frequent Flyer Annual",
    provider: "IndusInd General Insurance",
    coverage: "₹1,00,00,000",
    premium: "₹4,999/year",
    rating: 4.9,
    reviews: 890,
    claimSettlement: "98.9%",
    recommended: false,
    highlights: ["Unlimited trips", "Business cover", "Family included", "Premium lounges"],
    details: {
      medicalExpenses: "₹1,00,00,000",
      medicalEvacuation: "₹50,00,000",
      tripCancellation: "₹5,00,000",
      baggageLoss: "₹1,50,000",
      flightDelay: "₹25,000 (3+ hrs)",
      personalAccident: "₹50,00,000",
      coverage: "Worldwide unlimited trips",
      duration: "90 days per trip",
      covidCover: "Full cover + quarantine",
      adventureSports: "All covered",
      businessEquipment: "₹2,00,000",
      homeBreakIn: "₹1,00,000",
      loungeAccess: "Unlimited",
      familyMembers: "Spouse + 2 children",
    },
    exclusions: ["Professional sports only"],
  },
];

// Home Insurance Plans
const homePlans = [
  {
    id: 1,
    name: "Home Essential",
    provider: "IndusInd General Insurance",
    coverage: "₹25,00,000",
    premium: "₹1,999/yr",
    rating: 4.3,
    reviews: 720,
    claimSettlement: "95.8%",
    recommended: false,
    highlights: ["Structure cover", "Fire protection", "Natural disasters"],
    details: {
      structureCover: "₹25,00,000",
      contentCover: "Not included",
      fireTheft: "Covered",
      naturalDisasters: "Covered",
      terrorism: "Not Covered",
      rentAltAccommodation: "₹50,000",
      thirdPartyLiability: "₹5,00,000",
      propertyType: "Owned flat/house",
    },
    exclusions: ["Contents", "Jewelry", "Terrorism", "Nuclear"],
  },
  {
    id: 2,
    name: "Home Plus",
    provider: "IndusInd General Insurance",
    coverage: "₹75,00,000",
    premium: "₹4,999/yr",
    rating: 4.6,
    reviews: 1580,
    claimSettlement: "97.5%",
    recommended: true,
    highlights: ["Structure + Contents", "Valuables cover", "Tenant liability", "Home assistance"],
    details: {
      structureCover: "₹50,00,000",
      contentCover: "₹25,00,000",
      valuables: "₹5,00,000",
      fireTheft: "Covered",
      naturalDisasters: "Covered",
      terrorism: "Covered",
      rentAltAccommodation: "₹1,50,000",
      thirdPartyLiability: "₹10,00,000",
      propertyType: "Owned/Rented",
      homeAssistance: "Plumber, Electrician",
      burglary: "Covered",
      electronicEquipment: "₹2,00,000",
    },
    exclusions: ["Cash", "Documents", "Pets"],
  },
  {
    id: 3,
    name: "Home Supreme",
    provider: "IndusInd General Insurance",
    coverage: "₹2,00,00,000",
    premium: "₹9,999/yr",
    rating: 4.8,
    reviews: 480,
    claimSettlement: "99.0%",
    recommended: false,
    highlights: ["Complete protection", "Art & collectibles", "Worldwide belongings", "Premium services"],
    details: {
      structureCover: "₹1,50,00,000",
      contentCover: "₹50,00,000",
      valuables: "₹25,00,000",
      artCollectibles: "₹10,00,000",
      fireTheft: "Covered",
      naturalDisasters: "Covered",
      terrorism: "Covered",
      rentAltAccommodation: "Unlimited (6 months)",
      thirdPartyLiability: "₹25,00,000",
      propertyType: "Any property",
      homeAssistance: "Premium 24/7",
      worldwideBelongings: "₹5,00,000",
      domesticHelp: "Covered",
      landscaping: "₹2,00,000",
      poolEquipment: "Covered",
    },
    exclusions: ["War", "Nuclear"],
  },
];

// Cyber Insurance Plans
const cyberPlans = [
  {
    id: 1,
    name: "Cyber Basic",
    provider: "IndusInd General Insurance",
    coverage: "₹50,000",
    premium: "₹999/yr",
    rating: 4.2,
    reviews: 520,
    claimSettlement: "94.5%",
    recommended: false,
    highlights: ["Identity theft", "Phishing cover", "Basic protection"],
    details: {
      identityTheft: "₹25,000",
      phishingFraud: "₹25,000",
      onlineTransactionFraud: "₹50,000",
      socialMediaHack: "Not Covered",
      cyberExtortion: "Not Covered",
      dataRecovery: "Not Covered",
      legalExpenses: "₹10,000",
      coverage: "Individual",
    },
    exclusions: ["Crypto", "Business transactions", "Prior incidents"],
  },
  {
    id: 2,
    name: "Cyber Shield",
    provider: "IndusInd General Insurance",
    coverage: "₹5,00,000",
    premium: "₹2,999/yr",
    rating: 4.6,
    reviews: 1250,
    claimSettlement: "97.0%",
    recommended: true,
    highlights: ["Complete fraud cover", "Social media", "Cyber extortion", "IT support"],
    details: {
      identityTheft: "₹1,00,000",
      phishingFraud: "₹2,00,000",
      onlineTransactionFraud: "₹5,00,000",
      socialMediaHack: "₹50,000",
      cyberExtortion: "₹1,00,000",
      dataRecovery: "₹25,000",
      malwareAttack: "₹50,000",
      legalExpenses: "₹50,000",
      counseling: "₹25,000",
      reputationRecovery: "₹50,000",
      coverage: "Individual + Family",
      itSupport: "24/7 helpline",
    },
    exclusions: ["Crypto trading", "Business use"],
  },
  {
    id: 3,
    name: "Cyber Fortress",
    provider: "IndusInd General Insurance",
    coverage: "₹25,00,000",
    premium: "₹7,999/yr",
    rating: 4.8,
    reviews: 380,
    claimSettlement: "98.5%",
    recommended: false,
    highlights: ["Maximum protection", "Business cover", "Crypto included", "Premium support"],
    details: {
      identityTheft: "₹5,00,000",
      phishingFraud: "₹10,00,000",
      onlineTransactionFraud: "₹25,00,000",
      socialMediaHack: "₹2,00,000",
      cyberExtortion: "₹5,00,000",
      dataRecovery: "₹1,00,000",
      malwareAttack: "₹2,00,000",
      legalExpenses: "₹2,00,000",
      counseling: "₹1,00,000",
      reputationRecovery: "₹2,00,000",
      cryptoFraud: "₹5,00,000",
      businessLoss: "₹3,00,000",
      coverage: "Family + Small Business",
      darkWebMonitoring: "Included",
      creditMonitoring: "Included",
      itSupport: "Dedicated manager",
    },
    exclusions: ["Investment losses"],
  },
];

// All plans combined by category
const allComparePlans: Record<string, any[]> = {
  health: comparePlans,
  motor: motorPlans,
  life: lifePlans,
  travel: travelPlans,
  home: homePlans,
  cyber: cyberPlans,
};

// Category display names
const categoryNames: Record<string, string> = {
  health: "Health Insurance",
  motor: "Motor Insurance",
  life: "Life Insurance",
  travel: "Travel Insurance",
  home: "Home Insurance",
  cyber: "Cyber Insurance",
};

const IndusShieldHub: React.FC<IndusShieldHubProps> = ({ setCurrentScreen }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSideBySide, setShowSideBySide] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [selectedPlanForDetails, setSelectedPlanForDetails] = useState<any>(null);
  const [selectedPlansToCompare, setSelectedPlansToCompare] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("health");
  const [activeView, setActiveView] = useState("Family View");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatInput, setChatInput] = useState("");

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedPlansToCompare([]);
    setShowBrowseModal(false);
    setShowCompareModal(true);
  };

  const togglePlanSelection = (planId: number) => {
    setSelectedPlansToCompare(prev => {
      if (prev.includes(planId)) {
        return prev.filter(id => id !== planId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), planId];
      }
      return [...prev, planId];
    });
  };

  const openPlanDetails = (plan: any) => {
    setSelectedPlanForDetails(plan);
    setShowPlanDetails(true);
  };

  // Get plans for selected category
  const currentComparePlans = allComparePlans[selectedCategory] || comparePlans;
  const plansToCompare = currentComparePlans.filter((p: any) => selectedPlansToCompare.includes(p.id));

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
                    onClick={() => setCurrentScreen("renew_policy")}
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
                onClick={() => setCurrentScreen(`policy_details_${policy.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (policy.status === "expiring") {
                            setCurrentScreen("renew_policy");
                          } else {
                            setCurrentScreen(`policy_details_${policy.id}`);
                          }
                        }}
                        className="text-xs font-semibold text-[#98272A] flex items-center gap-0.5 hover:underline"
                      >
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
                screen: "telemedicine",
              },
              {
                icon: Car,
                label: "Roadside Help",
                bg: "bg-orange-50",
                iconColor: "text-orange-500",
                screen: "roadside_help",
              },
              {
                icon: Home,
                label: "Home Assist",
                bg: "bg-green-50",
                iconColor: "text-green-500",
                screen: "home_assist",
              },
              {
                icon: Shield,
                label: "Cyber Check",
                bg: "bg-purple-50",
                iconColor: "text-purple-500",
                screen: "cyber_check",
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrentScreen(item.screen)}
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

        {/* Claims Quick Access */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setCurrentScreen("claims")}
            className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">Claims Center</p>
                <p className="text-xs text-gray-500">File & track your claims</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-1 rounded-full">
                1 In Progress
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
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
          <div className="relative bg-white w-full max-w-md rounded-t-3xl animate-slide-up z-10 max-h-[95vh] flex flex-col">
            <div className="p-6 pb-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Compare {categoryNames[selectedCategory]}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Detailed comparison of all plans
                  </p>
                </div>
                <button className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600">
                  <Filter className="w-3 h-3" />
                  Filter
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 mt-3 -mx-2 px-2">
                {Object.keys(allComparePlans).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-[#98272A] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {categoryNames[cat].replace(" Insurance", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Plans */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
              <div className="space-y-4">
                {currentComparePlans.map((plan: any) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                      plan.recommended
                        ? "border-[#98272A] bg-red-50/30"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-0 left-0 right-0 bg-[#98272A] text-white text-[10px] font-bold py-1 text-center flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        MOST POPULAR - RECOMMENDED FOR YOU
                      </div>
                    )}

                    <div className={`p-4 ${plan.recommended ? "pt-8" : ""}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {plan.name}
                          </p>
                          <p className="text-xs text-gray-400">{plan.provider}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-semibold text-yellow-700">
                              {plan.rating}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              ({plan.reviews})
                            </span>
                          </div>
                          <p className="text-[10px] text-green-600 mt-1">
                            {plan.claimSettlement} claim settlement
                          </p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {plan.highlights.map((highlight: string, i: number) => (
                          <span
                            key={i}
                            className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                              i === 0 && plan.recommended
                                ? "bg-[#98272A]/10 text-[#98272A]"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            ✓ {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Price & Coverage */}
                      <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            {selectedCategory === "motor" ? "Coverage" : selectedCategory === "travel" ? "Medical Cover" : "Sum Insured"}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {plan.coverage}
                          </p>
                        </div>
                        <div className="w-px h-10 bg-gray-200"></div>
                        <div className="flex-1 text-right">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Premium</p>
                          <p className="text-lg font-bold text-[#98272A]">
                            {plan.premiumMonthly || plan.premium}
                          </p>
                          {plan.premiumMonthly && (
                            <p className="text-[10px] text-gray-400">or {plan.premium}</p>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Key Details Grid based on category */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {/* Health Insurance Details */}
                        {selectedCategory === "health" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Room Rent</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.roomRent}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Co-pay</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.copay}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Pre-existing Wait</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.preExistingWait}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Network Hospitals</p>
                              <p className="text-xs font-semibold text-blue-600">{plan.details.networkHospitals}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Maternity</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.maternityWait}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Restore Benefit</p>
                              <p className="text-xs font-semibold text-green-600">{plan.details.restoreBenefit}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">No Claim Bonus</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.noClaimBonus}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Day Care</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.daycare}</p>
                            </div>
                          </>
                        )}

                        {/* Motor Insurance Details */}
                        {selectedCategory === "motor" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Own Damage</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.ownDamage}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Third Party</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.thirdPartyLiability}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Personal Accident</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.personalAccident}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Cashless Garages</p>
                              <p className="text-xs font-semibold text-blue-600">{plan.details.garages}</p>
                            </div>
                            {plan.details.depreciation && (
                              <div className="p-2 bg-white border border-gray-100 rounded-lg">
                                <p className="text-[10px] text-gray-400">Depreciation</p>
                                <p className="text-xs font-semibold text-gray-900">{plan.details.depreciation}</p>
                              </div>
                            )}
                            {plan.details.roadside && (
                              <div className="p-2 bg-white border border-gray-100 rounded-lg">
                                <p className="text-[10px] text-gray-400">Roadside Assist</p>
                                <p className="text-xs font-semibold text-gray-900">{plan.details.roadside}</p>
                              </div>
                            )}
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">NCB Applicable</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.ncbApplicable}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Add-ons</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.addOns}</p>
                            </div>
                          </>
                        )}

                        {/* Life Insurance Details */}
                        {selectedCategory === "life" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Sum Assured</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.sumAssured}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Policy Term</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.policyTerm}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Death Benefit</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.deathBenefit}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Critical Illness</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.criticalIllness}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Accidental Death</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.accidentalDeath}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Premium Waiver</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.premiumWaiver}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Entry Age</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.entryAge}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Tax Benefits</p>
                              <p className="text-xs font-semibold text-green-600">{plan.details.taxBenefits}</p>
                            </div>
                          </>
                        )}

                        {/* Travel Insurance Details */}
                        {selectedCategory === "travel" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Medical Expenses</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.medicalExpenses}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Trip Cancellation</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.tripCancellation}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Baggage Loss</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.baggageLoss}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Flight Delay</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.flightDelay}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Personal Accident</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.personalAccident}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Coverage</p>
                              <p className="text-xs font-semibold text-blue-600">{plan.details.coverage}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Duration</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.duration}</p>
                            </div>
                            {plan.details.covidCover && (
                              <div className="p-2 bg-white border border-gray-100 rounded-lg">
                                <p className="text-[10px] text-gray-400">COVID Cover</p>
                                <p className="text-xs font-semibold text-green-600">{plan.details.covidCover}</p>
                              </div>
                            )}
                          </>
                        )}

                        {/* Home Insurance Details */}
                        {selectedCategory === "home" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Structure Cover</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.structureCover}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Content Cover</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.contentCover}</p>
                            </div>
                            {plan.details.valuables && (
                              <div className="p-2 bg-white border border-gray-100 rounded-lg">
                                <p className="text-[10px] text-gray-400">Valuables</p>
                                <p className="text-xs font-semibold text-gray-900">{plan.details.valuables}</p>
                              </div>
                            )}
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Fire & Theft</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.fireTheft}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Natural Disasters</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.naturalDisasters}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Terrorism</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.terrorism}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Alt Accommodation</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.rentAltAccommodation}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Third Party</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.thirdPartyLiability}</p>
                            </div>
                          </>
                        )}

                        {/* Cyber Insurance Details */}
                        {selectedCategory === "cyber" && (
                          <>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Identity Theft</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.identityTheft}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Phishing Fraud</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.phishingFraud}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Online Fraud</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.onlineTransactionFraud}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Social Media Hack</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.socialMediaHack}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Cyber Extortion</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.cyberExtortion}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Legal Expenses</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.legalExpenses}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Data Recovery</p>
                              <p className="text-xs font-semibold text-gray-900">{plan.details.dataRecovery}</p>
                            </div>
                            <div className="p-2 bg-white border border-gray-100 rounded-lg">
                              <p className="text-[10px] text-gray-400">Coverage</p>
                              <p className="text-xs font-semibold text-blue-600">{plan.details.coverage}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Additional Covers - Health Only */}
                      {selectedCategory === "health" && (
                        <>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-[10px] font-semibold text-blue-900 uppercase tracking-wide mb-2">Additional Covers</p>
                            <div className="flex flex-wrap gap-1.5">
                              {plan.details.opdCover && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  OPD: {plan.details.opdCover}
                                </span>
                              )}
                              {plan.details.healthCheckup && plan.details.healthCheckup !== "Not included" && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  Health Checkup
                                </span>
                              )}
                              {plan.details.globalCover && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  Global Cover
                                </span>
                              )}
                              {plan.details.airAmbulance && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  Air Ambulance
                                </span>
                              )}
                              {plan.details.dentalCover && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  Dental: {plan.details.dentalCover}
                                </span>
                              )}
                              {plan.details.mentalHealth && (
                                <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                  Mental Health
                                </span>
                              )}
                              <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                AYUSH: {plan.details.ayush}
                              </span>
                              <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded-full">
                                Ambulance: {plan.details.ambulance}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <div className="flex-1 p-2 bg-green-50 rounded-lg text-center">
                              <p className="text-[10px] text-green-600">Pre-Hospital</p>
                              <p className="text-xs font-bold text-green-700">{plan.details.preHospitalization}</p>
                            </div>
                            <div className="flex-1 p-2 bg-green-50 rounded-lg text-center">
                              <p className="text-[10px] text-green-600">Post-Hospital</p>
                              <p className="text-xs font-bold text-green-700">{plan.details.postHospitalization}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Motor Add-ons */}
                      {selectedCategory === "motor" && plan.details.engineProtect && (
                        <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                          <p className="text-[10px] font-semibold text-orange-900 uppercase tracking-wide mb-2">Included Add-ons</p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">Zero Depreciation</span>
                            <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">Engine Protect</span>
                            <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">RSA 24x7</span>
                            {plan.details.keyReplace && <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">Key Replace</span>}
                            {plan.details.tyreProtect && <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">Tyre Protect</span>}
                            {plan.details.consumables && <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded-full">Consumables</span>}
                          </div>
                        </div>
                      )}

                      {/* Life Insurance Additional Benefits */}
                      {selectedCategory === "life" && plan.details.incomeBenefit && (
                        <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                          <p className="text-[10px] font-semibold text-emerald-900 uppercase tracking-wide mb-2">Additional Benefits</p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] bg-white text-emerald-700 px-2 py-1 rounded-full">Income Benefit</span>
                            {plan.details.increasingCover && <span className="text-[10px] bg-white text-emerald-700 px-2 py-1 rounded-full">Increasing Cover</span>}
                            {plan.details.returnOfPremium && <span className="text-[10px] bg-white text-emerald-700 px-2 py-1 rounded-full">Return of Premium</span>}
                            {plan.details.wholeLifeCover && <span className="text-[10px] bg-white text-emerald-700 px-2 py-1 rounded-full">Whole Life Option</span>}
                          </div>
                        </div>
                      )}

                      {/* Travel Additional Benefits */}
                      {selectedCategory === "travel" && plan.details.medicalEvacuation && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                          <p className="text-[10px] font-semibold text-purple-900 uppercase tracking-wide mb-2">Additional Benefits</p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] bg-white text-purple-700 px-2 py-1 rounded-full">Medical Evacuation: {plan.details.medicalEvacuation}</span>
                            {plan.details.adventureSports && <span className="text-[10px] bg-white text-purple-700 px-2 py-1 rounded-full">Adventure Sports</span>}
                            {plan.details.lossOfPassport && <span className="text-[10px] bg-white text-purple-700 px-2 py-1 rounded-full">Passport Loss</span>}
                            {plan.details.loungeAccess && <span className="text-[10px] bg-white text-purple-700 px-2 py-1 rounded-full">Lounge Access</span>}
                          </div>
                        </div>
                      )}

                      {/* Exclusions */}
                      <div className="mt-3">
                        <p className="text-[10px] text-gray-400 mb-1">Not Covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {plan.exclusions.map((exc: string, i: number) => (
                            <span key={i} className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              ✗ {exc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Selection checkbox for comparison */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => togglePlanSelection(plan.id)}
                          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                            selectedPlansToCompare.includes(plan.id)
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "bg-gray-100 text-gray-600 border border-transparent"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            selectedPlansToCompare.includes(plan.id)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-400"
                          }`}>
                            {selectedPlansToCompare.includes(plan.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {selectedPlansToCompare.includes(plan.id) ? "Selected for comparison" : "Select to compare"}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => openPlanDetails(plan)}
                          className="flex-1 text-xs font-semibold text-[#98272A] border border-[#98272A] py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          View Full Details
                        </button>
                        <button
                          onClick={() => setCurrentScreen(`buy_policy_${selectedCategory}`)}
                          className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
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
                  </div>
                ))}
              </div>

              {/* Compare Side by Side CTA */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-900">Compare Side by Side</p>
                    <p className="text-xs text-blue-600">
                      {selectedPlansToCompare.length === 0 
                        ? "Select 2-3 plans above to compare" 
                        : `${selectedPlansToCompare.length} plan${selectedPlansToCompare.length > 1 ? 's' : ''} selected`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => selectedPlansToCompare.length >= 2 && setShowSideBySide(true)}
                  disabled={selectedPlansToCompare.length < 2}
                  className={`w-full mt-3 text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    selectedPlansToCompare.length >= 2
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  {selectedPlansToCompare.length >= 2 ? "Compare Selected Plans" : "Select at least 2 plans"}
                </button>
              </div>

              {/* Need Help */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Need help choosing?</p>
                <p className="text-xs text-gray-500 mb-3">Our insurance experts can help you pick the right plan</p>
                <button className="w-full text-sm font-semibold text-[#98272A] py-2 border border-[#98272A]/30 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= Side by Side Comparison Modal ========= */}
      {showSideBySide && plansToCompare.length >= 2 && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSideBySide(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl animate-slide-up z-10 max-h-[95vh] flex flex-col">
            <div className="p-4 pb-2 border-b border-gray-200">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Plan Comparison
                  </h3>
                  <p className="text-xs text-gray-500">
                    {plansToCompare.length} plans compared
                  </p>
                </div>
                <button
                  onClick={() => setShowSideBySide(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {/* Plan Headers */}
              <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="flex">
                  <div className="w-28 flex-shrink-0 p-3 bg-gray-50"></div>
                  {plansToCompare.map((plan: any) => (
                    <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-200">
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">{plan.name}</p>
                      <p className="text-lg font-bold text-[#98272A] mt-1">{plan.premiumMonthly || plan.premium}</p>
                      {plan.recommended && (
                        <span className="inline-block mt-1 text-[8px] bg-[#98272A] text-white px-1.5 py-0.5 rounded-full">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-gray-100">
                {/* Coverage */}
                <div className="flex">
                  <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Coverage</div>
                  {plansToCompare.map((plan: any) => (
                    <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs font-semibold text-gray-900">
                      {plan.coverage}
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex">
                  <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Rating</div>
                  {plansToCompare.map((plan: any) => (
                    <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100">
                      <span className="text-xs font-semibold text-yellow-600">⭐ {plan.rating}</span>
                    </div>
                  ))}
                </div>

                {/* Claim Settlement */}
                <div className="flex">
                  <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Claim Settlement</div>
                  {plansToCompare.map((plan: any) => (
                    <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs font-semibold text-green-600">
                      {plan.claimSettlement}
                    </div>
                  ))}
                </div>

                {/* Dynamic comparison rows based on category */}
                {selectedCategory === "health" && (
                  <>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Room Rent</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.roomRent}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Co-pay</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.copay}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Pre-existing Wait</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.preExistingWait}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Hospitals</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-blue-600 font-semibold">
                          {plan.details.networkHospitals}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Maternity</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.maternityWait}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Restore</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-green-600 font-semibold">
                          {plan.details.restoreBenefit}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">NCB</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.noClaimBonus}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">OPD Cover</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.opdCover || "Not Covered"}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedCategory === "motor" && (
                  <>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Own Damage</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.ownDamage}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Third Party</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.thirdPartyLiability}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Garages</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-blue-600 font-semibold">
                          {plan.details.garages}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Depreciation</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.depreciation || "Standard"}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">RSA</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.roadside || "Not Included"}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedCategory === "life" && (
                  <>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Sum Assured</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.sumAssured}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Policy Term</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.policyTerm}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Critical Illness</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.criticalIllness}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600">Accidental</div>
                      {plansToCompare.map((plan: any) => (
                        <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                          {plan.details.accidentalDeath}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {(selectedCategory === "travel" || selectedCategory === "home" || selectedCategory === "cyber") && (
                  <>
                    {Object.keys(plansToCompare[0]?.details || {}).slice(0, 6).map((key) => (
                      <div key={key} className="flex">
                        <div className="w-28 flex-shrink-0 p-3 bg-gray-50 text-xs font-semibold text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        {plansToCompare.map((plan: any) => (
                          <div key={plan.id} className="flex-1 p-3 text-center border-l border-gray-100 text-xs text-gray-700">
                            {plan.details[key] || "-"}
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3">
                {plansToCompare.map((plan: any) => (
                  <button
                    key={plan.id}
                    onClick={() => setCurrentScreen(`buy_policy_${selectedCategory}`)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${
                      plan.recommended
                        ? "bg-[#98272A] text-white"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    Buy {plan.name.split(' ').pop()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= Plan Full Details Modal ========= */}
      {showPlanDetails && selectedPlanForDetails && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPlanDetails(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl animate-slide-up z-10 max-h-[95vh] flex flex-col">
            {/* Header */}
            <div className={`p-5 text-white ${
              selectedCategory === "health" ? "bg-gradient-to-r from-blue-500 to-blue-600" :
              selectedCategory === "motor" ? "bg-gradient-to-r from-orange-500 to-orange-600" :
              selectedCategory === "life" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" :
              selectedCategory === "travel" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
              selectedCategory === "home" ? "bg-gradient-to-r from-teal-500 to-teal-600" :
              "bg-gradient-to-r from-rose-500 to-rose-600"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setShowPlanDetails(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">{selectedPlanForDetails.rating}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold">{selectedPlanForDetails.name}</h2>
              <p className="text-sm opacity-80">{selectedPlanForDetails.provider}</p>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-3xl font-bold">{selectedPlanForDetails.premiumMonthly || selectedPlanForDetails.premium}</span>
                {selectedPlanForDetails.premiumMonthly && (
                  <span className="text-sm opacity-70">or {selectedPlanForDetails.premium}</span>
                )}
              </div>
              {selectedPlanForDetails.recommended && (
                <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
                  ⭐ Most Popular Choice
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Key Highlights */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Key Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanForDetails.highlights.map((h: string, i: number) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coverage */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Coverage Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedPlanForDetails.coverage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Claim Settlement</p>
                    <p className="text-lg font-bold text-green-600">{selectedPlanForDetails.claimSettlement}</p>
                  </div>
                </div>
              </div>

              {/* All Details */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Plan Details</h3>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {Object.entries(selectedPlanForDetails.details).map(([key, value], i) => (
                    <div key={key} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <span className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-xs font-semibold text-gray-900 text-right max-w-[50%]">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Not Covered */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">What's Not Covered</h3>
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanForDetails.exclusions.map((exc: string, i: number) => (
                      <span key={i} className="text-xs text-red-700 bg-white px-3 py-1.5 rounded-full">
                        ✗ {exc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Customer Reviews</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl font-bold text-gray-900">{selectedPlanForDetails.rating}</div>
                    <div>
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(selectedPlanForDetails.rating))}
                        {"☆".repeat(5 - Math.floor(selectedPlanForDetails.rating))}
                      </div>
                      <p className="text-xs text-gray-500">{selectedPlanForDetails.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-3">{star}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <button 
                onClick={() => setCurrentScreen(`buy_policy_${selectedCategory}`)}
                className="w-full py-4 bg-[#98272A] text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                Buy Now - {selectedPlanForDetails.premiumMonthly || selectedPlanForDetails.premium}
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                🔒 100% secure payment
              </p>
            </div>
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
