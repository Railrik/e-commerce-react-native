import { createDrawerNavigator } from '@react-navigation/drawer';
import { CoursesNavigator } from './CoursesStackNav';
import { CartNavigator } from './CartStackNav';
import { PaymentsNavigator } from './PaymentsStackNav';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={CoursesNavigator}
                options={{
                    title: "Catalogue",
                    headerShown: false,
                    drawerIcon: () => <MaterialIcons name="book" size={24} color="black" />
                }}
            />
            <Drawer.Screen
                name="CartNavigator"
                component={CartNavigator}
                options={{
                    title: "Panier",
                    headerShown: false,
                    drawerIcon: () => <MaterialIcons name="shopping-cart" size={24} color="black" />
                }}
            />
            <Drawer.Screen
                name="PaymentsNavigator"
                component={PaymentsNavigator}
                options={{
                    title: "Achats",
                    headerShown: false,
                    drawerIcon: () => <MaterialIcons name="credit-card" size={24} color="black" />
                }}
            />
        </Drawer.Navigator>
    )
}