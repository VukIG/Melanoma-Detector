import { View, Text, Image } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
const DiagnosisScreen = () => {
  const { image, setImage, prediction, setPrediction } =
    useContext(PermissionsContext);

  return (
    <BaseScreen>
      <View>
        <Image uri={image} />
        <View>
          <Text>{response}</Text>
        </View>
        <View>
          <PrimaryButton
            title={'Re-take a picture'}
            icon={<Ionicons name="camera-outline" size={24} color="white" />}
            onPress={() => captureImage(true)}
          />
          <SecondaryButton
            title={'Re-upload an image'}
            icon={
              <Ionicons name="image-outline" size={24} color="rgb(0,179,255)" />
            }
            style={{ height: 30, width: 'auto' }}
            onPress={() => captureImage(false)}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default DiagnosisScreen;
