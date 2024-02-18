import { View, Text, Image, Input } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import ImageContext from '../context/ImageContext';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { InputNumber } from '../components/input/InputNumber';
import { InputCheckbox } from '../components/input/InputCheckbox' ;
import { scale, scaleVertical,scaleImage } from '../helpers/scale';


const FormScreen = ({ navigation }) => {
  const { lastPressed } =
    useContext(PermissionsContext);
  const { imgUri } = useContext(ImageContext);
    const basicStyles = useGlobalStyle();

    const { width: scaledWidth, height: scaledHeight } = scaleImage(100, 100, 340);

    return (
      <BaseScreen>
        <View style={{margin:4}}>
          <Image style={[ basicStyles.CENTER_COL, {
            width:scaledWidth,
            height:scaledHeight, 
            backgroundColor:"black",
            marginTop: 20,
            marginBottom:20,
          
          }]} source={{ uri: imgUri}} />
          <View>
            <Text style={[
              basicStyles.FONTPRIMARY, basicStyles.FONT28
            ]}>Enter your personal info:</Text>
          </View>
          <View>
            <InputCheckbox>
            </InputCheckbox>
          </View>
          
          
        </View>
      </BaseScreen>
    );
};

export default FormScreen;