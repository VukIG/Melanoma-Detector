import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/Styles'; 

const BottomIcon = () => {
  return (
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.buttonBottom}>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomIcon;
