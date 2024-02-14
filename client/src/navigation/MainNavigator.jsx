import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '@screens/Welcome';
import GrantCameraPermissionScreen from '@screens/GrantCameraPermissionScreen';
import GrantGalleryPermissionScreen from '@screens/GrantGalleryPermissionScreen';
import ScanPhotoScreen from '@screens/ScanPhotoScreen';
import DiagnosisScreen from '@screens/DiagnosisScreen';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name={'Welcome'} component={WelcomeScreen} />
        <MainStack.Screen
          name={'GrantCameraPermissionScreen'}
          component={GrantCameraPermissionScreen}
        />
        <MainStack.Screen
          name={'GrantGalleryPermissionScreen'}
          component={GrantGalleryPermissionScreen}
        />
        <MainStack.Screen
          name={'ScanPhotoScreen'}
          component={ScanPhotoScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
