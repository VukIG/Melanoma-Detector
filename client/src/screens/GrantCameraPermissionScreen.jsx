import { View, Text } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { ProgressStepBar } from '../components/ProgressStepBar';
import { scaleVertical } from '../helpers/scale';
import { AllowCamera } from '../constants/svg';
import * as ImagePicker from 'expo-image-picker';
import PermissionsContext from '../context/PermissionsContext';
import { useContext } from 'react';

const GrantCameraPermissionScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  const { cameraPermission, setCameraPermission } =
    useContext(PermissionsContext);

  const grantCameraPermission = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status == 'granted') {
      setCameraPermission(true);
      console.log('CHIPICHIPI DABA DUBI DUBI DABA');
      //Navigate to the next screen using the navigation.navigate
    } else {
      setCameraPermission(false);
    }
  };

  return (
    <BaseScreen>
      <View
        style={[
          basicStyles.CENTER_COL,
          { flex: 1, paddingVertical: scaleVertical(30) },
        ]}
      >
        <View
          style={{
            width: '100%',
            height: '70%',
            transform: [{ translateX: 35 }, { translateY: 100 }],
          }}
        >
          <AllowCamera width={'100%'} height={'60%'} />
        </View>
        <Text
          style={[
            basicStyles.FONTPRIMARY,
            { fontSize: 40, textAlign: 'center', marginTop: -90 },
          ]}
        >
          Allow your camera
        </Text>
        <View
          style={[basicStyles.CENTER_COL, { width: '70%', flex: 1, gap: 20 }]}
        >
          <Text style={[basicStyles.FONT16]}>
            We need an image of your mole. Please grant us the permission to
            access your camera or gallery in order to get the image.
          </Text>
          <View style={{ width: '100%' }}>
            <PrimaryButton
              title={'Enable Camera'}
              onPress={() => grantCameraPermission()}
            />
            <SecondaryButton
              title={'Not now'}
              onPress={() => navigation.navigate('ScanPhotoScreen')}
            />
          </View>
        </View>
        <ProgressStepBar currentStepIndex={1} />
      </View>
    </BaseScreen>
  );
};

export default GrantCameraPermissionScreen;
