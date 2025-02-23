import {  StyleSheet } from 'react-native';  


export const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    chatContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    userListItem: {
        backgroundColor: '#b3d89c',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    userListItemText: {
        fontSize: 16,
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
        alignSelf: 'flex-end',
    },
    receivedMessageText: {
        backgroundColor: '#ddd',
        alignSelf: 'flex-start',
    },
    messageContainer: {
        flex: 1,
        marginBottom: 10,
    },
    noMessages: {
        fontSize: 14,
        color: '#aaa',
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
        marginRight: 10,
    },
});