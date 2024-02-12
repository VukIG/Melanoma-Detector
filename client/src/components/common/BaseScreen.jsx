import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { Image } from 'expo-image';
import PropTypes from 'prop-types';

import { scale, scaleVertical } from '@helpers/scale';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { colors } from '../../constants/color';

export const BaseScreen = ({
  contentStyle,
  backgroundImage,
  backgroundColor,
  children,
  hasBottomTab = false,
  fill = false,
  paddingHorizontal = 32,
}) => {
  const basicStyles = useGlobalStyle();

  const BaseComponent = fill ? View : SafeAreaView;
  return (
    <BaseComponent
      style={[
        basicStyles.CENTER_COL_START,
        styles.container,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.white,
        },
      ]}
    >
      {backgroundImage && (
        <Image
          source={backgroundImage}
          contentFit="cover"
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View
        style={[
          styles.contentStyle,
          contentStyle,
          { paddingHorizontal: scale(paddingHorizontal) },
          hasBottomTab && {
            paddingBottom: !fill
              ? Platform.OS === 'android'
                ? scaleVertical(82)
                : scaleVertical(102)
              : scale(0),
          },
        ]}
      >
        {children}
      </View>
      <StatusBar />
    </BaseComponent>
  );
};

BaseScreen.propTypes = {
  children: PropTypes.node,
  contentStyle: PropTypes.object,
  backgroundImage: PropTypes.object,
  backgroundColor: PropTypes.string,
  hasBottomTab: PropTypes.bool,
  fill: PropTypes.bool,
  paddingHorizontal: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    flex: 1,
    width: '100%',
  },
  danger: {
    paddingHorizontal: scale(24),
    paddingVertical: scaleVertical(4),
  },
});
