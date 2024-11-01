import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTodos(state, action) {
      state.items = action.payload;
    },
    addTodo(state, action) {
      state.items.push(action.payload);
    },
    updateTodo(state, action) {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeTodo(state, action) {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setLoading, setTodos, addTodo, updateTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
