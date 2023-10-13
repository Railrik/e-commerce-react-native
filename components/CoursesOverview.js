import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/globalStyles';

const CoursesOverview = (props) => {
    return (
        <View style={styles.courseContainer}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price.toFixed(2)} €</Text>
        </View>
    )
}

export default CoursesOverview

const styles = StyleSheet.create({
    courseContainer: {
        backgroundColor: globalStyles.white,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 9
    },
    title: {
        width: "70%"
    },
    price: {
        color: globalStyles.darkGrey,
        fontWeight: "bold"
    }
})