import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import globalStyles from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

const CourseDetails = ({ navigation, route }) => {

    const courseId = route.params.courseId;
    const selectedCourse = useSelector(state => state.courses.existingCourses.find(course => course.id === courseId));

    return (
        <View>
            <ScrollView style={styles.scroll}>
                <Image
                    source={{ uri: selectedCourse.image }}
                    style={styles.courseImage}
                />
                <View style={styles.courseDetails}>
                    <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
                    <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
                    <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
                    <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
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

                    <TouchableOpacity
                        onPress={() => alert('ajouter au panier')}
                    >
                        <View style={styles.btnAddToCart}>
                            <MaterialIcons
                                name="add-shopping-cart"
                                size={32}
                                color={globalStyles.green}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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