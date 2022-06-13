import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        addList: (state, action) => {
            state.todos.push(action.payload);
        },
        updateList: (state, action) => {
            const todo = state.todos.find(item => item.id == action.payload.id);
            todo.title = action.payload.title;
            todo.items = action.payload.items;
            todo.completed = action.payload.completed;
        },
        removeList: (state, action) => {
            return {...state, todos: state.todos.filter(item => item.id !== action.payload)};
        },
    },
});

export const { addList, updateList, removeList } = todosSlice.actions;

export default todosSlice.reducer;