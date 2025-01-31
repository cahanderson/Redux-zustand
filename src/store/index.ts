import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todo',
    initialState: ['Fazer cafe', 'Estudar Redux', 'Estudar Redux Toolkit'],

    reducers: { 
        add: (state, action) => {
            state.push(action.payload.newTodo);
        }
    }
});

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    },
});

export const { add } = todoSlice.actions;