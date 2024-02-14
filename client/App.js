import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { PermissionProvider } from './src/context/PermissionsContext';
import { ImageProvider } from './src/context/ImageContext';

export default function App() {
  return (
    <PermissionProvider>
      <ImageProvider>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </ImageProvider>
    </PermissionProvider>
  );
}
