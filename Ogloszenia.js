import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

export const LostPetScreen = ({ navigation }) => {
  // Przykładowe dane o zaginionym zwierzaku
  const petData = {
    name: 'Rex',
    dateLost: '2023-12-25',
    species: 'Pies',
    color: 'Brązowy',
    distinctiveFeatures: 'Biała łata na prawej łapie, czarna obroża z niebieską plakietką',
    lastSeenLocation: 'Park Centralny, Warszawa',
    contact: '555-123-456',
    owner: {
      name: 'Jan Kowalski',
      phone: '555-654-321',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sekcja zdjęcia */}
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/2.png')} // Podmień na własne zdjęcie w folderze assets
          style={styles.image}
        />
      </View>

      {/* Sekcja informacji */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Imię: </Text>
          {petData.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Data zaginięcia: </Text>
          {petData.dateLost}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Gatunek: </Text>
          {petData.species}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Kolor: </Text>
          {petData.color}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Cechy charakterystyczne: </Text>
          {petData.distinctiveFeatures}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Ostatnia lokalizacja: </Text>
          {petData.lastSeenLocation}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Kontakt: </Text>
          {petData.contact}
        </Text>
      </View>

      {/* Przyciski */}
      <View style={styles.buttonContainer}>
        <Button
          title="Profil nadawcy"
          onPress={() => {
           // navigation.navigate('OwnerProfile', { owner: petData.owner }); // Nawigacja do profilu nadawcy
          }}
          color="#4CAF50" // Zielony przycisk
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

  
