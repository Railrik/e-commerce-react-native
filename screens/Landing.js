import { FlatList, View } from 'react-native'
import { useQuery, useMutation, gql } from '@apollo/client';
import CourseItem from '../components/CourseItem';
import EmptyItem from '../components/EmptyItem';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      image
      price
      selected
      instructorId
      instructor {
      name
    }
    }
  }
`;

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

const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      userId
      cartItems {
        courseId
        quantity
        coursePrice
      }
    }
  }
`;

const Landing = ({ navigation, route }) => {
  const { userId } = route.params
  const { loading, error, data } = useQuery(GET_COURSES, {
    pollInterval: 500,
  });

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    variables: { userId },
    pollInterval: 500,
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      { query: GET_COURSES },
    ],
  });

  if (loading) {
    return <View><EmptyItem text="Chargement..." /></View>
  } else if (error) {
    return <View><EmptyItem text="Erreur" /></View>
  } else {

    const handleAddToCart = (course) => {

      const input = {
        userId: parseInt(userData.user.id, 10),
        cartItems: [
          {
            courseId: parseInt(course.id, 10),
            quantity: 1,
            coursePrice: parseFloat(course.price),
          },
        ],
      };

      addToCart({
        variables: { input }
      })
        .then((response) => {
          alert('Article ajouté au panier');
        })
        .catch((error) => {
          alert('Erreur lors de l\'ajout au panier : ' + error.message);
        });
    };
    let coursesInCart = []

    if (userData.user.cart) {
      coursesInCart = userData.user.cart.cartItems;
    }

    const allCourses = data.courses;

    //retourne tout les cours sauf ceux dans le panier et ceux si selected === false
    const coursesToDisplay = allCourses.filter(course => {
      return !coursesInCart.some(cartCourse => cartCourse.course.id === course.id) && !course.selected;
    });

    if (coursesToDisplay.length) {
      return (
        <FlatList
          data={coursesToDisplay}
          renderItem={({ item }) => (
            <CourseItem
              image={item.image}
              instructorName={item.instructor.name}
              userId={userId}
              instructorId={item.instructorId}
              title={item.title}
              price={item.price}
              viewDetails={() => navigation.navigate('Details', {
                courseId: item.id,
                title: item.title,
                userId: userId,
                instructorId: item.instructorId
              })}
              edit={() => navigation.navigate('UserNavigator', {
                courseId: item.id,
              })}
              onAddToCart={() => handleAddToCart(item)}
            >
            </CourseItem>
          )}
        />
      )
    }
    return <EmptyItem text="Pas de cours à afficher" />
  }
}

export default Landing;