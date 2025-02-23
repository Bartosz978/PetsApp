import { addUser, getUsers, updateUser } from '../Network/Network';
import { ReadData, saveData } from '../LocalStorage/AsyncStorage/AsyncStorage';
import {OgloszeniaCale,useUsers,Users,MesegeUsers,MY_ID, Status} from './DaneGlobalne';


let OgloszeniaData = [];

const LocalStatusWia = {
    statuswiadomosci: 0,
    statuswiadomosciKey: 'my-key-status-Wiado',
};

const LocalStatusOglo = {
    statusogloszen: 0,
    statusogloszenKey: 'my-key-status-Oglo',
    Ogloszeniafile: 'Ogloszenia'
};

export async function LoadStaus() {
    try {
        // 1️⃣ Pobierz status ogłoszeń z lokalnej bazy
        LocalStatusOglo.statusogloszen = await ReadData(LocalStatusOglo.statusogloszenKey) || 0;

        // 2️⃣ Pobierz status ogłoszeń z serwera
        const statuserw = await getUsers('statusfirst'); 
        const statusSerwera = parseInt(statuserw.add, 10); // Konwersja do liczby

        // 3️⃣ Sprawdź, gdzie jest więcej ogłoszeń
        if (LocalStatusOglo.statusogloszen-100 < statusSerwera) {
            console.log('📡 Pobieram nowe ogłoszenia z serwera...');
             OgloszeniaData = await getUsers('getAllOgloszenia'); 
            // Nadpisz dane w lokalnej bazie
            OgloszeniaCale.length = 0; 
            OgloszeniaCale.push(...OgloszeniaData);
          

            await saveData(LocalStatusOglo.Ogloszeniafile, OgloszeniaData);
            await saveData(LocalStatusOglo.statusogloszenKey, statusSerwera);
        } else {
            console.log('📁 Używam lokalnych ogłoszeń...');
            const lokalneDane = await ReadData(LocalStatusOglo.statusogloszenKey);
            OgloszeniaCale.length = 0; 
            OgloszeniaCale.push(...lokalneDane);      

            console.log('📂 Załadowane lokalne ogłoszenia:', lokalneDane);
        }

        // 4️⃣ Pobierz status wiadomości
        LocalStatusWia.statuswiadomosci = await ReadData(LocalStatusWia.statuswiadomosciKey) || 0;
    } catch (error) {
        console.error('❌ Błąd w LoadStaus:', error);
    }
}

export async function LoadUser(IdUser) {
    console.log(`Pobieram użytkownika o ID: ${IdUser}`);
    
    // Sprawdzamy, czy użytkownik istnieje w globalnej tablicy `Users`
    if (Users && Users[IdUser]) {
        return Users[IdUser]; // Zwracamy użytkownika, jeśli już jest w globalnej tablicy
    }

    // Jeśli nie ma go w `Users`, możemy wykonać zapytanie do API
    try {
        const userData = await getUsers(`User/${IdUser}`); // Przykładowe API
        if (userData) {
            Users[IdUser] = userData; // Zapisujemy dane użytkownika do globalnej tablicy
            return userData; // Zwracamy dane użytkownika
        }
        return null; // W przypadku braku danych
    } catch (error) {
        console.error("Błąd w LoadUser:", error);
        return null; // W przypadku błędu zwracamy null
    }
}


function WriteStatus() {

}

export async function Loadmessege(body) {
    try {
        const messege = await addUser(body, "regularquest");
        if (messege === true) {
            const newMessegebefore = await getUsers(`messegeuser/${MY_ID}`);
           // const newMessege = JSON.stringify(newMessegebefore,null,2);

            if (newMessegebefore) {
                //MesegeUsers.length = 0; // Czyści tablicę, ale zachowuje referencję
                MesegeUsers.push(...newMessegebefore); // Dodaje nowe wiadomości
                     //     console.log("Pobrano WIADOMOŚCI:", MesegeUsers);
     
             return MesegeUsers;
            } else {
                console.error("Błąd: newMessege nic  noewgo.");
            }
        }
    } catch (error) {
        console.error("Błąd w Loadmessege:", error);
    }
    return null;
}

function loadUserMessege() {
    
}



export function giveNewogloszenie (Ogloszenie) {
    console.log(Ogloszenie);
}

// Funkcja do dodawania nowego użytkownika
export async function giveNewUser(user) {
    const ket = "User123";  // Klucz używany do zapisywania danych użytkownika
    saveData(ket, user);  // Zapisanie danych użytkownika w pamięci lokalnej

    try {
        // Wywołanie metody do aktualizacji danych na serwerze
        const response = await updateUser(`${MY_ID}/newuser`, user);

        if (response) {
            console.log('Nowy użytkownik został zapisany:', response);
            return response;  // Zwracamy odpowiedź z serwera
        } else {
            console.log('Błąd podczas dodawania użytkownika');
            return null;
        }
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania użytkownika:', error);
        return null;
    }
}



export { OgloszeniaData };