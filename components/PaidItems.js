import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CoursesOverview from './CoursesOverview';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import globalStyles from '../styles/globalStyles';

const PaidItems = ({ courseDetails }) => {
    const [isShowing, setIsShowing] = useState(false);

    const handleShow = () => {
        setIsShowing(prevState => !prevState);
    }
    const totalPrice = courseDetails.price.toFixed(2); // Prix total
    const date = courseDetails.purchaseDate

    return (
        <ScrollView style={styles.paidCourseContainer}>
            <View style={styles.paidCourse}>
                <Text style={styles.totalPaid}>
                    {totalPrice} €
                </Text>
                <Text style={styles.date}>
                    {date}
                </Text>
                <TouchableOpacity style={styles.iconBtn} onPress={handleShow}>
                    <AntDesign
                        name={isShowing ? "minuscircleo" : "pluscircleo"}
                        size={24}
                        color={isShowing ? globalStyles.orange : globalStyles.green}
                    />
                </TouchableOpacity>
            </View>
            {isShowing && (
                <View style={styles.detailPaidCourse}>
                    {courseDetails.courses.map(course => (
                        <CoursesOverview
                            key={course.id}
                            title={course.title}
                            price={courseDetails.price.toFixed(2)}
                        />
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

export default PaidItems;

const styles = StyleSheet.create({
    paidCourseContainer: {
        backgroundColor: globalStyles.white,
        borderRadius: 10,
        margin: 20,
        padding: 15,
    },
    paidCourse: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    totalPaid: {
        fontSize: 18
    },
    date: {
        fontSize: 15
    },
    detailPaidCourse: {
        marginTop: 20,
        borderTopColor: globalStyles.green,
        borderTopWidth: 1
    }
})