import { View, Text, Image, Input } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
const DiagnosisScreen = ({ navigation }) => {
  const { image, setImage, lastPressed } =
    useContext(PermissionsContext);
    const basicStyles = useGlobalStyle();
  return (
    <BaseScreen>
      <View>
        <Image uri={image} />
        <View>
          <Text style={[
            basicStyles.FONTPRIMARY, basicStyles.FONT32
          ]}>Enter your personal info:</Text>
        </View>
        <View>
            <Input:number placeholder="">
            
            </Input:number>

            <Input:checkbox>
            
            </Input:checkbox>

            <Input:checkbox>
            
            </Input:checkbox>
        </View>
        <View>
          { lastPressed? <PrimaryButton
            title={'Re-take a picture'}
            icon={<Ionicons name="camera-outline" size={24} color="white" />}
            onPress={() => captureImage(true)}
            //make sure to cover ther SRBIJA case if the user didn't grant perm
          />
          :
          <SecondaryButton
            title={'Re-upload an image'}
            icon={
              <Ionicons name="image-outline" size={24} color="rgb(0,179,255)" />
            }
            style={{ height: 30, width: 'auto' }}
            onPress={() => captureImage(false)}
          />}
          <PrimaryButton 
            title={'Send'}
            onPress={()=> navigation.navigate("DiagnosisScreen")}
          />
            
          
        </View>
      </View>
    </BaseScreen>
  );
};

export default DiagnosisScreen;
