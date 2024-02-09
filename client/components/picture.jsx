import React from 'react';
import { View, Image } from 'react-native';

// Assuming you have imported necessary modules for accessing images in React Native

export default function App() {
  // Load the background image
  const background_image = require('./background.jpg');

  // Load the foreground image
  const foreground_image = require('./doctor_image.png');

  // Assuming you have determined the appropriate dimensions for the images

  return (
    <View style={{ flex: 1 }}>
      {/* Render background image */}
      <Image
        source={background_image}
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
      />

      {/* Render foreground image */}
      <Image
        source={foreground_image}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </View>
  );
}

