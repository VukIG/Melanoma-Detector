import { View, Text } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scale, scaleVertical } from '../helpers/scale';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { ProgressStepBar } from '../components/ProgressStepBar';
import { WelcomeSvg } from '../constants/svg';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from 'react';
import PermissionsContext from '../context/PermissionsContext';

const ScanPhotoScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();
  const [errors,setErrors] = useState({
    camera: false,
    gallery: false
  })
  const { cameraPermissions, galleryPermissions, setImage } = useContext(PermissionsContext)
  console.log(cameraPermissions)
  async function captuerImage() {
    if (cameraPermissions === true) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
    else{
      setErrors(prevState => ({
        ...prevState,
        camera: true
      }))
    }
  }

  return (
    <BaseScreen>
      <View style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
        height:"97%"
      }}>
        <WelcomeSvg width={'100%'} height={'60%'} />
        <View
          style={[
            {
              alignItems:"center",
              flex: 1,
              width: '70%',
              gap: scaleVertical(8),
            },
          ]}
        >
          <Text style={[basicStyles.FONTPRIMARY, { fontWeight:"bold", fontSize:35}]}>
            Let's start
          </Text>
          <Text style={{textAlign:'center', fontSize:17}}>
            Upload a picture of your naveus from the gallery, or
            take a picture of it with your camera
          </Text>
        </View>
        <View
          style={{position:"absolute",top:"79%",display:"flex",alignItems:"stretch"}}
        >
          <PrimaryButton
            title={'Take a picture'}
            icon={<Ionicons name="camera-outline" size={24} color="white" />}
            onPress={()=>{}}
          />
          <SecondaryButton
            title={'Upload from gallery'}
            icon={<Ionicons name="image-outline" size={24} color="rgb(0,179,255)" />}
            style={{ height: 30, width: "auto" }}
          />
        </View>
        <ProgressStepBar 
          currentStepIndex={3} 
          stepSize={5} 
        />
      </View>
    </BaseScreen>
  );
};
export default ScanPhotoScreen;
