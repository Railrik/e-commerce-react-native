import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import CourseItem from '../components/CourseItem';
import EmptyItem from '../components/EmptyItem';

const Landing = () => {

    const existingCourses = useSelector(state => state.courses.existingCourses);

    if (existingCourses.length) {
        return (
            <FlatList
                data={existingCourses}
                renderItem={({ item }) => (
                    <CourseItem
                        image={item.image}
                        title={item.title}
                        price={item.price}
                    >
                    </CourseItem>
                )}
            />
        )
    }
    return <EmptyItem text="Pas de cours à afficher" />

}

export default Landing

const styles = StyleSheet.create({})