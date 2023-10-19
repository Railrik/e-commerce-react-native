import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing';
import CourseDetails from '../screens/CourseDetails';
import Cart from '../screens/Cart';
import globalStyles from '../styles/globalStyles';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';

const CoursesStackNavigator = createStackNavigator();
export const CoursesNavigator = ({ route }) => {
    const { userId } = route.params

    return (
        <CoursesStackNavigator.Navigator
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
            <CoursesStackNavigator.Screen
                name="Landing"
                initialParams={
                    {
                        userId: userId
                    }
                }
                options={{ title: "Catalogue" }}
                component={Landing}
            />
            <CoursesStackNavigator.Screen
                name="Details"
                initialParams={
                    {
                        userId: userId
                    }
                }
                component={CourseDetails}
                options={({ route }) => (
                    {
                        title: route.params.title
                    }
                )} />
            <CoursesStackNavigator.Screen name="Cart" component={Cart} />
        </CoursesStackNavigator.Navigator>
    );
}



