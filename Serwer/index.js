const express = require('express');
const cors = require('cors');
const { save,read } = require('./File'); // Import poprawiony na CommonJS

const app = express();
const PORT = 3000;

let a = {
  a: 65,
  b: "56",
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/getjson', (req, res) => {
  res.json(a);
});

app.get('/statusfirst', async (req, res) => {
  try {
    let c = await read('statusOgloszen.json'); // Oczekiwanie na odczyt danych
    res.json(c);
  } catch (error) {
    res.status(500).json({ error: 'Błąd odczytu pliku JSON' });
  }
});

app.get('/getAllOgloszenia', async (req, res) => {
  const allData = await read('ogloszenia.json'); // Pobiera wszystkie ogłoszenia
  res.json(allData); // Wysyła do klienta jako JSON
});

app.put('/ogloszenia', async (req, res) => {
  try {
    const ogloszenie = req.body; // Odbieramy dane z ciała zapytania

    // Odczytujemy wszystkie dane ogłoszeń z pliku
    const allData = await read('ogloszenia.json');

    if (!Array.isArray(allData)) {
      return res.status(500).json({ message: 'Błąd: dane w ogloszenia.json nie są tablicą' });
    }

    maxID = 0;
    for (var i = 0; i < allData.length; i++) {
      maxID = maxID > parseInt(allData[i]['id']) ? maxID : allData[i]['id'];
    }
    nextID = parseInt(maxID)+1;
    ogloszenie['id'] = "" + nextID;

    // Dodajemy do listy ogłoszeń
    allData.push(ogloszenie);

    // Zapisujemy zaktualizowaną listę ogłoszeń
    await save('ogloszenia.json', allData);

    // Wysyłamy odpowiedź z potwierdzeniem
    res.status(200).json({ message: 'Ogłoszenie dodane', body: ogloszenie });
  } catch (error) {
    console.error('Błąd podczas dodawania ogłoszenia:', error);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
});

app.get('/User/:id', async (req, res) => {
  const id = req.params.id; // Pobierz id jako string (bez konwersji)
  
  const allData = await read('Users.json'); // Pobierz wszystkie dane użytkowników

  if (!allData) {
    return res.status(500).json({ message: 'Błąd wczytywania danych' });
  }

  // Znalezienie użytkownika po id (bez konwersji na liczbę)
  const user = allData.find(u => u.id === id); 

  if (!user) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }

  
  res.json(user);
  console.log(user);
});


app.get('/regularquest/:id', async (req, res) => {
  const id = req.params.id; // Pobierz id jako string (bez konwersji)
  
  const allData = await read('privateMessege.json'); // Pobierz wszystkie dane użytkowników

  if (!allData) {
    return res.status(500).json({ message: 'Błąd wczytywania danych' });
  }

  // Znalezienie użytkownika po id (bez konwersji na liczbę)
  const user = allData.find(u => u.id_users_1 === id || u.id_users_2 === id ); 

  if (!user) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }

  
  res.json(user);
  console.log(user);
});
app.put('/updateUser/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Pobieramy id użytkownika z URL
    const updatedUser = req.body; // Odbieramy dane z ciała zapytania

    // Odczytujemy wszystkie dane użytkowników z pliku
    const allData = await read('Users.json');

    if (!Array.isArray(allData)) {
      return res.status(500).json({ message: 'Błąd: dane w Users.json nie są tablicą' });
    }

    // Szukamy użytkownika po id
    const userIndex = allData.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }

    // Aktualizujemy dane użytkownika
    allData[userIndex] = { ...allData[userIndex], ...updatedUser };

    // Zapisujemy zaktualizowaną listę użytkowników
    await save('Users.json', allData);

    // Wysyłamy odpowiedź z potwierdzeniem
    res.status(200).json({ message: 'Użytkownik zaktualizowany', user: allData[userIndex] });
  } catch (error) {
    console.error('Błąd podczas aktualizacji użytkownika:', error);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
});



