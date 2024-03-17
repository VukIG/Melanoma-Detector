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
import { scaleImage } from '../helpers/scale';

import Input from '../components/input/Input';
import Checkbox from '../components/input/Checkbox';
import Slider from '../components/input/Slider';

const FormScreen = ({ navigation }) => {

  const basicStyles = useGlobalStyle();
  const { lastPressed, setLastPressed } = useContext(PermissionsContext);
  const { imgUri, image } = useContext(ImageContext);
  const { age, setAge, gender, setGender, location, setLocation, 
  sendData, locVal, setLocVal } =
    useContext(FormContext);

  console.log(lastPressed);

  const { width: scaledWidth, height: scaledHeight } = scaleImage(
    100,
    100,
    340,
  );

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
              type={'number-pad'}
              placeholder={'Enter your age'}
              setState={setAge}
            />
            <Checkbox />
            <Slider 
              items={location} 
              setItems={setLocation} 
              locVal={locVal} 
              setLocVal={setLocVal} 
            />
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