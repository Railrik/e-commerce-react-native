import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const Cart = () => {
    const cartCourses = useSelector(state => state.cart.cartCourses);
    const total = useSelector(state => state.cart.total);
    return (
        <View>
            <Text>{cartCourses}</Text>
            <Text>{total}</Text>
        </View>
    )
}

export default Cart;