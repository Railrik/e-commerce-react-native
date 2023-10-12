import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import CourseItem from '../components/CourseItem';
import EmptyItem from '../components/EmptyItem';

const Landing = ({ navigation }) => {

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
                        viewDetails={() => navigation.navigate('Details', {
                            courseId: item.id
                        })}
                        onAddToCart={() => navigation.navigate('Cart')}
                    >
                    </CourseItem>
                )}
            />
        )
    }
    return <EmptyItem text="Pas de cours à afficher" />
}

export default Landing;