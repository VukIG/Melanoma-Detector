import { StyleSheet } from 'react-native';
//use styles
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 80,
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
        marginTop: 10, // Adds space between the "Let's start!" and "Lorem ipsum" texts
        fontSize: 16, 
        textAlign: 'justify', 
      },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      },
  button: {
      flexDirection: 'row',
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
    buttonIcons: {
      marginRight: 5,
    },
    whiteButton: {
      backgroundColor: 'white',
      borderColor: 'blue',
      borderWidth: 1, // Adjust border width as needed
    },
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
    heading:{
        textAlign:'center',
        color:'teal',
        paddingBottom:'6',
        fontWeight:'800',
        fontSize:'4',
    },
    bodyText:{
        textAlign:'center',
        marginBottom:'10'
    }
  });

  export default styles;
