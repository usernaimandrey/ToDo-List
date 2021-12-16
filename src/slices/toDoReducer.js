import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
    ids: [],
    entities: {},
    activeFilter: 'all',
};

const tasksAdapter = createEntityAdapter(); 

export const toDoSlice =  createSlice({
    name: 'todo',
    initialState,

    reducers: {
        addTask: tasksAdapter.addOne,
        removeTask: tasksAdapter.removeOne,
        changeState: tasksAdapter.updateOne,
        filtered: produce((draft, { payload: { filter } }) => {
            draft.activeFilter = filter;
        }),
    },
});

export const selectors = tasksAdapter.getSelectors((state) => state.toDo);
export const { addTask, removeTask, changeState, filtered } = toDoSlice.actions;

export default toDoSlice.reducer;