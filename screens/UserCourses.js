import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { useQuery, useMutation, gql } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import EmptyItem from '../components/EmptyItem'
import globalStyles from '../styles/globalStyles';

const GET_COURSES_FOR_SELL = gql`
 query CoursesForSell($userId: ID!) {
  user(id: $userId) {
    coursesForSell {
      id
      title
      price
      selected 
    }
  }
}
`;

const DELETE_COURSE = gql`
mutation DeleteCourse($input: DeleteCourse!) {
  deleteCourse(input: $input) {
  message
  }
}
`;

const UserCourses = ({ navigation, route }) => {
    const { userId } = route.params

    const { loading: loading, error, data } = useQuery(GET_COURSES_FOR_SELL, {
        variables: { userId },
        pollInterval: 500,
    });

    const [deleteCourse] = useMutation(DELETE_COURSE, {
        refetchQueries: [
            { query: GET_COURSES_FOR_SELL },
        ],
    });

    const [start, setStart] = useState(false);
    const [datas, setDatas] = useState();

    useEffect(() => {
        if (!loading && !error) {
            setStart(true);
        }
        if (data) {
            setDatas(data)
        }
    }, [data, loading, error]);

    if (loading) return <View><EmptyItem text="Chargement..." /></View>
    if (error) return <View><EmptyItem text="Erreur" /></View>
    if (start) {

        const handleDeleteCourse = (courseId) => {
            Alert.alert(
                'Confirmation',
                'Voulez-vous vraiment supprimer ce cours ?',
                [
                    {
                        text: 'Annuler',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmer',
                        onPress: () => {
                            const input = {
                                courseId: courseId,
                                userId: userId,
                            };

                            deleteCourse({
                                variables: { input }
                            })
                                .then((response) => {
                                    const message = response.data.deleteCourse.message;
                                    alert(message);
                                })
                                .catch((error) => {
                                    alert('Erreur : ' + error.message);
                                });
                        },
                    },
                ],
                { cancelable: false }
            );
        }


        const coursesForSell = datas.user.coursesForSell.filter(course => !course.selected);

        if (coursesForSell.length > 0) {
            return (
                <FlatList
                    data={coursesForSell}
                    renderItem={({ item }) => (
                        <View style={styles.courseContainer}>
                            <View style={styles.courseInfo}>
                                <Text numberOfLines={1} style={styles.courseTitle}>{item.title}</Text>
                                <Text style={styles.coursePrice}>{item.price.toFixed(2)} €</Text>
                            </View>
                            <View style={styles.btnIcons}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Edit", {
                                        courseId: item.id
                                    })}
                                    style={styles.touchableIcon}
                                >
                                    <MaterialIcons name="edit" size={24} color={globalStyles.greenLight} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDeleteCourse(item.id)}
                                    style={styles.touchableIcon}
                                >
                                    <MaterialIcons name="delete" size={24} color={globalStyles.red} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                />
            )
        }
        return (
            <EmptyItem text="Pas de formations à afficher " />
        )
    }
}

export default UserCourses

const styles = StyleSheet.create({
    courseContainer: {
        backgroundColor: globalStyles.white,
        borderRadius: 10,
        marginVertical: 9,
        marginHorizontal: 17,
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 9,
        paddingLeft: 9
    },
    courseInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 9,
        paddingHorizontal: 9
    },
    courseTitle: {
        width: "80%"
    },
    coursePrice: {
        color: globalStyles.green,
        fontWeight: "bold"
    },
    btnIcons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    touchableIcon: {
        padding: 9
    }

})