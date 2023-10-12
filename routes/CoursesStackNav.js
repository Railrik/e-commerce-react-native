import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing';
import CourseDetails from '../screens/CourseDetails';
import Cart from '../screens/Cart';

const CoursesStackNavigator = createStackNavigator();

export const CoursesNavigator = () => {
    return (
        <CoursesStackNavigator.Navigator>
            <CoursesStackNavigator.Screen name="Landing" component={Landing} />
            <CoursesStackNavigator.Screen name="Details" component={CourseDetails} />
            <CoursesStackNavigator.Screen name="Cart" component={Cart} />
        </CoursesStackNavigator.Navigator>
    );
}



