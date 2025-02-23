import { Provider } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AddAnnouncementScreen} from'../../screens/AddingAnnounced/AddingAnnounced';
import {Message} from'../../screens/Message/Message';
import {Settings} from'../../screens/Settings/Settings';
import {stackNaviagtion} from'../stackNavigation/StackNavigation';


const Bottom = createBottomTabNavigator();

export function bottomnNavigation(){

return(<Provider>
    <Bottom.Navigator>
        <Bottom.Screen name='Menu' component={stackNaviagtion} options={{ headerShown: false }}/>
        <Bottom.Screen name='DodaOgloszenie' component={AddAnnouncementScreen} options={{title: "Dodaj Ogloszenie"}}/>
        <Bottom.Screen name='Setting' component={Settings} options={{title: "Ustawienia"}}/>

    </Bottom.Navigator>
</Provider>);
}