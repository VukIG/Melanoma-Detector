import { View, Text, Image } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext, useState } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import ImageContext from '../context/ImageContext';
import FormContext from '../context/FormContext';

import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scale, scaleVertical, scaleImage } from '../helpers/scale';

import PermissionsContext from '../context/PermissionsContext';
import ImageContext from '../context/ImageContext';
import Input from '../components/input/Input';
import Checkbox from '../components/input/Checkbox';
import Slider from '../components/input/Slider';
import Input from '../components/input/Input';

const FormScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();
  const [gender, setGender] = useState({ male: false, female: false });
  const { lastPressed, setLastPressed } = useContext(PermissionsContext);
  const { imgUri, captureImage, image } = useContext(ImageContext);
  const { age, setAge, gender, setGender, location, setLocation, sendData } =
    useContext(FormContext);
  console.log(lastPressed);
  const { width: scaledWidth, height: scaledHeight } = scaleImage(
    100,
    100,
    340,
  );

  // console.log('image uri****: ', imgUri);
  // console.log('base64****: ', image);

  return (
    <BaseScreen>
      <View style={{ margin: 4 }}>
        <Image
          style={[
            basicStyles.CENTER_COL,
            {
              width: scaledWidth,
              height: scaledHeight,
              backgroundColor: 'black',
              marginTop: 20,
              marginBottom: 20,
            },
          ]}
          source={{ uri: imgUri }}
        />
        <View>
          <Text
            style={[
              basicStyles.FONTPRIMARY,
              basicStyles.FONT28,
              { marginBottom: 20 },
            ]}
          >
            Enter your personal info:
          </Text>
          <View style={{ display: 'flex', gap: 12 }}>
            <Input
              value={age}
              type={'numeric'}
              placeholder={'Enter your age'}
              setState={setAge}
            />
            <Checkbox gender={gender} setGender={setGender} />
            <Slider items={location} setItems={setLocation} />
            <PrimaryButton
              title={'Send'}
              onPress={() => {
                sendData();
                navigation.navigate('DiagnosisScreen');
              }}
            />
          </View>
        </View>
        <View style={{ width: '100%' }}></View>
        <View style={{ marginTop: 10, width: '100%' }}>
          <Text style={[basicStyles.FONTPRIMARY, basicStyles.FONT20]}>
            *Personal information helps our model give more accurate
            predictions. Your personal information is NOT being stored.
          </Text>
        </View>
      </View>
    </BaseScreen>
  );
};

export default FormScreen;
