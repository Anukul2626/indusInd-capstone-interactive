import { useState } from "react";
import BankingHome from "./BankingHome";
import IndusShieldHub from "./IndusShieldHub";

function App() {
  const [currentScreen, setCurrentScreen] = useState("banking_home");

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen relative overflow-hidden shadow-2xl">
      {currentScreen === "banking_home" && (
        <BankingHome setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "insurance_hub" && (
        <IndusShieldHub setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
