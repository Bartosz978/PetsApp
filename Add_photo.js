import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
//import * as ImagePicker from 'expo-image-picker';

export default function AddAnnouncementScreen() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [otherFeatures, setOtherFeatures] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Funkcja obsługująca dodawanie ogłoszenia
  const handleAdd = () => {
    if (!name || !breed || !color || !location || !dateLost || !otherFeatures) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione.');
      return;
    }

    Alert.alert('Sukces', 'Ogłoszenie zostało dodane!');
  };

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
        onChangeText={setLocation}
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
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Dodaj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
{selectedImage ? (
  <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
) : (
  <Image
    source={require('./assets/3.jpg')}
    style={styles.imageIcon}
  />
)}

</TouchableOpacity>
    </View>
  )
};


// Style
const styles = StyleSheet.create({
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