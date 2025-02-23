import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // Dodajemy expo-location
import { giveNewogloszenie } from '../../Utlils/Load'; // import funkcji do dodawania ogłoszenia
import {styles} from './style'; 

export  function AddAnnouncementScreen() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [otherFeatures, setOtherFeatures] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Nowy stan na lokalizację użytkownika

  // Funkcja do obsługi wyboru zdjęcia
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Brak dostępu', 'Potrzebujesz zgody na dostęp do galerii.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Funkcja do uzyskania lokalizacji użytkownika
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak dostępu', 'Potrzebujesz zgody na dostęp do lokalizacji.');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setUserLocation(locationData.coords); // Ustawiamy lokalizację w stanie
    setLocation(`${locationData.coords.latitude}, ${locationData.coords.longitude}`); // Opcjonalnie, zapisujemy w stanie `location` jako tekst
  };

  // Funkcja do wywołania przycisku, np. dodawanie ogłoszenia
  const giveOgloszenie = async () => {
    if (!name || !breed || !color || !location || !dateLost || !otherFeatures || !userLocation) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione, w tym lokalizacja.');
      return;
    }

    // Tworzenie obiektu ogłoszenia
    const newAnnouncement = {
      ownerId: "3", // Przykładowy właściciel
      name, // Imię zwierzęcia
      dateLost, // Data zaginięcia
      species: breed, // Rasa
      color, // Kolor
      distinctiveFeatures: otherFeatures, // Inne cechy
      lastSeenLocation: location, // Lokalizacja (w tym przypadku, GPS)
      contact: "555-345-678", // Kontakt
      latitude: userLocation.latitude, // Współrzędna szerokości geograficznej
      longitude: userLocation.longitude, // Współrzędna długości geograficznej
    };

    // Wywołanie funkcji z Load.js do dodania ogłoszenia
    const response = await giveNewogloszenie(newAnnouncement);
    if (response) {
      Alert.alert('Sukces', 'Ogłoszenie zostało dodane!');
    } else {
      Alert.alert('Błąd', 'Nie udało się dodać ogłoszenia.');
    }
  };

  // Używamy useEffect, aby uzyskać lokalizację po załadowaniu komponentu
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj Ogłoszenie</Text>

      {/* Pola tekstowe */}
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Rasa"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Kolor"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Lokalizacja"
        value={location}
        editable={false} // Zablokuj możliwość edycji, użytkownik nie musi podawać ręcznie
      />
      <TextInput
        style={styles.input}
        placeholder="Data Zaginięcia (DD-MM-RRRR)"
        value={dateLost}
        onChangeText={setDateLost}
      />
      <TextInput
        style={styles.input}
        placeholder="Inne cechy"
        value={otherFeatures}
        onChangeText={setOtherFeatures}
      />

      <Text style={styles.imagePickerText}>Dodaj zdjęcie</Text>

      {/* Przycisk "Dodaj" */}
      <TouchableOpacity style={styles.addButton} onPress={giveOgloszenie}>
        <Text style={styles.addButtonText}>Dodaj</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Image
            source={require('../../../assets/3.jpg')}
            style={styles.imageIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}


