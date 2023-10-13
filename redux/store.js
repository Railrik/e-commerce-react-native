import { configureStore } from '@reduxjs/toolkit';
import reducerCourses from './reducers/reducerCourses';
import reducerCart from './reducers/reducerCart';
import reducerPayment from './reducers/reducerPayment';

const rootReducer = {
    courses: reducerCourses,
    cart: reducerCart,
    payments: reducerPayment,
};

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
});

export default store;
