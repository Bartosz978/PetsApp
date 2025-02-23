import {  StyleSheet,Dimensions } from 'react-native';  


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
      width: '100%',
      marginTop: 20,
    },
    bigButton: {
      margin: 10,
    },
    bottomContainer: {
      height: Dimensions.get('window').height * 0.5, // Dolna połowa ekranu
      backgroundColor: '#fff', // Białe tło dla dolnej sekcji
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    mapContainer: {
      height: Dimensions.get('window').height * 0.5, // Górna połowa ekranu
      width: '100%',
    },
    map: {
      width: '100%', // Szerokość mapy wypełnia ekran
      height: '100%', // Wysokość mapy wypełnia górną połowę ekranu
    },
    dogImage: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 70,
      backgroundColor: '#b3d89c', // Zielony kolor
      justifyContent: 'space-evenly',
      alignItems: 'center',
      zIndex: 1, // Zapewnia, że pasek będzie na wierzchu
      flexDirection: 'row',
    },
    announcementItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
    },
    announcementLabel: {
      flexDirection: 'column',
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    distance: {
      fontSize: 14,
      color: '#555',
    },
  });