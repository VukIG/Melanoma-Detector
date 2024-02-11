import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation/MainNavigator";
import { PermissionProvider } from "./src/context/PermissionsContext";

export default function App() {
  return (
    <PermissionProvider>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </PermissionProvider>
  );
}
