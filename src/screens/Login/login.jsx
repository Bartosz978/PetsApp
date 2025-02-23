import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, Touchable, TouchableOpacity } from 'react-native';
import { storeCredentials, getStoredCredentials } from '../../Utlils/authUtils';
import { styles } from './style';
import { loadStatus } from '../../Utlils/Load';

export function MenuScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async () => {
    loadStatus();
    try {
      const response = await fetch('http://10.0.2.2:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {


        // Store credentials securely
        const stored = await storeCredentials(credentials.username, credentials.password);
        if (!stored) {
          throw new Error('Failed to store credentials');
        }
        // Navigate to main app
        navigation.replace('Bottom');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }

  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../assets/1.png')}/>

      {/* <Text style={styles.title}>Login</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) => setCredentials(prev => ({ ...prev, username: text }))}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.buttonBlock}>

        <TouchableOpacity style={[styles.buttonHolder, styles.logInButton]} onPress={handleLogin}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonHolder, styles.signInButton]} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}> Create Account </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}