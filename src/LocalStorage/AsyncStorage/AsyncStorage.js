import AsyncStorage from '@react-native-async-storage/async-storage';


// 📥 Funkcja do zapisywania danych w AsyncStorage
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`✅ Zapisano dane pod kluczem: ${key}`);
  } catch (e) {
    console.error("❌ Błąd zapisu do AsyncStorage:", e);
  }
};

// 📤 Funkcja do odczytywania danych z AsyncStorage
export const ReadData = async (key) => {
  if (typeof key !== 'string') {
    throw new Error("❌ Argument musi być stringiem!");
  }

  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      console.log(`📂 Odczytano dane z klucza: ${key}`);
      return JSON.parse(jsonValue);
    } else {
      console.warn(`⚠️ Brak danych pod kluczem: ${key}`);
      return null;
    }
  } catch (e) {
    console.error("❌ Błąd odczytu z AsyncStorage:", e);
    return null;
  }
};
