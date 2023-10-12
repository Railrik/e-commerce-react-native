import { NavigationContainer } from '@react-navigation/native'
import { CoursesNavigator } from './CoursesStackNav'

const AppNav = () => {
    return (
        <NavigationContainer>
            <CoursesNavigator />
        </NavigationContainer>
    )
}

export default AppNav;
