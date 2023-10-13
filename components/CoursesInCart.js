import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalStyles from '../styles/globalStyles'
import { MaterialIcons } from '@expo/vector-icons';


const CoursesInCart = (props) => {
    return (
        <View style={styles.coursesContainer}>
            <Text numberOfLines={1} style={styles.coursesTitle}>{props.title}</Text>
            <Text style={styles.coursesPrice}>{props.price.toFixed(2)} €</Text>
            <TouchableOpacity
                onPress={props.onDelete}
            >
                <MaterialIcons name="delete" size={24} color={globalStyles.green} />
            </TouchableOpacity>
        </View>
    )
}

export default CoursesInCart

const styles = StyleSheet.create({

    coursesContainer: {
        backgroundColor: globalStyles.white,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 9
    },
    coursesTitle: {
        width: "60%"
    },
    coursesPrice: {
        textAlign: "right",
        paddingRight: 9,
        width: "30%"
    }

})