import {combineReducers} from '@reduxjs/toolkit';
import todoSlice from './todo-slice';

const rootReducer = combineReducers({
  todoSlice
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;
