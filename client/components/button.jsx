import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
// import { LinearGradient } from 'expo-linear-gradient';
import styles from '../components/Styles'; 

const ImageButtons = ({ setImage }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const grabFromCamera = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } else {
      setCameraPermission(false);
    }
  };

  const grabFromLibrary = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } else {
      setGalleryPermission(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={grabFromCamera}>
        <Feather name="camera" size={24} color="white" style={styles.buttonIcons}/>
        <Text style={styles.buttonTextWhite}>Take a picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={grabFromLibrary}>
      {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}></LinearGradient> */}
        <AntDesign name="picture" size={24} color="black" style={styles.buttonIcons}/>
        <Text style={styles.buttonTextBlue}>Open Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageButtons;
