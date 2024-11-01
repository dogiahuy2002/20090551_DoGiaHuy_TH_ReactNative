import { call, put, takeEvery } from 'redux-saga/effects';
import { setTodos, ADD_TODO, UPDATE_TODO, FETCH_TODOS } from './actions';

const API_URL = 'https://66ff34f02b9aac9c997e841a.mockapi.io/api/todo';

function* fetchTodosSaga() {
    const response = yield call(fetch, API_URL);
    const data = yield response.json();
    yield put(setTodos(data));
}

function* addTodoSaga(action) {
    yield call(fetch, API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: action.payload }),
    });
    yield fetchTodosSaga();
}

function* updateTodoSaga(action) {
    yield call(fetch, `${API_URL}/${action.payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: action.payload.name }),
    });
    yield fetchTodosSaga();
}

export default function* rootSaga() {
    yield takeEvery(FETCH_TODOS, fetchTodosSaga);
    yield takeEvery(ADD_TODO, addTodoSaga);
    yield takeEvery(UPDATE_TODO, updateTodoSaga);
}