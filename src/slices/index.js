import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './toDoReducer';
import comentReducer from './comentReducer';

export default configureStore({
    reducer: {
        toDo: toDoReducer,
        comment: comentReducer,
    },
});