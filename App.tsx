import { useState } from "react";
import BankingHome from "./BankingHome";
import IndusShieldHub from "./IndusShieldHub";
import PolicyDetails from "./PolicyDetails";
import RenewPolicy from "./RenewPolicy";
import ClaimPage from "./ClaimPage";
import BuyPolicyFlow from "./BuyPolicyFlow";
import {
  TelemedicinePage,
  RoadsideHelpPage,
  HomeAssistPage,
  CyberCheckPage,
} from "./EcosystemServices";

function App() {
  const [currentScreen, setCurrentScreen] = useState("banking_home");

  // Extract policy ID from screen name if viewing policy details
  const getPolicyId = () => {
    if (currentScreen.startsWith("policy_details_")) {
      return parseInt(currentScreen.split("_")[2]) || 1;
    }
    return 1;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen relative overflow-hidden shadow-2xl">
      {currentScreen === "banking_home" && (
        <BankingHome setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "insurance_hub" && (
        <IndusShieldHub setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen.startsWith("policy_details_") && (
        <PolicyDetails
          setCurrentScreen={setCurrentScreen}
          policyId={getPolicyId()}
        />
      )}
      {currentScreen === "renew_policy" && (
        <RenewPolicy setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "telemedicine" && (
        <TelemedicinePage setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "roadside_help" && (
        <RoadsideHelpPage setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "home_assist" && (
        <HomeAssistPage setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "cyber_check" && (
        <CyberCheckPage setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "claims" && (
        <ClaimPage setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen.startsWith("claims_policy_") && (
        <ClaimPage
          setCurrentScreen={setCurrentScreen}
          policyId={parseInt(currentScreen.split("_")[2]) || undefined}
        />
      )}
      {currentScreen === "buy_policy" && (
        <BuyPolicyFlow setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen.startsWith("buy_policy_") && (
        <BuyPolicyFlow
          setCurrentScreen={setCurrentScreen}
          category={currentScreen.split("_")[2]}
        />
      )}
    </div>
  );
}

export default App;
