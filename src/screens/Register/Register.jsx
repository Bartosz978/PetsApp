// Register.jsx - Updated version
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStoredCredentials } from '../../Utlils/authUtils';
import { styles } from './style';

export function SignUpScreen({ navigation }) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    avatar: null
  });

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to allow access to your photo library.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      handleInputChange('avatar', pickerResult.uri);
    }
  };

  const handleSignUp = async () => {
    if (!userData.username || !userData.password || !userData.name) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/users/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userData.username}
        onChangeText={(text) => handleInputChange('username', text)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={userData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        keyboardType="phone-pad"
      />

      <Button title="Select Profile Picture" onPress={pickImage} />

      {userData.avatar && (
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
      )}

      <Button title="Register" onPress={handleSignUp} />
      
      <Button 
        title="Already have an account? Login" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
}