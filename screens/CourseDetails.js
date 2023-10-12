import { useEffect } from 'react';
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux';

const CourseDetails = ({ navigation, route }) => {

    const courseId = route.params.courseId;
    const selectedCourse = useSelector(state => state.courses.existingCourses.find(course => course.id === courseId));
    console.log(selectedCourse);
    // useEffect(() => {
    //     navigation.setOptions({
    //         title: selectedCourse.title
    //     })
    // }, [navigation])

    return (
        <View>
            <Text>Cours: {courseId}</Text>
        </View>
    )
}

export default CourseDetails;