import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function Messege() {
    const users = [
        { id: 1, name_surname: 'Bartosz Kaczmarczyk', userId: 101 },
        { id: 2, name_surname: 'Mateusz Wozniak', userId: 102 },
        { id: 3, name_surname: 'Halina Bera', userId: 103 },
    ];

    const [selectedUserId, setSelectedUserId] = useState(101);
    const [messages, setMessages] = useState({});

    function AddMessage(idUser, message) {
        if (message.trim() === "") return;
        setMessages(prevMessages => ({
            ...prevMessages,
            [idUser]: [...(prevMessages[idUser] || []), message]
        }));
    }

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

            <PrivateMessege userId={selectedUserId} messages={messages} onAddMessage={AddMessage} />
        </View>
    );
}

function PrivateMessege({ userId, messages, onAddMessage }) {
    const [inputMessage, setInputMessage] = useState(""); // Przechowuje wpisywany tekst

    return (
        <View style={styles.container1}>
            <View style={styles.header}>
                <Text style={styles.profileText}>Wiadomości dla użytkownika {userId}</Text>
                <TouchableOpacity onPress={() => onAddMessage(userId, `Szybka wiadomość dla ${userId}`)}>
                    <Icon name="plus-circle" size={24} color="blue" />
                </TouchableOpacity>
            </View>

            {/* Wyświetlanie wiadomości */}
            <View style={styles.messageContainer}>
                {messages[userId]?.length > 0 ? (
                    messages[userId].map((msg, index) => (
                        <Text key={index} style={styles.messageText}>{msg}</Text>
                    ))
                ) : (
                    <Text style={styles.noMessages}>Brak wiadomości</Text>
                )}
            </View>

            {/* Pole wpisywania i przycisk wysyłania */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Wpisz wiadomość..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity onPress={() => {
                    onAddMessage(userId, inputMessage);
                    setInputMessage(""); // Czyści pole po wysłaniu
                }}>
                    <Icon name="send" size={24} color="blue" />
                </TouchableOpacity>
            </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    messageContainer: {
        flex: 1,
        marginBottom: 10,
    },
    noMessages: {
        fontSize: 14,
        color: '#aaa',
    },
    profileText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginRight: 10
    }
});

export default Messege;
