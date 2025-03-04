import { useState, useEffect } from 'react';
import { loadMessage } from './Load';  // Import funkcji do ładowania wiadomości

// Stałe globalne
export const MY_ID = 1;
export const OgloszeniaCale = [];  // Przykładowa tablica ogłoszeń
export const Users = [];           // Tablica użytkowników
export const MessageUsers = [];
export const Id_MyUser = []    // Tablica wiadomości

export const Status = {
  id_status_uzytkownika: MY_ID,
  count_wiadomosciUser: 0,
  count_nowych_wiadomosci: 0,
};

// Hook do ładowania wiadomości
export function useLoadMessages(status) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const loadedMessages = await loadMessage(status);
        console.log("📥 Nowe wiadomości:", loadedMessages);

        if (loadedMessages) {
          setMessages(loadedMessages);
        }
      } catch (error) {
        console.error("❌ Błąd ładowania wiadomości:", error);
      }
    }

    fetchMessages();  // Pierwsze załadowanie
    const interval = setInterval(fetchMessages, 10000); // Odświeżanie co 10 sek.

    return () => clearInterval(interval); // Czyszczenie interwału
  }, [status]);

  return messages;
}
