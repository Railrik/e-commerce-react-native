import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../styles/globalStyles'

const CourseItem = ({ image, title, price }) => {
    return (
        <View style={styles.coursesContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: image }} />
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
    }
})