import { Text, View } from 'react-native'

const CourseDetails = ({ route }) => {

    const courseId = route.params.courseId;

    return (
        <View>
            <Text>Cours: {courseId}</Text>
        </View>
    )
}

export default CourseDetails;