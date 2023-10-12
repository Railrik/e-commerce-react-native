import { configureStore } from '@reduxjs/toolkit';
import reducerCourses from './reducers/reducerCourses';
import reducerCart from './reducers/reducerCart';

const rootReducer = {
    courses: reducerCourses,
    cart: reducerCart
};

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
});

export default store;
