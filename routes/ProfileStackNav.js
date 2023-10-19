import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../screens/Cart';
import globalStyles from '../styles/globalStyles';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';
import Profile from '../screens/Profile';

const ProfilesStackNavigator = createStackNavigator();

export const ProfilNavigator = ({ route }) => {
    const { userId } = route.params;
    return (
        <ProfilesStackNavigator.Navigator
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
            )}>

            <ProfilesStackNavigator.Screen name="Profile" options={{ title: "Mon profil" }}
                initialParams={
                    {
                        userId: userId
                    }
                }
                component={Profile} />

            <ProfilesStackNavigator.Screen name="Cart" component={Cart} />
        </ProfilesStackNavigator.Navigator>
    );
}



