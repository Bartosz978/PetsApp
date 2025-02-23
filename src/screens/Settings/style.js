import {  StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      marginTop: 20,
      gap: 10,
    },
  });