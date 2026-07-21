import React, { useState } from "react";
import {
  ChevronLeft,
  Car,
  Check,
  Shield,
  AlertTriangle,
  ChevronRight,
  CreditCard,
  Building2,
  Smartphone,
  Gift,
  Clock,
  Percent,
  Sparkles,
  Lock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface RenewPolicyProps {
  setCurrentScreen: (screen: string) => void;
}

const RenewPolicy: React.FC<RenewPolicyProps> = ({ setCurrentScreen }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("comprehensive");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["zero_dep", "engine"]);
  const [paymentMethod, setPaymentMethod] = useState("account");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const plans = [
    {
      id: "comprehensive",
      name: "Comprehensive",
      description: "Own Damage + Third Party",
      price: "₹8,240",
      popular: true,
    },
    {
      id: "thirdparty",
      name: "Third Party Only",
      description: "Mandatory cover only",
      price: "₹2,094",
      popular: false,
    },
  ];

  const addons = [
    { id: "zero_dep", name: "Zero Depreciation", price: "₹1,850", desc: "Full claim without depreciation" },
    { id: "engine", name: "Engine Protector", price: "₹1,200", desc: "Covers engine damage from water" },
    { id: "ncb", name: "NCB Protection", price: "₹650", desc: "Protect your no-claim bonus" },
    { id: "rsa", name: "24x7 Roadside Assist", price: "₹499", desc: "Towing, battery, flat tire help" },
    { id: "key", name: "Key Replacement", price: "₹299", desc: "Lost key replacement cover" },
    { id: "rti", name: "Return to Invoice", price: "₹1,100", desc: "Get invoice value on total loss" },
  ];

  const calculateTotal = () => {
    let total = selectedPlan === "comprehensive" ? 8240 : 2094;
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        total += parseInt(addon.price.replace(/[₹,]/g, ""));
      }
    });
    // Apply 50% NCB
    const ncbDiscount = Math.round(total * 0.5);
    return { subtotal: total, ncb: ncbDiscount, total: total - ncbDiscount };
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2500);
  };

  const totals = calculateTotal();

  if (completed) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-500 to-emerald-600">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-white text-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Renewal Successful!</h1>
          <p className="text-green-100 mt-2">
            Your motor insurance has been renewed
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 mt-8 w-full max-w-xs">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-80">Policy Number</span>
                <span className="font-semibold">IND-MTR-2026-789456</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Valid Till</span>
                <span className="font-semibold">01 Aug 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Amount Paid</span>
                <span className="font-bold text-lg">₹{totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 w-full max-w-xs">
            <button
              onClick={() => setCurrentScreen("policy_details_2")}
              className="w-full py-3.5 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors"
            >
              View Policy Details
            </button>
            <button
              onClick={() => setCurrentScreen("insurance_hub")}
              className="w-full py-3.5 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
            >
              Back to IndusShield Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#98272A] text-white px-4 pt-10 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen("insurance_hub")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Renew Motor Insurance</h1>
            <p className="text-xs text-red-200">MH 12 AB 3456 • Hyundai Creta</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-white text-[#98272A]" : "bg-white/20 text-white"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${
                    step > s ? "bg-white" : "bg-white/20"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] opacity-80">
          <span>Choose Plan</span>
          <span>Add-ons</span>
          <span>Payment</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {step === 1 && (
          <div className="p-4 space-y-4">
            {/* Current Policy Info */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-900">
                    Your policy expires on 01 Aug 2026
                  </p>
                  <p className="text-xs text-orange-700 mt-0.5">
                    Renew now to keep your 50% NCB discount worth ₹4,120
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Select Plan Type
              </p>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedPlan === plan.id
                        ? "border-[#98272A] bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                            selectedPlan === plan.id
                              ? "border-[#98272A] bg-[#98272A]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPlan === plan.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-gray-900">
                              {plan.name}
                            </p>
                            {plan.popular && (
                              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {plan.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* IDV Selection */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  Insured Declared Value (IDV)
                </p>
                <button className="text-xs text-[#98272A] font-semibold">
                  Change
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">₹8,50,000</p>
                    <p className="text-xs text-gray-500">
                      Market value of your vehicle
                    </p>
                  </div>
                  <Car className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* NCB Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">
                    50% No Claim Bonus Applied
                  </p>
                  <p className="text-xs text-green-700">
                    You're saving ₹4,120 on this renewal
                  </p>
                </div>
                <Gift className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Protect Your Car Better
              </p>
              <span className="text-xs text-gray-400">
                {selectedAddons.length} selected
              </span>
            </div>

            <div className="space-y-3">
              {addons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAddons.includes(addon.id)
                      ? "border-[#98272A] bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                          selectedAddons.includes(addon.id)
                            ? "border-[#98272A] bg-[#98272A]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAddons.includes(addon.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {addon.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {addon.desc}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#98272A]">
                      +{addon.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Bundle Offer */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Smart Bundle
                </span>
              </div>
              <p className="text-sm font-semibold">
                Add all 6 add-ons & save ₹800
              </p>
              <button className="mt-3 text-xs font-bold bg-white text-purple-600 px-4 py-2 rounded-lg">
                Apply Bundle
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-4 space-y-4">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Payment Summary
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {selectedPlan === "comprehensive"
                      ? "Comprehensive Plan"
                      : "Third Party Plan"}
                  </span>
                  <span className="text-gray-900">
                    ₹{selectedPlan === "comprehensive" ? "8,240" : "2,094"}
                  </span>
                </div>
                {selectedAddons.map((addonId) => {
                  const addon = addons.find((a) => a.id === addonId);
                  return addon ? (
                    <div key={addonId} className="flex justify-between text-sm">
                      <span className="text-gray-500">{addon.name}</span>
                      <span className="text-gray-900">{addon.price}</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">
                      ₹{totals.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>NCB Discount (50%)</span>
                    <span>-₹{totals.ncb.toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#98272A]">
                      ₹{totals.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Payment Method
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("account")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === "account"
                      ? "border-[#98272A] bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "account"
                          ? "border-[#98272A] bg-[#98272A]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "account" && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#98272A]/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#98272A]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        IndusInd Savings Account
                      </p>
                      <p className="text-xs text-gray-500">
                        A/c •••• 4471 • Bal: ₹39,613
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === "card"
                      ? "border-[#98272A] bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "card"
                          ? "border-[#98272A] bg-[#98272A]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Credit/Debit Card
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay with any card
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === "upi"
                      ? "border-[#98272A] bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "upi"
                          ? "border-[#98272A] bg-[#98272A]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "upi" && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">UPI</p>
                      <p className="text-xs text-gray-500">
                        Pay via UPI app
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* EMI Option */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Pay in 3 easy EMIs
                    </p>
                    <p className="text-xs text-blue-700">
                      ₹{Math.round(totals.total / 3).toLocaleString()}/month • No interest
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Lock className="w-3 h-3" />
              <span>Secured by IndusInd Bank • 256-bit encryption</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400">Total Amount</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{totals.total.toLocaleString()}
            </p>
          </div>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-semibold text-[#98272A]"
            >
              Go Back
            </button>
          )}
        </div>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-4 bg-[#98272A] text-white font-bold rounded-xl hover:bg-[#7a1f22] transition-colors flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePayment}
            disabled={processing}
            className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              processing
                ? "bg-green-400 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {processing ? (
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
                Processing Payment...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Pay ₹{totals.total.toLocaleString()} & Renew
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default RenewPolicy;
