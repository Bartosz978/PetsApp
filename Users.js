import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

let Users = new Map();

// Funkcja pobierająca użytkownika po ID
function getUser(id) {
    return Users.get(id) || null;
}

function AddUser(){
    
}