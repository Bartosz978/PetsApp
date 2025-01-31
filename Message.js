import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';

const MessageStack = createNativeStackNavigator();

export function Message() {
    return ( 
        <MessageStack.Navigator initialRouteName='list'>
            <MessageStack.Screen name='list' component={MessageUserList} options={{headerShown: false}}/>
            <MessageStack.Screen name='chat' component={MessageChat} options={({route}) => ({title: route.params.name})}/>
        </MessageStack.Navigator>
    );
}

function MessageUserList({ navigation }) {
    const users = [
        { id: 101, name_surname: 'Bartosz Kaczmarczyk'},
        { id: 102, name_surname: 'Mateusz Wozniak'},
        { id: 103, name_surname: 'Halina Bera'},
    ];

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <UserListElement item={item} navigation={navigation}/>
                )}
                />
        </View>
    );
}

function UserListElement({ item, navigation }) {
    return (
        <TouchableOpacity style={styles.userListItem}
            onPress={() => navigation.navigate('chat', { userData: item, name: item.name_surname })}
            >
            <Text style={styles.userListItemText}>{item.name_surname}</Text>
        </TouchableOpacity>
    );
}

function MessageChat({ route }) {
    const [messages, setMessages] = useState({
        101: [{id: 0, message: 'Cześć, tutaj Bartosz Kaczmarczyk', isSent: false}],
        102: [{id: 0, message: 'Cześć, tutaj Mateusz Wozniak', isSent: false}],
        103: [{id: 0, message: 'Cześć, tutaj Halina Bera', isSent: false}]
    });
    const [inputMessage, setInputMessage] = useState(""); // Przechowuje wpisywany tekst

    function AddMessage(idUser, message) {
        if (message.trim() === "") return;
        setMessages(prevMessages => ({
            ...prevMessages,
            [idUser]: [...(prevMessages[idUser] || []), {message: message, isSent: true, id: prevMessages[idUser].length}]
        }));
    }

    const { userData } = route.params;
    const userId = userData.id;

    return (
        <View style={styles.chatContainer}>

            {/* Wyświetlanie wiadomości */}
            <View style={styles.messageContainer}>
                <FlatList
                    data={messages[userId]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <ChatMessage item={item}/>
                    )}
                    ListEmptyComponent={<Text style={styles.noMessages}>Brak wiadomości</Text>}
                />
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
                    AddMessage(userId, inputMessage);
                    setInputMessage(""); // Czyści pole po wysłaniu
                }}>
                    <Icon name="send" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ChatMessage({ item }) {
    return (
        <Text key={item.id} style={[styles.messageText, (item.isSent)?styles.sentMessageText:styles.receivedMessageText]}>{item.message}</Text>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'column'
    },
    chatContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'column'
    },
    userListItem: {
        backgroundColor: '#b3d89c',
        borderRadius: 8,
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    userListItemText: {
        fontSize: 16,
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
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    sentMessageText: {
        backgroundColor: '#b3d89c',
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end'
    },
    receivedMessageText: {
        backgroundColor: '#ddd',
        borderBottomLeftRadius: 0,
        alignSelf: 'flex-start'
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

export default Message;
