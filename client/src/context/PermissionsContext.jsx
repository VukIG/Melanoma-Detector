import { createContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PermissionsContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({
    camera: false,
    gallery: false,
  });

  const [errors, setErrors] = useState({
    cameraDenied: false,
    galleryDenied: false,
  });

  const [image, setImage] = useState('');

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
  };

  const captureImage = async (isCamera) => {
    const permission = isCamera ? permissions.camera : permissions.gallery;
    const errorKey = isCamera ? 'camera' : 'gallery';

    if (permission === true) {
      let result;
      if (isCamera) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].base64);
        sendImage();
        console.log(image);
      }
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [errorKey]: true,
      }));
    }
  };

  const sendImage = async (base64Image) => {
    try {
      const formData = new FormData();
      formData.append('image', base64Image);
  
      fetch('http://192.168.1.3:8080')
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

      console.log('Image uploaded successfully:', response.data);
      
    } catch (error) {
      console.error('Error uploading image:', error);

    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        setPermissions,
        grantPermission,
        image,
        setImage,
        captureImage,
        errors,
        setErrors,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;