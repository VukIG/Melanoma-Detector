import { createContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const PermissionsContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [lastPressed, setLastPressed] = useState('none');

  const [permissions, setPermissions] = useState({
    camera: false,
    gallery: false,
  });

  const grantPermission = async (isCamera) => {
    const keyValue = isCamera ? 'camera' : 'gallery';
    let optionStatus;
    if (isCamera) {
      optionStatus = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      optionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (optionStatus.status == 'granted') {
      setPermissions((prev) => ({
        ...prev,
        [keyValue]: true,
      }));
      console.log('CHIPICHIPI DABA DUBI DUBI DABA');
    } else {
      setPermissions((prev) => ({
        ...prev,
        [keyValue]: false,
      }));
    }
    setLastPressed((prev) => ({
      ...prev,
      [keyValue]: true,
    }));
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        setPermissions,
        grantPermission,
        lastPressed,
        setLastPressed,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;
