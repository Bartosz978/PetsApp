// Settings.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { getStoredCredentials } from '../../Utlils/authUtils';
import { styles } from './style';

export function Settings({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    password: '',
    address: '',
    phone: '',
    avatar: null,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const credentials = await getStoredCredentials();
      if (!credentials) {
        Alert.alert('Error', 'Unable to load user data');
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/users/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials.username}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const credentials = await getStoredCredentials();
      
      const response = await fetch('http://10.0.2.2:3000/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials.username}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userData.name}
        onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userData.username}
        onChangeText={(text) => setUserData(prev => ({ ...prev, username: text }))}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => setUserData(prev => ({ ...prev, password: text }))}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userData.address}
        onChangeText={(text) => setUserData(prev => ({ ...prev, address: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={userData.phone}
        onChangeText={(text) => setUserData(prev => ({ ...prev, phone: text }))}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleUpdateProfile} />
        <Button title="Cancel" onPress={() => navigation.goBack()} color="#FF0000" />
      </View>
    </View>
  );
}