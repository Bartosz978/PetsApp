import {  StyleSheet } from 'react-native';  


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
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
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
        color: "#555",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    petItem: {
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 8,
    },
    petName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    messageButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    messageButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
});