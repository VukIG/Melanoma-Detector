import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { colors } from '../../constants/color';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { scale, scaleVertical } from '../../helpers/scale';
import PropTypes from "prop-types";

export const SecondaryButton = ({ title,style, onPress }) => {
  const basicStyles = useGlobalStyle();

  return (
    <MaskedView
      style={{ width: '100%' }}
      maskElement={
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ backgroundColor: 'white', borderRadius: scale(16) }}>
                    <Text style={[basicStyles.FONT20, { textAlign: 'center', padding: scale(12) }]}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
      }>

        <LinearGradient
            style={[
              basicStyles.CENTER_COL,
              {
                width: '100%',
                paddingHorizontal: scale(12),
                paddingVertical: scaleVertical(12),
                borderRadius: scale(16),
              },
            ]}
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.2, 1]}
        >
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ backgroundColor: 'white', borderRadius: scale(16) }}>
                    <Text style={[basicStyles.FONT20, { opacity:0 ,textAlign: 'center', padding: scale(12) }]}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        </LinearGradient>
    </MaskedView>
  );
};

SecondaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func,
};