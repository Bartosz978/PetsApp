const serverUrl = 'http://10.0.2.2:3000/input'; 
const serverUrl2 = 'http://10.0.2.2:3000'; // Poprawna nazwa zmiennej

export const getUsers = async (qest) => {
    try {
      console.log(`${serverUrl2}/${qest}`);
      const response = await fetch(`${serverUrl2}/${qest}`); // Poprawiony URL
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      const data = await response.json();
    //  console.log('Lista użytkowników:', data);
      return data;
    
    } catch (error) {
      console.error('Błąd pobierania użytkowników:', error);
      return null;
    }
};

export const addUser = async (body,qest) => {
    try {
      console.log(`${serverUrl2}/${qest}`);
      const response = await fetch(`${serverUrl2}/${qest}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Poprawiona struktura body
      });
  
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Dodano użytkownika:', data);
      return data;
    } catch (error) {
      console.error('Błąd dodawania użytkownika:', error);
      return null;
    }
};

export const updateUser = async (userId, updatedData) => {
  try {
      // Wysyłanie żądania PUT z danymi użytkownika
      const response = await fetch(`${serverUrl}/users?id=${userId}`, {  // Poprawiona struktura URL
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),  // Przesyłanie zaktualizowanych danych
      });

      if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Zaktualizowano użytkownika:', data);
      return data;  // Zwraca zaktualizowane dane użytkownika
  } catch (error) {
      console.error('Błąd podczas aktualizacji użytkownika:', error);
      return null;
  }
};

