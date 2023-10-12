import { configureStore } from '@reduxjs/toolkit';
import reducerCourses from './reducers/reducerCourses';

const rootReducer = {
    courses: reducerCourses
};

const store = configureStore({
    reducer: rootReducer
});

export default store;
