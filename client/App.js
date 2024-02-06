import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
}
