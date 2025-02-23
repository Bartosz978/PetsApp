// UserProfile.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { loadUser } from '../../Utlils/Load';  // Importujemy funkcję LoadUser
import { useRoute } from '@react-navigation/native';
import { Users,OgloszeniaCale } from '../../Utlils/DaneGlobalne';  // Importujemy globalny obiekt Users
import {styles} from './style';

export function UserProfile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    // Stan dla danych użytkownika
    const [user, setUser] = useState(null);

    // Hook do pobierania danych użytkownika
    useEffect(() => {
        const fetchData = async () => {
            const userData = await loadUser(id);  // Asynchroniczne pobieranie danych
            setUser(userData);  // Ustawiamy dane użytkownika w stanie
        };

        fetchData(); // Uruchamiamy funkcję pobierającą dane
    }, [id]); // Funkcja uruchomi się tylko wtedy, gdy `id` się zmieni

    if (!user) {
        return <Text>Ładowanie...</Text>;  // Wyświetlanie tekstu ładowania, dopóki dane nie są dostępne
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>📍 {user.address}</Text>
                    <Text style={styles.text}>📞 {user.phone}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Zaginione zwierzęta:</Text>
            <FlatList
                data={help(id)}  // Wyświetlanie listy zaginionych zwierząt
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.petItem}>
                        <Text style={styles.petName}>{item.name} ({item.species})</Text>
                        <Text style={styles.text}>Ostatnio widziany: {item.lastSeenLocation}</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.messageButton}
                onPress={() => {
                    
                    navigation.navigate("Message")
                }}
            >
                <FontAwesome name="envelope" size={24} color="white" />
                <Text style={styles.messageButtonText}>Napisz wiadomość</Text>
            </TouchableOpacity>
        </View>
    );
}

function help(userId) {
    console.log(userId);
    if (!userId) {
        console.warn("Brak ID użytkownika w funkcji help");
        return []; // Zwracamy pustą tablicę, aby uniknąć błędu
    }

    return OgloszeniaCale.filter(o => o.ownerId === userId); // Zakładam, że ogłoszenia mają właściwość `userId`
}



