import React from "react";
import {
  Menu,
  Bell,
  Search,
  Shield,
  ArrowRightLeft,
  Smartphone,
  CreditCard,
  QrCode,
  Wallet,
  Receipt,
  Gift,

  ChevronRight,
  Car,
} from "lucide-react";

interface BankingHomeProps {
  setCurrentScreen: (screen: string) => void;
}

const BankingHome: React.FC<BankingHomeProps> = ({ setCurrentScreen }) => {
  const [activeTab, setActiveTab] = React.useState("I OWN");
  const tabs = ["I OWN", "I OWE", "I PROTECT"];

  const quickLinks = [
    { icon: ArrowRightLeft, label: "Fund Transfer", color: "text-[#98272A]" },
    { icon: Smartphone, label: "UPI", color: "text-purple-600" },
    { icon: CreditCard, label: "Cards", color: "text-blue-600" },
    { icon: QrCode, label: "Scan & Pay", color: "text-green-600" },
    { icon: Wallet, label: "Deposits", color: "text-amber-600" },
    { icon: Receipt, label: "Bill Pay", color: "text-teal-600" },
    { icon: Gift, label: "Rewards", color: "text-pink-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#98272A] text-white px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 cursor-pointer" />
            <div>
              <p className="text-lg font-semibold">Welcome RASHMI</p>
              <p className="text-xs text-red-200 opacity-80">
                Last Login 20-July-26
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <Bell className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white flex border-b border-gray-200 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-colors ${
              activeTab === tab
                ? "text-[#98272A] border-b-2 border-[#98272A]"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Savings Account Card */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-[#98272A] to-[#b83235] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                  Savings Account
                </p>
                <p className="text-2xl font-bold mt-1">₹ 39,613.02</p>
                <p className="text-xs opacity-70 mt-1">A/c •••• 4471</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                  Primary
                </div>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Quick Actions
            </p>
            <div className="grid grid-cols-4 gap-3">
              {quickLinks.map((link, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-1.5 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center">
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                  </div>
                  <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
                    {link.label}
                  </span>
                </button>
              ))}

              {/* IndusShield Icon with NEW badge */}
              <button
                onClick={() => setCurrentScreen("insurance_hub")}
                className="flex flex-col items-center gap-1.5 py-2 hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center border-2 border-[#98272A]/20">
                    <Shield className="w-5 h-5 text-[#98272A]" />
                  </div>
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-[8px] font-bold text-gray-900 px-1.5 py-0.5 rounded-full shadow-sm">
                    NEW
                  </span>
                </div>
                <span className="text-[10px] text-[#98272A] font-bold text-center leading-tight">
                  IndusShield
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Contextual Banner */}
        <div className="px-4 pt-4">
          <div
            onClick={() => setCurrentScreen("insurance_hub")}
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#98272A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Car className="w-5 h-5 text-[#98272A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#98272A] bg-[#98272A]/10 px-2 py-0.5 rounded-full">
                    Pre-Approved for You
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  Congratulations on your new Car Loan!
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Secure your vehicle instantly with{" "}
                  <span className="font-semibold text-[#98272A]">
                    IndusShield Motor
                  </span>
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">
                Recent Transactions
              </p>
              <button className="text-xs text-[#98272A] font-semibold">
                View All
              </button>
            </div>
            {[
              {
                name: "Amazon India",
                amount: "- ₹2,499",
                date: "19 Jul",
                color: "text-red-500",
              },
              {
                name: "Salary Credit",
                amount: "+ ₹85,000",
                date: "15 Jul",
                color: "text-green-600",
              },
              {
                name: "Electricity Bill",
                amount: "- ₹1,340",
                date: "12 Jul",
                color: "text-red-500",
              },
            ].map((txn, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-3 ${
                  i < 2 ? "border-b border-gray-100" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {txn.name}
                  </p>
                  <p className="text-xs text-gray-400">{txn.date}</p>
                </div>
                <p className={`text-sm font-semibold ${txn.color}`}>
                  {txn.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 flex items-center justify-around py-2 shadow-lg z-30">
        {[
          { label: "Home", active: true },
          { label: "Payments" },
          { label: "Products" },
          { label: "More" },
        ].map((item, i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 ${
              item.active ? "text-[#98272A]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full ${
                item.active ? "bg-[#98272A]" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-[10px] font-medium ${
                item.active ? "font-bold" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BankingHome;
