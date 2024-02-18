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
          paddingVertical: scaleVertical(14),
          paddingHorizontal: scaleVertical(93),
          borderRadius: scale(16),
          borderWidth: 1.3,
          borderRadius: scale(16),
          borderColor: colors.primary,
        },
      ]}
    >
      <View style={[style,{ flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
        <Text style={[basicStyles.FONT20, basicStyles.FONTPRIMARY, { width:"100%"}]}>
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
