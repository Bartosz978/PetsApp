import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Mapa wiadomości jako stan
export const [messages, setMessages] = useState(new Map());

export function AddMessage(idUser, message) {
    setMessages(prevMessages => {
        const newMessages = new Map(prevMessages);
        if (!newMessages.has(idUser)) {
            newMessages.set(idUser, []);
        }
        newMessages.get(idUser).push(message);
        return newMessages;
    });
}

export function getMessage(idUser) {
    const userMessages = messages.get(idUser) || [];

    return (
        <View style={styles.messageContainer}>
            {userMessages.length > 0 ? (
                userMessages.map((msg, index) => (
                    <Text key={index} style={styles.messageText}>{msg}</Text>
                ))
            ) : (
                <Text style={styles.noMessages}>Brak wiadomości</Text>
            )}
        </View>
    );
}


// Style dla wiadomości
const styles = StyleSheet.create({
    messageContainer: {
        marginTop: 10,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    noMessages: {
        fontSize: 14,
        color: '#aaa',
    },
});
