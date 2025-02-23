import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { loadMessage, loadUser } from '../../Utlils/Load';
import { styles } from './style';
import { MessageUsers, Status, useLoadMessages } from '../../Utlils/DaneGlobalne';

const MessageStack = createNativeStackNavigator();

export function Message() {
    return (
        <MessageStack.Navigator initialRouteName='list'>
            <MessageStack.Screen name='list' component={MessageUserList} options={{ headerShown: false }} />
            <MessageStack.Screen name='chat' component={MessageChat} options={({ route }) => ({ title: route.params.name })} />
        </MessageStack.Navigator>
    );
}

function MessageUserList({ navigation }) {
    const importantMessage = useLoadMessages(Status);

    // Znalezienie rozmów użytkownika
    const userConversations = useMemo(() =>
        MessageUsers.filter(conv => conv.id_users_1 === MY_ID || conv.id_users_2 === MY_ID),
        []
    );

    // Pobranie ID rozmówców
    const userIds = useMemo(() =>
        userConversations.map(conv => conv.id_users_1 === MY_ID ? conv.id_users_2 : conv.id_users_1),
        [userConversations]
    );

    // Pobieranie użytkowników (tylko raz)
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        let isMounted = true; // Flaga do kontrolowania unmountu

        const fetchUserData = async () => {
            const UsersDataPromises = userIds.map(user => loadUser(user));
            const usersData = await Promise.all(UsersDataPromises);

            if (isMounted) {
                setUsersData(usersData);
            }
        };

        fetchUserData();

        return () => { isMounted = false }; // Cleanup effect

    }, [userIds]);

    return (
        <View style={styles.listContainer}>
            {usersData.length === 0 ? (
                <Text>Ładowanie danych użytkowników...</Text>
            ) : (
                <FlatList
                    data={usersData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <UserListElement item={item} navigation={navigation} />
                    )}
                />
            )}
        </View>
    );
}

function UserListElement({ item, navigation }) {
    return (
        <TouchableOpacity
            style={styles.userListItem}
            onPress={() => navigation.navigate('chat', { userData: item, name: item.name })}
        >
            <Text style={styles.userListItemText}>{item.name}</Text>
        </TouchableOpacity>
    );
}

function MessageChat({ route }) {
    console.log("Hej, dotarłem tutaj!");

    const { userData } = route.params;
    const userId = useMemo(() => userData.id, [userData]); // Zapamiętanie userId

    // Znalezienie rozmowy użytkownika
    const conversation = useMemo(() =>
        MessageUsers.find(conv => (conv.id_users_1 === userId || conv.id_users_2 === userId)),
        [userId]
    );

    // Stan wiadomości
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (conversation) {
            setMessages(conversation.wiadomosci || []);
        }
    }, [conversation]);

    const [inputMessage, setInputMessage] = useState("");

    function AddMessage(message) {
        if (message.trim() === "") return;

        const newMessage = {
            id_usera: MY_ID,
            tresc: message,
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputMessage("");
    }

    return (
        <View style={styles.chatContainer}>
            <View style={styles.messageContainer}>
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ChatMessage item={item} />}
                    ListEmptyComponent={<Text style={styles.noMessages}>Brak wiadomości</Text>}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Wpisz wiadomość..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity onPress={() => AddMessage(inputMessage)}>
                    <Icon name="send" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ChatMessage({ item }) {
    const isSent = item.id_usera === MY_ID;

    return (
        <Text style={[styles.messageText, isSent ? styles.sentMessageText : styles.receivedMessageText]}>
            {item.tresc}
        </Text>
    );
}



export default Message;
