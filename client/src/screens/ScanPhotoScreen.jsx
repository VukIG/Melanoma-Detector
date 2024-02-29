import { View, Text } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scaleVertical } from '../helpers/scale';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { ProgressStepBar } from '../components/ProgressStepBar';
import { WelcomeSvg } from '../constants/svg';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import ImageContext from '../context/ImageContext';

const ScanPhotoScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  const { permissions, lastPressed, setLastPressed } =
    useContext(PermissionsContext);

  const { captureImage } = useContext(ImageContext);

  const promptUser = () => {
    let prompt;

    if (!permissions.camera == true && lastPressed == 'camera') {
      prompt = 'Please make sure that you granted the app camera rights';
    } else if (!permissions.gallery == true && lastPressed == 'gallery') {
      prompt =
        'Please make sure to grant the app access to the photos of your gallery';
    } else {
      prompt =
        'Upload a picture of your naveus from the gallery, or take a picture of it with your camera';
    }
    return prompt;
  };

  return (
    <BaseScreen>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '97%',
        }}
      >
        <WelcomeSvg width={'100%'} height={'60%'} />
        <View
          style={[
            {
              alignItems: 'center',
              flex: 1,
              width: '70%',
              gap: scaleVertical(8),
            },
          ]}
        >
          <Text style={[basicStyles.FONTPRIMARY, { fontSize: 35 }]}>
            Let's start
          </Text>
          <Text
            style={[
              basicStyles.FONT16,
              !permissions.camera && !permissions.gallery
                ? { color: 'red' }
                : {},
              { textAlign: 'center', fontSize: 17 },
            ]}
          >
            {promptUser()}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '79%',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <PrimaryButton
            title={'Take a picture'}
            icon={<Ionicons name="camera-outline" size={30} color="white" />}
            onPress={() => {
              captureImage(true);
              setLastPressed('camera');
              navigation.navigate('FormScreen');
            }}
          />
          <SecondaryButton
            title={'Upload from gallery'}
            icon={
              <Ionicons name="image-outline" size={30} color="rgb(0,179,255)" />
            }
            onPress={() => {
              captureImage(false);
              setLastPressed('gallery');
              navigation.navigate('FormScreen');
            }}
          />
        </View>
        <ProgressStepBar currentStepIndex={3} stepSize={5} />
      </View>
    </BaseScreen>
  );
};
export default ScanPhotoScreen;
