import { createContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import PermissionsContext from '../context/PermissionsContext';
import { useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState('');
  const [imgUri, setImgUri] = useState('');
  const { permissions } = useContext(PermissionsContext);

  const captureImage = async (isCamera) => {
    const permission = isCamera ? permissions.camera : permissions.gallery;

    if (permission === true) {
      let result;
      if (isCamera) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
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
        setImgUri(result.assets[0].uri);
        //sendImage();
      }
    }
  };

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        captureImage,
        imgUri,
        setImgUri,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;