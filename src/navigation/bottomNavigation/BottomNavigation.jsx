import { Provider } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddAnnouncementScreen } from '../../screens/AddingAnnounced/AddingAnnounced';
import { Message } from '../../screens/Message/Message';
import { Settings } from '../../screens/Settings/Settings';
import { StackNavigation } from '../stackNavigation/StackNavigation';


const Bottom = createBottomTabNavigator();

export function BottomNavigation() {

    return (
        <Provider>
            <Bottom.Navigator>

                <Bottom.Screen name='Menu' component={StackNavigation} options={{ headerShown: false }} />

                <Bottom.Screen name='Dodaj Ogłoszenie' component={AddAnnouncementScreen} options={{ title: "Dodaj Ogłoszenie" }} />
                
                <Bottom.Screen name='Setting' component={Settings} options={{ title: "Ustawienia" }} />

            </Bottom.Navigator>
        </Provider>
    );
}