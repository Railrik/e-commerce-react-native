import { REMOVE_FROM_CART } from "../constants";

export const removeFromCart = (courseId) => {
    return {
        type: REMOVE_FROM_CART,
        courseId: courseId
    }
}