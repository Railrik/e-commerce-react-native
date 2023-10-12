import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CourseItem from '../components/CourseItem';
import EmptyItem from '../components/EmptyItem';
import { addToCart } from '../redux/actions/actionAddToCart';

const Landing = ({ navigation }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (course) => {
        dispatch(addToCart(course));
        alert("Article ajouté au panier")
    }
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
                            courseId: item.id,
                            title: item.title
                        })}
                        onAddToCart={() => handleAddToCart(item)}
                    >
                    </CourseItem>
                )}
            />
        )
    }
    return <EmptyItem text="Pas de cours à afficher" />
}

export default Landing;