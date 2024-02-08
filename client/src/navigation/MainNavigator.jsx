import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "@screens/Welcome";
import GrantCameraPermissionScreen from "@screens/GrantCameraPermissionScreen";

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name={"Welcome"} component={WelcomeScreen} />
        <MainStack.Screen name={"GrantCameraPermissionScreen"} component={GrantCameraPermissionScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
