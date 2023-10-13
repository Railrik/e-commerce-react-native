import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';
import PaymentsHistory from '../screens/PaymentsHistory';
import globalStyles from '../styles/globalStyles';

const PaymentsStackNavigator = createStackNavigator();
export const PaymentsNavigator = () => {
    return (
        <PaymentsStackNavigator.Navigator
            screenOptions={({ navigation }) => (
                {
                    headerStyle: { backgroundColor: globalStyles.green },
                    headerTitleStyle: { fontWeight: "bold" },
                    headerTintColor: globalStyles.white,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderIcon}>
                            <Item
                                title="Panier"
                                iconName="shopping-cart"
                                onPress={() => navigation.navigate('CartNavigator')}
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
            )} >
            <PaymentsStackNavigator.Screen name="PaymentsHistory" component={PaymentsHistory} options={{ title: "Mes achats" }} />
        </PaymentsStackNavigator.Navigator>
    );
}



