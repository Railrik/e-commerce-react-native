import CartCourse from "../../data/CartCourseModel"
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_PAYMENT } from "../constants";

const initialState = {
    cartCourses: [],
    total: 0
}

const reducerCart = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const course = action.course;
            const idCourse = course.id;
            const price = course.price;
            const title = course.title;

            const newCourse = new CartCourse(idCourse, price, title);
            const serializedCourse = JSON.stringify(newCourse);

            return {
                ...state,
                cartCourses: state.cartCourses.concat(serializedCourse),
                total: state.total + price
            }

        case REMOVE_FROM_CART:
            const courseId = action.courseId;
            const indexResult = state.cartCourses.findIndex(course => JSON.parse(course).id === courseId);
            if (indexResult !== -1) {
                const coursePrice = JSON.parse(state.cartCourses[indexResult]).price;
                const newCartCoursesArray = [...state.cartCourses];
                newCartCoursesArray.splice(indexResult, 1);

                return {
                    ...state,
                    cartCourses: newCartCoursesArray,
                    total: state.total - coursePrice
                };
            }

        case ADD_PAYMENT:
            return initialState;

        default:
            return state;
    }
}

export default reducerCart;