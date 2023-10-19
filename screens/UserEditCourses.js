import { Text, View } from 'react-native'
import React from 'react'

const UserEditCourses = ({ route }) => {
    const { userId, courseId } = route.params

    return (
        <View>
            <Text>{courseId ? 'Editer la formation' : 'Créer une formation'}</Text>
        </View>
    )
}

export default UserEditCourses

