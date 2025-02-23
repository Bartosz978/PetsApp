import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { MenuScreen } from '../../screens/Login/login'
import { SignUpScreen } from '../../screens/Register/Register';
import { BottomNavigation } from '../bottomNavigation/BottomNavigation';
import { MenuScreenMain } from '../../screens/Menu/Menu';
import { LostPetScreen } from '../../screens/Announcement/Announcement';
import { UserProfile } from '../../screens/Profile/Profile';

const Stack = createNativeStackNavigator();

const StackLogin = createNativeStackNavigator();

export function InitLogin() {
  return (
    <Provider>
      <StackLogin.Navigator initialRouteName="Login">

        <StackLogin.Screen
          name="Login"
          component={MenuScreen}
          options={{ title: 'Ekran Główny', headerShown: false }}
        />

        <StackLogin.Screen
          name="SignIn"
          component={SignUpScreen}
          options={{ title: 'Rejestracja', headerShown: false }}
        />

        <StackLogin.Screen
          name="Bottom"
          component={BottomNavigation}
          options={{ title: 'Ekran Główny', headerShown: false, tabBarVisible: false }}
        />

      </StackLogin.Navigator>
    </Provider>
  );
}

export function StackNavigation() {
  return (
    <Provider>
      <Stack.Navigator initialRouteName="Mapa">

        <Stack.Screen
          name="Mapa"
          component={MenuScreenMain}
          options={{ title: 'Mapa' }}
        />
        
        <Stack.Screen
          name="LostPet"
          component={LostPetScreen}
          options={{ title: 'Informacje o zwierzaku' }}
        />

        <Stack.Screen
          name="Sender"
          component={UserProfile}
          options={{ title: 'Profile' }}
        />

      </Stack.Navigator>
    </Provider>
  );
}
