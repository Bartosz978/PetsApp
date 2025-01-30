import React, { useState } from 'react';
import { Button, View, Text, Image, StyleSheet, TextInput, Dimensions ,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from './Menu';
import MapView, { Marker } from 'react-native-maps';
import { Menu, Provider } from 'react-native-paper';
import {LostPetScreen} from './Ogloszenia';
import AddAnnouncementScreen from './Add_photo';
import {Messege} from './Messege';

const Stack = createNativeStackNavigator();

const myLocation = { latitude: 37.78825, longitude: -122.4324 };

const styles = StyleSheet.create({
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
  bottomContainer: {
    height: Dimensions.get('window').height * 0.5, // Dolna połowa ekranu
    backgroundColor: '#fff', // Białe tło dla dolnej sekcji
    padding: 10,
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
    backgroundColor: '#4CAF50', // Zielony kolor
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Zapewnia, że pasek będzie na wierzchu
  },
  headerButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  announcementItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: '#555',
  },
});


// Pierwszy ekran
function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/1.png')} style={styles.image} />
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#999"
      />
      
      <Button
        title="Log in"
        onPress={() => navigation.navigate('SecondScreen')}
        color="#4CAF50" // green color for login button
      />
      
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignIn')}
        color="#FF5722" // orange color for sign up button
      />
    </View>
  );
}

// Drugi ekran
function SecondScreen({ navigation }) {
  const dogLocations = [
    { id: 1, latitude: 37.78825, longitude: -122.4324 },
    { id: 2, latitude: 37.78925, longitude: -122.4314 },
    { id: 3, latitude: 37.79025, longitude: -122.4304 },
  ];
  const [visible, setVisible] = useState(false);

  // Funkcja do obsługi rozwijania menu
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
// Funkcja obliczająca dystans (formuła Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Promień Ziemi w km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Dystans w kilometrach
};

// Lista ogłoszeń z obliczonym dystansem
const announcementsWithDistance = dogLocations.map((item) => ({
  ...item,
  distance: calculateDistance(
    myLocation.latitude,
    myLocation.longitude,
    item.latitude,
    item.longitude
  ),
}));

// Posortowanie ogłoszeń według dystansu
const sortedAnnouncements = announcementsWithDistance.sort(
  (a, b) => a.distance - b.distance
);
const handleDoubleClick = (announcement) => {
  Alert.alert('Szczegóły Ogłoszenia', `Ogłoszenie: Pies ${announcement.id}\nDystans: ${announcement.distance} km`);
};

// Funkcja do obsługi podwójnego kliknięcia
let clickTimeout = null;
const handlePress = (announcement) => {
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    handleDoubleClick(announcement);
  } else {
    clickTimeout = setTimeout(() => {
      clickTimeout = null;
    }, 300); // Ustawienie czasu na 300ms, aby wykrywać podwójne kliknięcie
  }
};
  return (
    <View style={{ flex: 1 }}>
      {/* Pasek menu */}
      <View style={styles.header}>
      <Menu
  visible={visible}
  onDismiss={closeMenu}
  anchor={
    <Button title="Opcje" onPress={openMenu} />
  }
>
  <Menu.Item onPress={() => navigation.navigate('Add')} title="Dodaj ogłoszenie" />
  <Menu.Item onPress={() => navigation.navigate('Message')} title="Wiadomośći" />
  <Menu.Item onPress={() => navigation.navigate('Add')} title="Ustawienia" />
</Menu>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {dogLocations.map((dog) => (
          <Marker
            key={dog.id}
            coordinate={{
              latitude: dog.latitude,
              longitude: dog.longitude,
            }}
            title={`Pies ${dog.id}`}
          >
            {/* Obrazek psa */}
            <Image
              source={require('./assets/2.png')} // Obraz psa
              style={styles.dogImage}
            />
          </Marker>
        ))}
      </MapView>
      </View>


      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Najbliższe ogłoszenia:
        </Text>
        <FlatList
          data={sortedAnnouncements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.announcementItem}>
              <Text style={styles.title}>Ogłoszenie {item.id}</Text>
              <Text style={styles.distance}>
                Dystans: {item.distance} km
              </Text>
              <Button title="Kliknij dwukrotnie, aby zobaczyć szczegóły" onPress={() => navigation.navigate('LostPet')} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Ekran Główny' }} />
          <Stack.Screen name="SignIn" component={SignUpScreen} options={{ title: 'Zarejestruj się' }} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ title: 'Drugi Ekran' }} />
          <Stack.Screen name='LostPet' component={LostPetScreen} options={{title: 'Informacje o zwierzaku'}}/>
          <Stack.Screen name='Add' component={AddAnnouncementScreen} options={{title: 'Dodaj ogłoszenie'}}/>
          <Stack.Screen name ='Message' component={Messege} options={{title: "Wiadomosci"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
