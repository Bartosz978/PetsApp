import {  StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b3d89c', // light green background
        padding: 20,
      },
      image: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
      },
      buttonBlock: {
        width: '100%'
      },
      buttonHolder: {
        padding: 10,
        marginTop: 20
      },
      logInButton: {
        textAlign: 'center',
        backgroundColor: 'green',
        color: 'white',
        fontSize: 20,
      },
      signInButton: {
        textAlign: 'center',
        backgroundColor: 'red',
        color: 'white',
        fontSize: 15
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
      }
    }
    );