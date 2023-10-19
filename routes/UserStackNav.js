import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderIcon from '../components/CustomHeaderIcon';
import UserCourses from '../screens/UserCourses';
import UserEditCourses from '../screens/UserEditCourses';
import globalStyles from '../styles/globalStyles';

const UserstackNavigator = createStackNavigator();
export const UserNavigator = ({ navigation, route }) => {
    const { userId, courseId } = route.params

    useEffect(() => {
        if (courseId) {
            // Si courseId est défini, navigation automatiquement vers Edit
            navigation.navigate('Edit', { courseId });
        }
    }, [courseId, navigation]);

    return (
        <UserstackNavigator.Navigator
            screenOptions={
                {
                    headerStyle: { backgroundColor: globalStyles.green },
                    headerTitleStyle: { fontWeight: "bold" },
                    headerTintColor: globalStyles.white,
                }
            }
        >
            <UserstackNavigator.Screen name="Courses"
                component={UserCourses}
                initialParams={{ userId: userId }}
                options={({ navigation }) => (
                    {
                        title: "Formations en vente",
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderIcon}>
                                <Item
                                    title="Editer"
                                    iconName="library-add"
                                    onPress={() => navigation.navigate("Edit", {
                                        title: "Créer une formation"
                                    })}
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
            />

            <UserstackNavigator.Screen
                name="Edit"
                component={UserEditCourses}
                initialParams={{ userId: userId }}
                options={({ route }) => ({
                    title: route.params.title ? route.params.title : " Editer la formation"
                })}
            />
        </UserstackNavigator.Navigator>
    );
}