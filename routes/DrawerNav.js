import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useQuery, gql } from '@apollo/client';
import { CoursesNavigator } from './CoursesStackNav';
import { CartNavigator } from './CartStackNav';
import { PaymentsNavigator } from './PaymentsStackNav';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfilNavigator } from './ProfileStackNav';
import { View } from 'react-native';
import { UserNavigator } from './UserStackNav';
import EmptyItem from '../components/EmptyItem';

const Drawer = createDrawerNavigator();

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

export const DrawerNavigator = () => {
    const userId = 3
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userId },
        pollInterval: 500,
    });
    const [start, setStart] = useState(false);
    const [userDatas, setUserDatas] = useState();

    useEffect(() => {
        if (!loading && !error) {
            setStart(true);
            if (data) {
                setUserDatas(data)
            }
        }
    }, [data, loading, error]);

    if (loading) return <View><EmptyItem text="Chargement..." /></View>
    if (error) return <View><EmptyItem text="Erreur" /></View>
    if (start) {
        return (
            <Drawer.Navigator>
                <Drawer.Screen
                    name="Home"
                    component={CoursesNavigator}
                    initialParams={
                        {
                            userId: userId
                        }
                    }
                    options={{
                        title: "Catalogue",
                        headerShown: false,
                        drawerIcon: () => <MaterialIcons name="book" size={24} color="black" />
                    }}
                />
                <Drawer.Screen
                    name="CartNavigator"
                    component={CartNavigator}
                    initialParams={
                        {
                            userId: userId
                        }
                    }
                    options={{
                        title: "Panier",
                        headerShown: false,
                        drawerIcon: () => <MaterialIcons name="shopping-cart" size={24} color="black" />
                    }}
                />
                <Drawer.Screen
                    name="PaymentsNavigator"
                    component={PaymentsNavigator}
                    initialParams={
                        {
                            userId: userId
                        }
                    }
                    options={{
                        title: "Formations achetées",
                        headerShown: false,
                        drawerIcon: () => <MaterialIcons name="credit-card" size={24} color="black" />
                    }}
                />

                <Drawer.Screen
                    name="UserNavigator"
                    component={UserNavigator}
                    initialParams={
                        {
                            userId: userId
                        }
                    }
                    options={{
                        title: "Formations en vente",
                        headerShown: false,
                        drawerIcon: () => <MaterialIcons name="ad-units" size={24} color="black" />
                    }}
                />

                <Drawer.Screen
                    name="ProfilNavigator"
                    component={ProfilNavigator}
                    initialParams={
                        {
                            userId: userId
                        }
                    }
                    options={{
                        title: `${userDatas.user.name}`,
                        headerShown: false,
                        drawerIcon: () => <MaterialIcons name="account-circle" size={24} color="black" />
                    }}
                />
            </Drawer.Navigator>
        )
    }
}