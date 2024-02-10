import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/color';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { scale, scaleVertical } from '../../helpers/scale';
import PropTypes from 'prop-types';

export const SecondaryButton = ({ title, icon, style, onPress }) => {
  const basicStyles = useGlobalStyle();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          textAlign: 'center',
          paddingHorizontal: scale(12),
          paddingVertical: scaleVertical(10),
          paddingHorizontal: scaleVertical(93),
          borderRadius: scale(16),
          borderWidth: 1.3,
          borderRadius: scale(16),
          borderColor: colors.primary,
        },
      ]}
    >
      <View style={[{ width: '100%' }, style]}>
        <Text style={[basicStyles.FONT20, basicStyles.FONTPRIMARY]}>
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func,
  icon: PropTypes.element,
};
