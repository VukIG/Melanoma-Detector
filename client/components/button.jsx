import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const App = () => {
  const onPressHandler = () => {
    console.log('Button Pressed');
  };

  const onSecondButtonPress = () => {
    console.log('Second button pressed!');
  };

  return (
    <View style={styles.container}>

    {/* <Container style={styles.container}> */}
    <TouchableOpacity style={styles.button} onPress={onPressHandler}>
      <Text style={styles.buttonTextWhite}>Take a picture</Text>
      <Feather name="camera" size={24} color="white" />
    </TouchableOpacity>

    <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={onSecondButtonPress}>
        <Text style={styles.buttonTextBlue}>Open Gallery</Text>
        <AntDesign name="picture" size={24} color="black" />
    </TouchableOpacity>
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    },
button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonTextWhite: {
    color: 'white',
    textAlign: 'center',
    marginRight: 10,
  },
  buttonTextBlue: {
    color: 'blue',
    textAlign: 'center',
    marginRight: 10,
  },
  whiteButton: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1, // Adjust border width as needed
  },
});

export default App;
