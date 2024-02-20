import { View, Text, Image } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
const DiagnosisScreen = () => {

  return (
    <BaseScreen>
      <View>
        <View>
          <Text>legendo .</Text>
        </View>
        
      </View>
    </BaseScreen>
  );
};

export default DiagnosisScreen;
