import { FeatureFlagsProvider } from "@/context/FeatureFlagsContext";
import FlagSwitcher from "@/components/FlagSwitcher";

function App() {
  return (
    <FeatureFlagsProvider>
      <div className="bg-red-web min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-6">Feature Flags Switcher</h1>
        <FlagSwitcher/>
      </div>
    </FeatureFlagsProvider>
  );
}

export default App;
