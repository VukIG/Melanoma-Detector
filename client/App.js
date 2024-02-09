import { StyleSheet, Text, View } from 'react-native';
import Button from './components/button.jsx';
// import Text from './components/Text.jsx';
import ButtonIcon from './components/bottomIcon.jsx';
import styles from './components/Styles.jsx';

export default function App() {
  return (
    <View style={styles.container1}>
      <Text style={styles.bold}>Let's start!</Text>
      
        <Text style={styles.bodyText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, 
            maiores quibusdam tempore 
        </Text>

      <Button style={styles.buttonContainer}></Button>
      <ButtonIcon></ButtonIcon>
    </View>
  );
};


