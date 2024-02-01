import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomIcon = () => {
  return (
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.buttonBottom}>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonBottom: {
    padding: 1, // Increase padding for a larger button
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, 
    height: 50,
  },
});

export default BottomIcon;
