import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import EmptyItem from '../components/EmptyItem';
import { FlatList } from 'react-native-gesture-handler';
import CoursesInCart from '../components/CoursesInCart';
import globalStyles from '../styles/globalStyles';

const GET_USER = gql`
 query GetUser($userId: ID!) {
    user(id: $userId) {
    id
    email
    name
    cart {
      id
      cartItems {
        coursePrice
        quantity
        course {
          title
          id
        }
      }
    }
  }
  }
`;

const REMOVE_FROM_CART = gql`
 mutation RemoveFromCart($input: RemoveFromCartInput!) {
  removeFromCart(input: $input) {
    userId
    cartItems {
      courseId
      quantity
    }
  }
}
`;


const ADD_TO_USER_COURSE = gql`
mutation AddCartItemsToUserCourse($input: AddCartItemsToUserCourseInput!) {
  addCartItemsToUserCourse(input: $input) {
    message
  }
}
`;

const Cart = ({ route }) => {
    const { userId } = route.params;
    // const dispatch = useDispatch();
    // const cartCourses = useSelector(state => state.cart.cartCourses);
    // const parsedCartCourses = cartCourses.map(course => JSON.parse(course));
    //const total = useSelector(state => state.cart.total);


    const { loading: loading, error, data } = useQuery(GET_USER, {
        variables: { userId },
        pollInterval: 500,
    });

    const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
        refetchQueries: [
            { query: GET_USER },
        ],
    });

    const [addToUserCource] = useMutation(ADD_TO_USER_COURSE, {
        refetchQueries: [
            { query: GET_USER },
        ],
    });

    const [cartCourses, setCartCourses] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (data) {
            if (data.user.cart) {
                setCartCourses(data.user.cart.cartItems);
            }
        }
    }, [data]);

    useEffect(() => {
        if (cartCourses.length > 0) {
            const totalPrice = cartCourses.reduce((acc, item) => {
                return acc + item.coursePrice * item.quantity;
            }, 0);
            setTotal(totalPrice);
        }
    }, [cartCourses]);

    if (loading) {
        return <View><EmptyItem text="Chargement..." /></View>
    } else if (error) {
        return <View><EmptyItem text="Erreur" /></View>
    } else {
        const handlerPayment = (cartCourses, total) => {
            // dispatch(addPayment(cartCourses, total));
            const input = {
                cartId: parseInt(data.user.cart.id, 10),
                userId: parseInt(data.user.id, 10),
            };

            addToUserCource({
                variables: { input }
            })
                .then((response) => {
                    alert("Paiement effectué")
                })
                .catch((error) => {
                    alert('Erreur lors du retrait au panier : ' + error.message);
                });
        }

        const handleRemoveFromCart = (itemId) => {
            const input = {
                userId: parseInt(data.user.id, 10),
                cartItems: [
                    {
                        courseId: parseInt(itemId, 10),
                        quantity: 1,
                    },
                ],
            };

            removeFromCart({
                variables: { input }
            })
                .then((response) => {

                })
                .catch((error) => {
                    alert('Erreur lors du retrait au panier : ' + error.message);
                });
        }

        if (cartCourses.length) {
            return (
                <View style={styles.cartContainer}>

                    <FlatList
                        data={cartCourses}
                        renderItem={({ item }) => (
                            <CoursesInCart
                                title={item.course.title}
                                price={item.coursePrice}
                                // onDelete={() => dispatch(removeFromCart(item.id))}
                                onDelete={() => handleRemoveFromCart(item.course.id)}
                            />
                        )}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Total : <Text style={styles.totalPrice}>{total.toFixed(2)} €</Text>
                        </Text>
                        <TouchableOpacity
                            onPress={() => handlerPayment()}
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