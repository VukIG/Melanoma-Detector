import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { PermissionProvider } from './src/context/PermissionsContext';
import { ImageProvider } from './src/context/ImageContext';
import { FormProvider } from './src/context/FormContext';

export default function App() {
  return (
    <PermissionProvider>
      <ImageProvider>
        <FormProvider>
          <SafeAreaProvider>
            <MainNavigator />
          </SafeAreaProvider>
        </FormProvider>
      </ImageProvider>
    </PermissionProvider>
  );
}
