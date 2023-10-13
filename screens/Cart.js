import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import EmptyItem from '../components/EmptyItem';
import { FlatList } from 'react-native-gesture-handler';
import CoursesInCart from '../components/CoursesInCart';
import globalStyles from '../styles/globalStyles';
import { removeFromCart } from '../redux/actions/actionRemoveFromCart';
import { addPayment } from '../redux/actions/actionPayment';

const Cart = () => {

    const dispatch = useDispatch();
    const cartCourses = useSelector(state => state.cart.cartCourses);
    const parsedCartCourses = cartCourses.map(course => JSON.parse(course));
    const total = useSelector(state => state.cart.total);

    const handlerPayment = (cartCourses, total) => {
        dispatch(addPayment(cartCourses, total));
        alert("Paiement effectué")
    }

    if (parsedCartCourses.length) {
        return (
            <View style={styles.cartContainer}>

                <FlatList
                    data={parsedCartCourses}
                    renderItem={({ item }) => (
                        <CoursesInCart
                            title={item.title}
                            price={item.price}
                            onDelete={() => dispatch(removeFromCart(item.id))}
                        />
                    )}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                        Total : <Text style={styles.totalPrice}>{total.toFixed(2)} €</Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => handlerPayment(cartCourses, total)}
                    >
                        <View style={styles.btnAddPayment}>
                            <Text style={styles.btnAddPaymentText}>
                                Passer au paiement
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return <EmptyItem text="Panier vide" />
}

export default Cart;

const styles = StyleSheet.create({
    cartContainer: {
        margin: 20
    },
    totalContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 19
    },
    totalText: {
        fontWeight: "bold",
        fontSize: 19
    },
    totalPrice: {
        color: globalStyles.green
    },
    btnAddPayment: {
        borderRadius: 6,
        paddingVertical: 9,
        paddingHorizontal: 25,
        backgroundColor: globalStyles.orange
    },
    btnAddPaymentText: {
        fontSize: 19
    }

})