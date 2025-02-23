// authUtils.js

import * as SecureStore from 'expo-secure-store';

const LOGIN_KEY = 'user_credentials';
const SERVER_URL = 'http://10.0.2.2:3000';

// Store user credentials securely
export const storeCredentials = async (username, password) => {
  try {
    await SecureStore.setItemAsync(LOGIN_KEY, JSON.stringify({ username, password }));
    return true;
  } catch (error) {
    console.error('Error storing credentials:', error);
    return false;
  }
};

// Get stored credentials
export const getStoredCredentials = async () => {
  try {
    const credentials = await SecureStore.getItemAsync(LOGIN_KEY);
    return credentials ? JSON.parse(credentials) : null;
  } catch (error) {
    console.error('Error getting stored credentials:', error);
    return null;
  }
};

// Clear stored credentials (logout)
export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync(LOGIN_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing credentials:', error);
    return false;
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.success) {
      await storeCredentials(userData.username, userData.password);
    }
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (data.success) {
      await storeCredentials(credentials.username, credentials.password);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
