// Style
import {  StyleSheet } from 'react-native';  

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    input: {
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    imagePicker: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      width: 150,
      alignSelf: 'center',
      borderRadius: 75,
      borderWidth: 2,
      borderColor: '#ddd',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    imageIcon: {
      width: 100,
      height: 100,
      tintColor: '#aaa',
    },
    selectedImage: {
      width: '100%',
      height: '100%',
    },
    imagePickerText: {
      marginTop: 10,
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
    },
    addButton: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
  });