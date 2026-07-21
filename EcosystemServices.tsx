import React, { useState } from "react";
import {
  ChevronLeft,
  Phone,
  Video,
  Star,
  Search,
  MapPin,
  Car,
  Wrench,
  Battery,
  Fuel,
  Key,
  AlertCircle,
  Home,
  Droplets,
  Zap,
  Bug,
  Lock,
  Shield,
  Wifi,
  CreditCard,
  Mail,
  Eye,
  CheckCircle,
  ChevronRight,
  User,
  MessageCircle,
  FileText,
  ArrowRight,
  X,
  Play,
} from "lucide-react";

interface ServicePageProps {
  setCurrentScreen: (screen: string) => void;
}

// ============== TELEMEDICINE PAGE ==============
export const TelemedicinePage: React.FC<ServicePageProps> = ({
  setCurrentScreen,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const specialties = [
    { id: "general", name: "General Physician", icon: "🩺", available: 12 },
    { id: "derma", name: "Dermatologist", icon: "🧴", available: 8 },
    { id: "pediatric", name: "Pediatrician", icon: "👶", available: 6 },
    { id: "gynec", name: "Gynecologist", icon: "👩", available: 5 },
    { id: "ortho", name: "Orthopedic", icon: "🦴", available: 4 },
    { id: "mental", name: "Mental Health", icon: "🧠", available: 7 },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      experience: "12 years",
      rating: 4.9,
      reviews: 248,
      available: "Available Now",
      fee: "₹0",
      image: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Dr. Rahul Mehta",
      specialty: "General Physician",
      experience: "8 years",
      rating: 4.8,
      reviews: 186,
      available: "Next slot: 2:30 PM",
      fee: "₹0",
      image: "👨‍⚕️",
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      specialty: "General Physician",
      experience: "15 years",
      rating: 4.9,
      reviews: 412,
      available: "Available Now",
      fee: "₹0",
      image: "👩‍⚕️",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Telemedicine</h1>
            <p className="text-xs text-blue-100">24/7 Doctor Consultations</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors, symptoms..."
            className="w-full bg-white text-gray-800 text-sm rounded-xl pl-10 pr-4 py-3 outline-none"
          />
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">50+</p>
            <p className="text-[10px] opacity-80">Doctors Online</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">FREE</p>
            <p className="text-[10px] opacity-80">With Your Policy</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">&lt;5min</p>
            <p className="text-[10px] opacity-80">Avg Wait Time</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Specialties */}
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Choose Specialty
          </p>
          <div className="grid grid-cols-3 gap-3">
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedSpecialty === spec.id
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-white border-2 border-transparent shadow-sm"
                }`}
              >
                <span className="text-2xl">{spec.icon}</span>
                <p className="text-xs font-medium text-gray-900 mt-1">
                  {spec.name}
                </p>
                <p className="text-[10px] text-green-600 mt-0.5">
                  {spec.available} online
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Available Doctors
          </p>
          <div className="space-y-3">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl">
                    {doc.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">{doc.specialty}</p>
                        <p className="text-xs text-gray-400">
                          {doc.experience} experience
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-bold">{doc.rating}</span>
                          <span className="text-xs text-gray-400">
                            ({doc.reviews})
                          </span>
                        </div>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          {doc.fee}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-xs font-medium ${
                          doc.available.includes("Now")
                            ? "text-green-600"
                            : "text-orange-500"
                        }`}
                      >
                        {doc.available}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowBooking(true)}
                          className="flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg"
                        >
                          <Video className="w-3 h-3" />
                          Video
                        </button>
                        <button className="flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg">
                          <Phone className="w-3 h-3" />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Health Tips
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { title: "Stay Hydrated", emoji: "💧", color: "from-cyan-400 to-blue-500" },
              { title: "Sleep Well", emoji: "😴", color: "from-purple-400 to-indigo-500" },
              { title: "Exercise Daily", emoji: "🏃", color: "from-green-400 to-emerald-500" },
            ].map((tip, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-32 bg-gradient-to-br ${tip.color} rounded-xl p-4 text-white`}
              >
                <span className="text-3xl">{tip.emoji}</span>
                <p className="text-sm font-semibold mt-2">{tip.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowBooking(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <h3 className="text-lg font-bold text-gray-900">
              Confirm Consultation
            </h3>
            <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                👩‍⚕️
              </div>
              <div>
                <p className="text-sm font-bold">Dr. Priya Sharma</p>
                <p className="text-xs text-gray-500">General Physician</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-blue-500 text-blue-600 rounded-xl font-semibold">
                <Video className="w-4 h-4" />
                Video Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-semibold">
                <Phone className="w-4 h-4" />
                Voice Call
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              ✓ Covered under your Indus Health Elite policy
            </p>
          </div>
        </div>
      )}

      {/* Emergency Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full py-4 bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg">
          <Phone className="w-5 h-5" />
          Emergency: Call Doctor Now
        </button>
      </div>
    </div>
  );
};

// ============== ROADSIDE HELP PAGE ==============
export const RoadsideHelpPage: React.FC<ServicePageProps> = ({
  setCurrentScreen,
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const services = [
    { id: "tow", name: "Towing", icon: Car, desc: "Vehicle breakdown tow" },
    { id: "battery", name: "Battery Jump", icon: Battery, desc: "Dead battery assistance" },
    { id: "tire", name: "Flat Tire", icon: Wrench, desc: "Tire change service" },
    { id: "fuel", name: "Fuel Delivery", icon: Fuel, desc: "Emergency fuel" },
    { id: "lockout", name: "Key Lockout", icon: Key, desc: "Locked out of car" },
    { id: "minor", name: "Minor Repairs", icon: Wrench, desc: "On-spot repairs" },
  ];

  const handleRequest = () => {
    setRequestSent(true);
  };

  if (requestSent) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-500 to-red-500">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-white text-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Help is on the way!</h1>
          <p className="text-orange-100 mt-2">
            Our partner will reach you shortly
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 mt-8 w-full max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-2xl">
                🚗
              </div>
              <div className="text-left">
                <p className="font-bold">Ravi Kumar</p>
                <p className="text-sm opacity-80">RSA Partner • MH 12 XY 9999</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-80">ETA</span>
                <span className="font-semibold">12 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Request ID</span>
                <span className="font-semibold">RSA-2026-45678</span>
              </div>
            </div>
          </div>

          <button className="mt-6 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold">Call Partner</span>
          </button>

          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="mt-8 text-sm underline opacity-80"
          >
            Back to IndusShield Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Roadside Assistance</h1>
            <p className="text-xs text-orange-100">24/7 Emergency Help</p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white/15 rounded-xl p-3 flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <div className="flex-1">
            <p className="text-xs opacity-80">Your Location</p>
            <p className="text-sm font-semibold">
              Detecting your location...
            </p>
          </div>
          <button className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
            Change
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Vehicle Info */}
        <div className="p-4">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <Car className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">MH 12 AB 3456</p>
              <p className="text-xs text-gray-500">Hyundai Creta SX(O)</p>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Covered
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            What do you need?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedService === service.id
                    ? "bg-orange-50 border-2 border-orange-500"
                    : "bg-white border-2 border-transparent shadow-sm"
                }`}
              >
                <service.icon
                  className={`w-6 h-6 ${
                    selectedService === service.id
                      ? "text-orange-500"
                      : "text-gray-400"
                  }`}
                />
                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {service.name}
                </p>
                <p className="text-xs text-gray-500">{service.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Info */}
        <div className="p-4 pt-0">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Fully Covered - No Charges
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  Your Comprehensive Motor policy includes unlimited RSA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Service Coverage
          </p>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            {[
              { service: "Towing", limit: "Up to 50 km", included: true },
              { service: "Battery Jump", limit: "Unlimited", included: true },
              { service: "Flat Tire", limit: "Unlimited", included: true },
              { service: "Fuel Delivery", limit: "Up to 5L", included: true },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm text-gray-700">{item.service}</span>
                <span className="text-xs font-semibold text-green-600">
                  {item.limit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleRequest}
          disabled={!selectedService}
          className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            selectedService
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          <AlertCircle className="w-5 h-5" />
          Request Assistance Now
        </button>
      </div>
    </div>
  );
};

// ============== HOME ASSIST PAGE ==============
export const HomeAssistPage: React.FC<ServicePageProps> = ({
  setCurrentScreen,
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    { id: "plumber", name: "Plumber", icon: Droplets, price: "₹199", available: "30 min" },
    { id: "electric", name: "Electrician", icon: Zap, price: "₹249", available: "25 min" },
    { id: "pest", name: "Pest Control", icon: Bug, price: "₹499", available: "45 min" },
    { id: "locksmith", name: "Locksmith", icon: Lock, price: "₹299", available: "20 min" },
    { id: "ac", name: "AC Repair", icon: Home, price: "₹349", available: "40 min" },
    { id: "appliance", name: "Appliance", icon: Wrench, price: "₹299", available: "35 min" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Home Assist</h1>
            <p className="text-xs text-green-100">On-demand home services</p>
          </div>
        </div>

        <div className="bg-white/15 rounded-xl p-3 flex items-center gap-3">
          <Home className="w-5 h-5" />
          <div className="flex-1">
            <p className="text-xs opacity-80">Service Address</p>
            <p className="text-sm font-semibold">
              402, Sunshine Apartments, Bandra West
            </p>
          </div>
          <button className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
            Change
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Services */}
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Choose Service
          </p>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedService === service.id
                    ? "bg-green-50 border-2 border-green-500"
                    : "bg-white border-2 border-transparent shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between">
                  <service.icon
                    className={`w-6 h-6 ${
                      selectedService === service.id
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-xs text-green-600 font-semibold">
                    {service.available}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {service.name}
                </p>
                <p className="text-xs text-gray-500">
                  From {service.price}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Policy Discount */}
        <div className="p-4 pt-0">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Policy Benefit</span>
            </div>
            <p className="text-sm font-semibold">
              Get 20% off on all home services
            </p>
            <p className="text-xs opacity-80 mt-0.5">
              As an Indus Health Elite member
            </p>
          </div>
        </div>

        {/* Popular Combos */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Popular Combos
          </p>
          <div className="space-y-3">
            {[
              { name: "Deep Home Cleaning", services: "4 rooms + Kitchen + Bathroom", price: "₹1,999", original: "₹2,499" },
              { name: "AC Service Pack", services: "2 ACs servicing + Filter cleaning", price: "₹899", original: "₹1,199" },
            ].map((combo, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{combo.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{combo.services}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{combo.price}</p>
                    <p className="text-xs text-gray-400 line-through">{combo.original}</p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 border border-green-500 text-green-600 text-xs font-semibold rounded-lg">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          disabled={!selectedService}
          className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            selectedService
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Book Service
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ============== CYBER CHECK PAGE ==============
export const CyberCheckPage: React.FC<ServicePageProps> = ({
  setCurrentScreen,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const threats = [
    { type: "Password Breach", severity: "high", desc: "2 passwords found in data breaches", icon: Lock },
    { type: "Dark Web Alert", severity: "medium", desc: "Email found on dark web", icon: Eye },
    { type: "Phishing Risk", severity: "low", desc: "3 suspicious emails blocked", icon: Mail },
  ];

  const protectionFeatures = [
    { name: "Identity Monitoring", icon: User, active: true },
    { name: "Financial Fraud Alert", icon: CreditCard, active: true },
    { name: "Dark Web Scanning", icon: Eye, active: true },
    { name: "Phishing Protection", icon: Shield, active: true },
    { name: "Social Media Guard", icon: MessageCircle, active: false },
    { name: "WiFi Security Check", icon: Wifi, active: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Cyber Check</h1>
            <p className="text-xs text-purple-100">Digital security monitoring</p>
          </div>
        </div>

        {/* Security Score */}
        <div className="bg-white/15 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Security Score</p>
              <p className="text-3xl font-bold mt-1">72<span className="text-lg opacity-60">/100</span></p>
              <p className="text-xs opacity-70 mt-1">
                {scanComplete ? "Scan completed" : "Last scan: 3 days ago"}
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="8"
                  strokeDasharray={`${72 * 2.2} ${100 * 2.2}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-8 h-8 opacity-80" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Scan Button */}
        <div className="p-4">
          <button
            onClick={handleScan}
            disabled={scanning}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              scanning
                ? "bg-purple-100 text-purple-400"
                : "bg-purple-500 text-white"
            }`}
          >
            {scanning ? (
              <>
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
                Scanning your digital footprint...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Security Scan
              </>
            )}
          </button>
        </div>

        {/* Threats Found */}
        {scanComplete && (
          <div className="p-4 pt-0">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Threats Detected
            </p>
            <div className="space-y-3">
              {threats.map((threat, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                    threat.severity === "high"
                      ? "border-red-500"
                      : threat.severity === "medium"
                      ? "border-orange-500"
                      : "border-yellow-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <threat.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        threat.severity === "high"
                          ? "text-red-500"
                          : threat.severity === "medium"
                          ? "text-orange-500"
                          : "text-yellow-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          {threat.type}
                        </p>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            threat.severity === "high"
                              ? "bg-red-50 text-red-600"
                              : threat.severity === "medium"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {threat.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {threat.desc}
                      </p>
                      <button className="mt-2 text-xs font-semibold text-purple-600 flex items-center gap-1">
                        Fix Now
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Protection Features */}
        <div className="p-4 pt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Protection Features
          </p>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {protectionFeatures.map((feature, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 ${
                  i < protectionFeatures.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 transition-all ${
                    feature.active ? "bg-purple-500 justify-end" : "bg-gray-200 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cyber Insurance Info */}
        <div className="p-4 pt-0">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 text-white">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold">Cyber Insurance Active</p>
                <p className="text-xs opacity-80 mt-0.5">
                  Coverage: ₹1,00,000 against cyber fraud
                </p>
                <button className="mt-2 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full">
                  View Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button className="w-full py-4 bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          View Full Security Report
        </button>
      </div>
    </div>
  );
};
