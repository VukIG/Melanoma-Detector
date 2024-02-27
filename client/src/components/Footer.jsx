import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.flexContainer}>
        <Text style={styles.textStyle}>Made by the MDA team</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/in/vuk-ignjatovic-53152a248/',
            )
          }
        >
          <AntDesign name="linkedin-square" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#4a90e2',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '120%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    marginRight: 10,
  },
});

export default Footer;
