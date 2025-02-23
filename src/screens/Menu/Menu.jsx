/*

kod do usuniencia 
*/


const myLocation = { latitude: 37.78525, longitude: -122.4304 };

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  Image, 
  FlatList, 
  Alert,
  StyleSheet 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {calculateDistance} from './Calculate';
import {styles} from './style';
import {OgloszeniaCale} from '../../Utlils/DaneGlobalne';

export function MenuScreenMain({ navigation }) {
    const [dogLocations, setDogLocations] = useState([]);
  
    useEffect(() => {
      if (OgloszeniaCale) {
        setDogLocations(OgloszeniaCale); // Zaktualizuj dane ogłoszeń
      }
    }, [OgloszeniaCale]);
  
    const announcementsWithDistance = dogLocations.map((item) => ({
      ...item,
      distance: calculateDistance(
        myLocation.latitude,
        myLocation.longitude,
        item.latitude,
        item.longitude
      ),
    }));
  
    const sortedAnnouncements = announcementsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );
  
    return (
      <View style={{ flex: 1 }}>
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
              <Marker key={dog.id} coordinate={dog} title={dog.name}>
                <Image source={require('../../../assets/2.png')} style={styles.dogImage} />
              </Marker>
            ))}
            <Marker
              key={-1}
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              title={'Twoja lokalizacja'}
            />
          </MapView>
        </View>
  
        <View style={styles.bottomContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Najbliższe ogłoszenia:
          </Text>
          <FlatList
            data={sortedAnnouncements}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>Brak ogłoszeń w pobliżu</Text>}
            renderItem={({ item }) => (
              <View style={styles.announcementItem}>
                <View style={styles.announcementLabel}>
                  <Text style={styles.title}>{item.title} - {item.name}</Text>
                  <Text style={styles.distance}>Dystans: {item.distance} km</Text>
                </View>
                <Button
                  title="Szczegóły"
                  onPress={() => {
                    if (item) {
                      console.log(item);
                      navigation.navigate('LostPet', {item : item});
                    } else {
                      Alert.alert('Błąd', 'Brak dostępnych danych o psie.');
                    }
                  }}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }