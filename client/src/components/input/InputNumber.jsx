import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/color';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import {  scaleVertical } from '../../helpers/scale';

// Custom InputNumber component
const InputNumber = ({ placeholder }) => {
  const basicStyles = useGlobalStyle();

  return (
    <View style={{ marginBottom: scaleVertical(10) }}>
      <TextInput
        placeholder={placeholder}
        style={[
          basicStyles.CENTER_COL,
          {
            backgroundColor: 'transparent',
            borderBottomColor: basicStyles.primaryColor,
            borderBottomWidth: 1,
            borderRadius: 0, // Remove default border radius
          },
        ]}
      />
    </View>
  );
};

export default InputNumber

InputNumber.propTypes = {
  placeholder: PropTypes.string,
};

