import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native'
import globalStyles from '../styles/globalStyles'
import { MaterialIcons } from '@expo/vector-icons';

const CourseItem = ({ edit, courseId, image, title, price, viewDetails, instructorName, onAddToCart, userId, instructorId }) => {
    return (
        <TouchableHighlight
            underlayColor={globalStyles.green}
            onPress={viewDetails}
        >
            <View style={styles.coursesContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: image }} />
                </View>
                <View style={styles.courseContainerDetails}>
                    <Text style={styles.courseTitle}>{title}</Text>
                    <Text style={styles.courseInsctructoName}>Proposé par {instructorId === userId ? 'vous' : instructorName}</Text>

                    <Text style={styles.coursePrice}>{price.toFixed(2)} €</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={viewDetails}>
                        <MaterialIcons name="remove-red-eye" size={35} color={globalStyles.green} />
                    </TouchableOpacity>

                    {instructorId !== userId ? (
                        <TouchableOpacity onPress={onAddToCart}>
                            <MaterialIcons name="add-shopping-cart" size={35} color={globalStyles.green} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => edit(courseId)}
                        >
                            <MaterialIcons name="edit" size={35} color={globalStyles.green} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableHighlight>
    )
}
export default CourseItem;

const styles = StyleSheet.create({
    coursesContainer: {
        backgroundColor: globalStyles.white,
        borderRadius: 10,
        height: 300,
        margin: 25,
        borderColor: globalStyles.lightGrey,
        borderWidth: 1
    },
    imageContainer: {
        width: "100%",
        height: "60%"
    },
    image: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    courseContainerDetails: {
        alignItems: "center",
        height: "20%",
        padding: 10
    },
    courseTitle: {
        fontSize: 18,
        marginVertical: 4,
        color: globalStyles.darkGrey,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    courseInsctructoName: {
        color: globalStyles.darkGrey,
        marginVertical: 5
    },
    coursePrice: {
        color: globalStyles.darkGrey,
        fontSize: 16
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20%",
        paddingHorizontal: 30
    }
})