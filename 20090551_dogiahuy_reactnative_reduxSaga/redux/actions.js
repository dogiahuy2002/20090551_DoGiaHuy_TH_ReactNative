export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SET_TODOS = 'SET_TODOS';

export const fetchTodos = () => ({ type: FETCH_TODOS });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const updateTodo = (id, name) => ({ type: UPDATE_TODO, payload: { id, name } });
export const setTodos = (todos) => ({ type: SET_TODOS, payload: todos });