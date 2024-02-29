import { View, Text, Image } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import { Ionicons } from '@expo/vector-icons';
import ImageContext from '../context/ImageContext';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { scale, scaleImage } from '../helpers/scale';
import Footer from '../components/Footer';

const DiagnosisScreen = () => {
  const { imgUri } = useContext(ImageContext);
  const basicStyles = useGlobalStyle();

  const { width: scaledWidth, height: scaledHeight } = scaleImage(
    100,
    100,
    340,
  );

  return (
    <BaseScreen>
      <View>
        <View style={[basicStyles.CENTER_COL_BETWEEN, { gap: scale(20) }]}>
          <Image
            style={[
              basicStyles.CENTER_COL_BETWEEN,
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
          <Text style={[basicStyles.FONT32, { margin: 10 }]}>
            Your naveus is 'insert text here based on probability' cancerous
          </Text>
          <Text style={[basicStyles.FONT20, basicStyles.FONTPRIMARY]}>
            Disclaimer: This model makes mistakes and is NOT* a replacement for
            a doctor, if you have serious doubts make sure to contact your
            dermatologist.
          </Text>
        </View>
      </View>
      <Footer />
    </BaseScreen>
  );
};

export default DiagnosisScreen;
