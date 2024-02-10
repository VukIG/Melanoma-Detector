import { View, Text } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scale, scaleVertical } from '../helpers/scale';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { ProgressStepBar } from '../components/ProgressStepBar';
import { WelcomeSvg } from '../constants/svg';
import { Ionicons } from '@expo/vector-icons';

const ScanPhotoScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  return (
    <BaseScreen>
      <View style={[basicStyles.CENTER_COL_BETWEEN]}>
        <WelcomeSvg width={'100%'} height={'60%'} />
        <View
          style={[
            basicStyles.CENTER_COL,
            {
              flex: 1,
              width: '100%',
              gap: scaleVertical(8),
            },
          ]}
        >
          <Text style={[basicStyles.FONT32, basicStyles.FONTPRIMARY]}>
            Let's start
          </Text>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Architecto, distinctio similique.
          </Text>
        </View>
        <View style={[basicStyles.CENTER_ROW, { width: '50%', height: '30%', rowGap:'10' }]}>
          <PrimaryButton 
          title={'Take a picture'} 
          icon={<Ionicons name="image-outline" size={24} color="white" />}
          />
          <SecondaryButton 
          title={'Upload from gallery'} 
          icon={<Ionicons name="camera-outline" size={24} color="white" />}
          style={{ height: 30, width: 'auto' }}
          />
        </View>
        <ProgressStepBar currentStepIndex={3} />
      </View>
    </BaseScreen>
  );
};
export default ScanPhotoScreen;
