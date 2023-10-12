import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/globalStyles'

const CourseItem = ({ image, title, price }) => {
    return (
        <View style={styles.coursesContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: image }} />
            </View>
            <View style={styles.courseContainerDetails}>
                <Text style={styles.courseTitle}>{title}</Text>
                <Text style={styles.coursePrice}>{price.toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default CourseItem

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
        borderTopRightRadius: 10
    },
    courseContainerDetails: {
        alignItems: "center",
        height: "20%",
        padding: 10
    },
    courseTitle: {
        fontSize: 18,
        marginVertical: 4,
        color: globalStyles.green,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    coursePrice: {
        color: globalStyles.darkGrey,
        fontSize: 16
    }
})