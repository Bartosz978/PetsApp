import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import {dateLost} from '../../Utlils/Load';
import {styles} from "./style";

//import { OgloszeniaCale } from './DaneGlobalne';


export const LostPetScreen = ({ navigation ,route}) => {
  // Przykładowe dane o zaginionym zwierzaku

  //const petData = OgloszeniaCale;
  const{ item} = route.params;


  return (
    <ScrollView style={styles.container}>
      {/* Sekcja zdjęcia */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/2.png')} // Podmień na własne zdjęcie w folderze assets
          style={styles.image}
        />
      </View>

      {/* Sekcja informacji */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Imię: </Text>
          {item.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Data zaginięcia: </Text>
          {item.dateLost}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Gatunek: </Text>
          {item.species}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Kolor: </Text>
          {item.color}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Cechy charakterystyczne: </Text>
          {item.distinctiveFeatures}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Ostatnia lokalizacja: </Text>
          {item.lastSeenLocation}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Kontakt: </Text>
          {item.contact}
        </Text>
      </View>

      {/* Przyciski */}
      <View style={styles.buttonContainer}>
        <Button
          title="Profil nadawcy"
          onPress={() => {
            navigation.navigate('Sender', {id: item.id}); // Nawigacja do profilu nadawcy
          }}
          color="#4CAF50" // Zielony przycisk
        />
      </View>
    </ScrollView>
  );
};



  
