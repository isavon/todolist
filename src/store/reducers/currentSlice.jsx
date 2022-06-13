import { createSlice } from '@reduxjs/toolkit';

const initState = {
    id: null,
    title: 'Name of List',
    displayAddTodo: true,
    todos: [],
    completed: [],
};

export const currentSlice = createSlice({
    name: 'current',
    initialState: initState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDisplayAddTodo: (state, action) => {
            state.displayAddTodo = action.payload;
        },
        addTodos: (state, action) => {
            state.todos.push({
                id: new Date().toISOString(),
                label: action.payload,
            });
        },
        updateTodoLabel: (state, action) => {
            state.todos.map(item => {
                if (item.id == action.payload.id) {
                    item.label = action.payload.value
                }
            });
        },
        removeTodo: (state, action) => {
            return {...state, todos: state.todos.filter(item => item.id !== action.payload)};
        },
        addCompleted: (state, action) => {
            state.completed.push({
                id: new Date().toISOString(),
                label: action.payload,
            });
        },
        updateCompletedLabel: (state, action) => {
            state.completed.map(item => {
                if (item.id == action.payload.id) {
                    item.label = action.payload.value
                }
            });
        },
        removeCompleted: (state, action) => {
            return {...state, completed: state.completed.filter(item => item.id !== action.payload)};
        },
        setCurrent: (state, action) => {
            return {
                id: action.payload.id,
                title: action.payload.title,
                displayAddTodo: initState.displayAddTodo,
                todos: action.payload.items,
                completed: action.payload.completed,
            };
        },
        clearCurrent: () => {
            return initState;
        },
    },
});

export const { 
    setTitle,
    setDisplayAddTodo, 
    addTodos, 
    updateTodoLabel, 
    removeTodo, 
    addCompleted, 
    updateCompletedLabel,
    removeCompleted,
    setCurrent,
    clearCurrent,
} = currentSlice.actions;

export default currentSlice.reducer;