app.get('/messegeuser/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id); // Konwersja id na liczbę
    const allData = await read('PrivateMessge.json'); // Pobranie danych

    if (!Array.isArray(allData)) {
      return res.status(500).json({ message: 'Błąd: allData nie jest tablicą' });
    }

    // Pobranie wszystkich wiadomości użytkownika
    const userMessages = allData.filter(u => u.id_users_1 === userId || u.id_users_2 === userId);

    if (userMessages.length == 0) {
      return res.status(404).json({ message: 'Użytkownik nie ma wiadomości' });
    }

    res.json(userMessages); // Zwrócenie tablicy wiadomości użytkownika
    console.log("Znalezione wiadomości:", userMessages);
  } catch (error) {
    console.error("Błąd w /messegeuser/:id:", error);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
});

// Obsługa POST /input
app.post('/input', (req, res) => {
  console.log('Otrzymano dane:', req.body);
  save(req.body); // Teraz działa poprawnie
  res.status(200).json({ message: 'Dane zapisane poprawnie' });
});

app.post('/regularquest', async (req, res) => {

  const { id_status_uzytkownika, count_wiadomosciUser, count_nowcyh_wiadomosci } = req.body; // Pobierz dane z body

  const allData = await read('statusUser.json'); // Pobierz wszystkie dane użytkowników

  if (!allData) {
    return res.status(500).json({ message: 'Błąd wczytywania danych' });
  }

  const user = allData.find(u => u.id_status_uzytkownika === id_status_uzytkownika); 
  console.log('Otrzymano dane:', user);

  // Sprawdzenie, czy user istnieje
  if (!user) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }

  // Sprawdzenie wartości (poprawione)
  if (user.count_wiadomosciUser > count_wiadomosciUser || user.count_nowcyh_wiadomosci > count_nowcyh_wiadomosci) {
    return res.json(true);
  }

  return res.json(false);
});


app.listen(PORT, () => {
  console.log(`Serwer działa na http://127.0.0.1:${PORT}`);
});

// index.js
app.put('/users/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    
    const userData = req.body;
    
    // Validate required fields
    if (!userData.username || !userData.password || !userData.name) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Read existing users
    let allUsers = [];
    try {
      allUsers = await read('Users.json') || [];
    } catch (error) {
      // If file doesn't exist, start with empty array
      console.log('No existing users file, starting fresh');
    }
    
    // Check if username already exists
    if (allUsers.some(user => user.username === userData.username)) {
      console.log('Username already exists:', userData.username);
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }
    
    // Add new user
    const newUser = {
      id: (allUsers.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    allUsers.push(newUser);
    
    // Save updated users list
    try {
      await save('Users.json', allUsers);
      console.log('User registered successfully:', newUser.id);
      
      res.json({ 
        success: true, 
        message: 'User registered successfully',
        userId: newUser.id
      });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      throw saveError;
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Add this to index.js after the registration endpoint

app.post('/users/login', async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    
    const { username, password } = req.body;
    
    // Validate required fields
    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    // Read existing users
    let users = [];
    try {
      users = await read('Users.json') || [];
    } catch (error) {
      console.error('Error reading users file:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      console.log('Invalid credentials for username:', username);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
    
    // Login successful
    console.log('User logged in successfully:', username);
    res.json({ 
      success: true, 
      message: 'Login successful',
      userId: user.id
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Dodaj te endpointy do index.js

// Endpoint do pobierania danych użytkownika
app.get('/users/current', async (req, res) => {
  try {
    const username = req.headers.authorization.split(' ')[1]; // Pobierz username z nagłówka
    
    // Pobierz dane wszystkich użytkowników
    const users = await read('Users.json') || [];
    
    // Znajdź użytkownika po username
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Zwróć dane użytkownika (bez wrażliwych informacji)
    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      address: user.address,
      phone: user.phone,
      avatar: user.avatar
    });
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Endpoint do aktualizacji danych użytkownika
app.put('/users/update', async (req, res) => {
  try {
    const username = req.headers.authorization.split(' ')[1]; // Pobierz username z nagłówka
    const updatedData = req.body;
    
    // Pobierz dane wszystkich użytkowników
    let users = await read('Users.json') || [];
    
    // Znajdź indeks użytkownika
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Zaktualizuj dane użytkownika
    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    // Zapisz zaktualizowane dane
    await save('Users.json', users);
    
    res.json({ 
      success: true, 
      message: 'Profile updated successfully' 
    });
    
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});