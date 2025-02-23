
import {  StyleSheet } from 'react-native';  


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e0f7fa', // Jasnoniebieskie tło
      padding: 20,
    },
    image: {
      width: '80%',
      height: 200,
      resizeMode: 'contain', // Zachowuje proporcje obrazu
      borderRadius: 10,
    },
    infoContainer: {
      flex: 1,
      backgroundColor: '#ffffff', // Białe tło
      padding: 20,
    },
    infoText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      color: '#000',
    },
    buttonContainer: {
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
    },
  });