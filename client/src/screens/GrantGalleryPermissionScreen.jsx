import { View, Text, Stylesheet } from 'react-native';
import { useState, useContext } from 'react';
import PermissionsContext from '../context/PermissionsContext';
import { AllowGallery } from '../constants/svg';
import { useGlobalStyle } from '../hooks/useGlobalStyle';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import * as ImagePicker from 'expo-image-picker';
import { scaleVertical } from '../helpers/scale';
import { BaseScreen } from '../components/common/BaseScreen';
import { ProgressStepBar } from '../components/ProgressStepBar';

const GrantGalleryPermissionScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();
  const { galleryPermission, setGalleryPermission } =
    useContext(PermissionsContext);

  const grantGalleryPermission = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status == 'granted') {
      setGalleryPermission(true);
      console.log('CHIPICHIPI DABA DUBI DUBI DABA');
      //Navigate to the next screen using the navigation.navigate
      navigation.navigate('ScanPhotoScreen');
    } else {
      setGalleryPermission(false);
    }
  };
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
            transform: [{ translateX: 35 }, { translateY: 80 }],
          }}
        >
          <AllowGallery width={'100%'} height={'60%'} />
        </View>
        <Text
          style={[
            basicStyles.FONTPRIMARY,
            { fontSize: 40, textAlign: 'center', marginTop: -130 },
          ]}
        >
          Grant gallery access
        </Text>
        <View
          style={[basicStyles.CENTER_COL, { width: '70%', flex: 1, gap: 20 }]}
        >
          <Text style={[basicStyles.FONT16]}>
            We need an image of your mole. Please grant us the permission to
            access your gallery in order to get the image.
          </Text>
          <View style={{ width: '100%' }}>
            <PrimaryButton
              title={'Grant Access'}
              onPress={grantGalleryPermission}
            />
            <SecondaryButton
              title={'Not now'}
              onPress={() => navigation.navigate('ScanPhotoScreen')}
            />
          </View>
        </View>
        <ProgressStepBar stepSize={4} currentStepIndex={1} />
      </View>
    </BaseScreen>
  );
};

export default GrantGalleryPermissionScreen;
