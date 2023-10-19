import { View, Text, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client';
import globalStyles from '../styles/globalStyles';
import EmptyItem from '../components/EmptyItem'

const GET_USER = gql`
 query GetUser($userId: ID!) {
    user(id: $userId) {
    id
    email
    name
    cart {
      id
      cartItems {
        coursePrice
        quantity
        course {
          title
          id
        }
      }
    }
  }
  }
`;

const Profile = ({ navigation, route }) => {
  const { userId } = route.params;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
    pollInterval: 500,
  });

  if (loading) return <View><EmptyItem text="Chargement..." /></View>
  if (error) return <View><EmptyItem text="Erreur" /></View>

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Prénom : {data.user.name}</Text>
      <Text>Email : {data.user.email}</Text>
    </View>
  )

}

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  nameText: {
    fontSize: 20,
    color: globalStyles.green
  }


})