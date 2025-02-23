import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { storeCredentials, getStoredCredentials } from '../../Utlils/authUtils';
import { styles } from './style';
import { LoadStaus } from '../../Utlils/Load';

export function MenuScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async () => {
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
    LoadStaus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />
      
      <Button 
        title="Create Account" 
        onPress={() => navigation.navigate('SignIn')} 
      />
    </View>
  );
}