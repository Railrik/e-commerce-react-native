import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing';
import CourseDetails from '../screens/CourseDetails';
import Cart from '../screens/Cart';
import globalStyles from '../styles/globalStyles';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';

const CoursesStackNavigator = createStackNavigator();
export const CoursesNavigator = () => {
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
                                onPress={() => navigation.navigate('Cart')}
                            />
                        </HeaderButtons>
                    )
                }
            )
            }
        >
            <CoursesStackNavigator.Screen name="Landing" component={Landing} />
            <CoursesStackNavigator.Screen name="Details" component={CourseDetails}
                options={({ route }) => (
                    {
                        title: route.params.title
                    }
                )
                } />
            <CoursesStackNavigator.Screen name="Cart" component={Cart} />
        </CoursesStackNavigator.Navigator>
    );
}



