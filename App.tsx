import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/ThemeContext";
import { RootAppContent } from "./src/RootAppContent"; // Import the new component

export default function App() {
  React.useEffect(() => {
    try {
      const globalHandler = (global as any).ErrorUtils?.getGlobalHandler?.();
      (global as any).ErrorUtils?.setGlobalHandler?.(
        (error: any, isFatal: boolean) => {
          console.error("GlobalErrorHandler:", { error, isFatal });
          if (globalHandler) globalHandler(error, isFatal);
        }
      );
      return () => {
        if (globalHandler)
          (global as any).ErrorUtils?.setGlobalHandler?.(globalHandler);
      };
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootAppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
