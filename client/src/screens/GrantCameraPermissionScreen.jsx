import { View, Text } from 'react-native';
import { BaseScreen } from '../components/common/BaseScreen';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { ProgressStepBar } from '../components/ProgressStepBar';
import { scaleVertical } from '../helpers/scale';
import { AllowCamera } from '../constants/svg';
import PermissionsContext from '../context/PermissionsContext';
import { useContext } from 'react';

const GrantCameraPermissionScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  const { grantPermission } = useContext(PermissionsContext);

  return (
    <BaseScreen>
      <View
        style={[
          basicStyles.CENTER_COL,
          { flex: 1, paddingVertical: scaleVertical(30) },
        ]}
      >
        <View
          style={{
            width: '100%',
            height: '70%',
            transform: [{ translateX: 35 }, { translateY: 90 }],
          }}
        >
          <AllowCamera width={'100%'} height={'60%'} />
        </View>
        <Text
          style={[
            basicStyles.FONTPRIMARY,
            { fontSize: 40, textAlign: 'center', marginTop: -120 },
          ]}
        >
          Allow your camera
        </Text>
        <View style={[basicStyles.CENTER_COL, { width: '90%', flex: 1 }]}>
          <Text style={[basicStyles.FONT16, { marginBottom: 20 }]}>
            We need an image of your mole. Please grant us the permission to
            access your camera in order to take the image.
          </Text>
          <View style={{ width: '100%' }}>
            <PrimaryButton
              title={'Enable Camera'}
              onPress={() => {
                grantPermission(true);
                navigation.navigate('GrantGalleryPermissionScreen');
              }}
            />
            <SecondaryButton
              title={'Not now'}
              onPress={() => navigation.navigate('GrantGalleryPermissionScreen')}
            />
          </View>
        </View>
        <ProgressStepBar currentStepIndex={1} />
      </View>
    </BaseScreen>
  );
};

export default GrantCameraPermissionScreen;
