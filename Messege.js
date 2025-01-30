import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AddMessage, getMessage ,messages} from './Users';

export function Messege() {
    const users = [
        { id: 1, name_surname: 'Bartosz Kaczmarczyk', userId: 101 },
        { id: 2, name_surname: 'Mateusz Wozniak', userId: 102 },
        { id: 3, name_surname: 'Halina Bera', userId: 103 },
    ];

    const [selectedUserId, setSelectedUserId] = useState(101);
    const [messages, setMessages] = useState([]);

    // Aktualizujemy wiadomości na zmianę użytkownika
    useEffect(() => {
        setMessages(getMessage(selectedUserId));
    }, [selectedUserId]);

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                {users.map((user) => (
                    <TouchableOpacity
                        key={user.id}
                        style={styles.message}
                        onPress={() => setSelectedUserId(user.userId)}
                    >
                        <Text>{user.name_surname}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Komponent wyświetlający wiadomości dla wybranego użytkownika */}
            <PrivateMessege userId={selectedUserId} setMessages={setMessages} />
        </View>
    );
}

function PrivateMessege({ userId, setMessages }) {
    return (
        <View style={styles.container1}>
            <Text style={styles.profileText}>Wiadomości dla użytkownika {userId}</Text>

            {getMessage(userId)}

            <Button 
                title="Dodaj wiadomość" 
                onPress={() => {
                    AddMessage(userId, `Nowa wiadomość dla ${userId}`);
                    setMessages(getMessage(userId)); // Odświeżenie wiadomości
                }}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderWidth: 5,
        borderColor: 'green',
        flexDirection: 'column',
        padding: 10
    },
    message: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        maxWidth: '100%',
        maxHeight: '10%',
        flexDirection: 'column',
        borderColor: 'blue',
        borderWidth: 1,
        padding: 10,
        marginBottom: 5
    },
    profileText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

export default Messege;
