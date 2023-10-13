import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CoursesOverview from './CoursesOverview';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import globalStyles from '../styles/globalStyles';


const PaidItems = ({ totalPrice, date, courseDetails }) => {
    const [isShowing, setIsShowing] = useState(false);

    const handleShow = () => {
        setIsShowing(prevState => !prevState)
    }

    const courses = courseDetails.courses.map(course => JSON.parse(course));

    return (
        <ScrollView style={styles.paidCourseContainer}>
            <View style={styles.paidCourse}>
                <Text style={styles.totalPaid}>
                    {totalPrice.toFixed(2)} €
                </Text>
                <Text style={styles.date}>
                    {date}
                </Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <AntDesign
                        name={isShowing ? "minuscircleo" : "pluscircleo"}
                        size={24}
                        color={isShowing ? globalStyles.orange : globalStyles.green}
                        onPress={handleShow}
                    />
                </TouchableOpacity>
            </View>
            {
                isShowing && (
                    <View style={styles.detailPaidCourse}>
                        {
                            courses.map(course => (
                                <CoursesOverview
                                    key={course.id}
                                    title={course.title}
                                    price={course.price}
                                />
                            ))
                        }
                    </View>
                )
            }
            {/* <Text>{courseDetails}</Text> */}
        </ScrollView>
    )
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