import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeTask } from './toDoReducer';

const commentAdapter = createEntityAdapter();
const initialState = commentAdapter.getInitialState();


export const commentSlice = createSlice({
    name: 'comment',
    initialState,

    reducers: {
        addComment: commentAdapter.addOne,
    },

    extraReducers: (builder) => {
        builder.addCase(removeTask, (state, { payload }) => {
            const newEntities = Object.keys(state.entities)
            .reduce((acc, el) => {
                if (state.entities[el].idTask !== payload) {
                    return { [el]: state.entities[el], ...acc };
                } else {
                    return acc;
                }
            }, {});
            commentAdapter.setAll(state, newEntities);
        })
    }
});

export const commentSelectors = commentAdapter.getSelectors((state) => state.comment);
export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;