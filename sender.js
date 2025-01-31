import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export  function UserProfile({ route }) {
    const navigation = useNavigation();

    // Dane użytkownika (możesz je pobierać z API)
    const user = {
        id: 1,
        name: "Bartosz Kaczmarczyk",
        address: "ul. Warszawska 10, Kraków",
        phone: "+48 600 123 456",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        lostPets: [
            { id: '1', name: "Reksio", type: "Pies", lastSeen: "Kraków, 10 stycznia" },
            { id: '2', name: "Mruczek", type: "Kot", lastSeen: "Warszawa, 5 stycznia" }
        ]
    };

    return (
        <View style={styles.container}>
            {/* Nagłówek z obrazkiem */}
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>📍 {user.address}</Text>
                    <Text style={styles.text}>📞 {user.phone}</Text>
                </View>
            </View>

            {/* Lista zaginionych zwierząt */}
            <Text style={styles.sectionTitle}>Zaginione zwierzęta:</Text>
            <FlatList
                data={user.lostPets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.petItem}>
                        <Text style={styles.petName}>{item.name} ({item.type})</Text>
                        <Text style={styles.text}>Ostatnio widziany: {item.lastSeen}</Text>
                    </View>
                )}
            />

            {/* Ikona wiadomości na dole ekranu */}
            <TouchableOpacity
                style={styles.messageButton}
                onPress={() => navigation.navigate('Message')}
            >
                <FontAwesome name="envelope" size={24} color="white" />
                <Text style={styles.messageButtonText}>Napisz wiadomość</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#555',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    petItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 8,
    },
    petName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    messageButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
