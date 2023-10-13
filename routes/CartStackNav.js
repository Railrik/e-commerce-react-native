import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';
import Cart from '../screens/Cart';
import globalStyles from '../styles/globalStyles';

const CartStackNavigator = createStackNavigator();
export const CartNavigator = () => {
    return (
        <CartStackNavigator.Navigator
            screenOptions={({ navigation }) => (
                {
                    headerStyle: { backgroundColor: globalStyles.green },
                    headerTitleStyle: { fontWeight: "bold" },
                    headerTintColor: globalStyles.white,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderIcon}>
                            <Item
                                title="Home"
                                iconName="home"
                                onPress={() => navigation.navigate("Home")}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderIcon}>
                            <Item
                                title="Menu"
                                iconName="menu"
                                onPress={() => navigation.openDrawer()}
                                style={{ marginLeft: 10 }}
                            />
                        </HeaderButtons>
                    ),
                }
            )}
        >
            <CartStackNavigator.Screen name="Cart" component={Cart} options={{ title: "Panier" }} />
        </CartStackNavigator.Navigator>
    );
}



