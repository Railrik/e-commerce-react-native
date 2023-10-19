import { FlatList, View } from 'react-native'
import { useQuery, gql } from '@apollo/client';
import EmptyItem from '../components/EmptyItem';
import PaidItems from '../components/PaidItems';

const GET_PURCHASED_COURSES = gql`
query GetPurchasedCourses($userId: ID!) {
  user(id: $userId) {
    purchasedCourses {
      purchaseDate
      price
      courses {
        id
        title
      }
    }
  }
}
`;

const PaymentsHistory = ({ route }) => {
    const { userId } = route.params;
    const { loading, error, data: datas } = useQuery(GET_PURCHASED_COURSES, {
        variables: { userId },
        pollInterval: 500,
    });
    if (loading) {
        return <View><EmptyItem text="Chargement..." /></View>
    } else if (error) {
        return <View><EmptyItem text="Erreur" /></View>
    } else {
        const purchasedCourses = datas.user.purchasedCourses;
        if (purchasedCourses.length > 0) {
            return (
                <FlatList
                    data={purchasedCourses}
                    renderItem={({ item }) => (
                        <PaidItems
                            // totalPrice={item.total}
                            // date={item.date}
                            courseDetails={item}
                        ></PaidItems>
                    )}
                />
            )
        }
        return <EmptyItem text="Pas d'achats" />
    }
}

export default PaymentsHistory;

