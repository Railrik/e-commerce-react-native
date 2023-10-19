import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useQuery, useMutation, gql } from '@apollo/client';
import EmptyItem from '../components/EmptyItem';
import { MaterialIcons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';

const GET_COURSE = gql`
 query GetCourse($courseId: ID!) {
    course(id: $courseId) {
      id
      title
      description
      image
      price
      selected
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      userId
      cartItems {
        courseId
        quantity
        coursePrice
      }
    }
  }
`;

const CourseDetails = ({ navigation, route }) => {

    const [addToCart] = useMutation(ADD_TO_CART);
    const courseId = route.params.courseId;
    const instructorId = route.params.instructorId;
    const userId = route.params.userId;
    const { loading, error, data } = useQuery(GET_COURSE, {
        variables: { courseId },
        pollInterval: 500,
    });

    if (loading) {
        return <View><EmptyItem text="Chargement..." /></View>
    } else if (error) {
        return <View><EmptyItem text="Erreur" /></View>
    } else {
        const selectedCourse = data.course;
        const handleAddToCart = (course) => {
            const input = {
                userId: parseInt(route.params.userId, 10),
                cartItems: [
                    {
                        courseId: parseInt(course.id, 10),
                        quantity: 1,
                        coursePrice: parseFloat(course.price),
                    },
                ],
            };

            addToCart({
                variables: { input },
            })
                .then((response) => {
                    alert('Article ajouté au panier');
                })
                .catch((error) => {
                    alert('Erreur lors de l\'ajout au panier : ' + error.message);
                });
            navigation.goBack();
        }

        return (
            <View>
                <ScrollView style={styles.scroll}>
                    <Image
                        source={{ uri: selectedCourse.image }}
                        style={styles.courseImage}
                    />
                    <View style={styles.courseDetails}>
                        <Text numberOfLines={1} style={styles.courseTitle}>{selectedCourse.title}</Text>
                        <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <View style={styles.footerTop}>
                        <View style={styles.coursePriceWrapper}>
                            <Text style={styles.coursePrice}>{selectedCourse.price.toFixed(2)} €</Text>
                        </View>
                    </View>
                    <View style={styles.footerBottom}>
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={24}
                            color={globalStyles.white}
                            onPress={() => navigation.goBack()}
                        />
                        {userId !== instructorId ? (
                            <TouchableOpacity
                                onPress={() => handleAddToCart(selectedCourse)}
                            >
                                <View style={styles.btnAddToCart}>
                                    <MaterialIcons
                                        name="add-shopping-cart"
                                        size={32}
                                        color={globalStyles.green}
                                    />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('UserNavigator', {
                                    courseId: courseId
                                })}
                            >
                                <View style={styles.btnAddToCart}>
                                    <MaterialIcons
                                        name="edit"
                                        size={32}
                                        color={globalStyles.green}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default CourseDetails;

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: globalStyles.white,
        height: "80%"
    },
    courseImage: {
        width: "100%",
        height: 250
    },
    courseDetails: {
        padding: 20,
        alignItems: "center"
    },
    courseTitle: {
        marginVertical: 10,
        fontWeight: "bold",
        color: globalStyles.green,
        fontSize: 20
    },
    courseDescription: {
        color: globalStyles.darkGrey,
        fontSize: 17,
        marginHorizontal: 20,
        marginVertical: 10,
        textAlign: "justify"
    },
    footerContainer: {
        height: "20%",
    },
    footerTop: {
        height: "40%",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    coursePriceWrapper: {
        paddingRight: 40
    },
    coursePrice: {
        fontSize: 24,
        color: globalStyles.green
    },
    footerBottom: {
        backgroundColor: globalStyles.green,
        height: "60%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    btnAddToCart: {
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 25,
        backgroundColor: globalStyles.lightOrange
    }
})