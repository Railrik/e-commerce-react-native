export const typeDefs = `#graphql
type Cart {
  id: ID!
  userId:Int!
  # user: User!
  cartItems: [CartItem]
}

type CartItem {
  id: ID!
 course: Course
  courseId:Int!
  quantity: Int!
  cartId:Int!
  # cart: Cart!
  coursePrice: Float!
}

type Course {
  id: ID!
  title: String!
  description:String!
  image:String!
  price:Float!
  selected:Boolean!
  instructorId:Int!
  instructor: User!
}

type PurchasedCourse {
  id: ID!
  userId: Int!
  courseId: Int!
  price: Float!
  purchaseDate: String!
  courses: [Course]
}

type User {
  id: ID!
  email: String!
  name: String!
  coursesForSell: [Course]
  cart: Cart
  purchasedCourses: [PurchasedCourse]
}

type Query {
    users: [User]
     user(id: ID!) : User
     courses: [Course]
     course(id: ID!) : Course
    # carts: [Cart]
    # cart(id: ID!) : Cart
    # cartItems: [CartItem]
    # cartItem(id: ID!): CartItem
    # purchasedCourses: [PurchasedCourse]
    # purchasedCourse(id: ID!): PurchasedCourse
  }

  type Mutation {
  addToCart(input: AddToCartInput!): Cart
  removeFromCart(input: RemoveFromCartInput!): Cart
  addCartItemsToUserCourse(input: AddCartItemsToUserCourseInput!): UserCourseUpdateResponse
  deleteCourse(input: DeleteCourse!): CourseDeleteResponse
}

input AddToCartInput {
  userId: Int!
  cartItems: [CartItemInput!]!
}

input CartItemInput {
  courseId: Int!
  quantity: Int!
  coursePrice: Float!
}

input RemoveFromCartInput {
  userId: Int!
  cartItems: [CartItemInputRemove!]!
}

input CartItemInputRemove {
  courseId: Int!
  quantity: Int!
}

input AddCartItemsToUserCourseInput {
  userId: Int!
  cartId:Int!
}

type UserCourseUpdateResponse {
  success: Boolean!
  message: String
}

input DeleteCourse{
  userId:ID!
  courseId: ID!
}

type CourseDeleteResponse{
  success: Boolean!
  message: String
}
`