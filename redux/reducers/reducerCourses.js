import COURSES from '../../data/testData';
import { ADD_TO_CART } from "../constants";

const initialState = {
    existingCourses: COURSES
};

const reducerCourses = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const indexCourseToModify = state.existingCourses.findIndex(course => course.id === action.course.id);

            if (indexCourseToModify !== -1) {
                const updatedExistingCourses = [
                    ...state.existingCourses.slice(0, indexCourseToModify),
                    { ...state.existingCourses[indexCourseToModify], selected: true },
                    ...state.existingCourses.slice(indexCourseToModify + 1)
                ];

                return {
                    ...state,
                    existingCourses: updatedExistingCourses
                };
            }

            return state;

        default:
            return state;
    }
};

export default reducerCourses;
