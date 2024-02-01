import { StyleSheet, Text, View } from 'react-native';
import Button from './components/button.jsx';
// import Text from './components/Text.jsx';
import ButtonIcon from './components/bottomIcon.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Let's start!</Text>
        <Text style={styles.bodyText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, 
            maiores quibusdam tempore saepe qui delectus assumenda rerum, perferendis 
            doloribus maxime eum facilis! Nostrum velit minus iure quibusdam repellat hic veritatis.
        </Text>

      <Button style={styles.buttonContainer}>This is the button</Button>
      <ButtonIcon></ButtonIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vukContainer:{
    backgroundColor:'red',
    borderColor:'white',
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  bold: {
    fontWeight: 'bold',
    color: 'lightblue',
    fontSize: 30,
  },
  bodyText: {
    marginHorizontal: 30, 
    paddingHorizontal: 30, 
    paddingBottom: 20,
  },
});


