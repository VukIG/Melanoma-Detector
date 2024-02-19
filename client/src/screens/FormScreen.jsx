import { View, Text, Image } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext, useState } from 'react';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scale, scaleVertical, scaleImage } from '../helpers/scale';
import PermissionsContext from '../context/PermissionsContext';
import ImageContext from '../context/ImageContext';
import Input from '../components/input/Input';
import Checkbox from '../components/input/Checkbox';

const FormScreen = ({ navigation }) => {
  const [age, setAge] = useState();
  const [gender, setGender] = useState({ male: false, female: false });
  const { lastPressed } = useContext(PermissionsContext);
  const { imgUri, captureImage, image } = useContext(ImageContext);
  const basicStyles = useGlobalStyle();

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
          <Text style={[basicStyles.FONTPRIMARY, basicStyles.FONT28]}>
            Enter your personal info:
          </Text>
        </View>
        <View>
          <Input
            value={age}
            type={'numeric'}
            placeholder={'Enter your age'}
            setState={setAge}
          />
          <Checkbox gender={gender} setGender={setGender} />
        </View>
      </View>
    </BaseScreen>
  );
};

export default FormScreen;
