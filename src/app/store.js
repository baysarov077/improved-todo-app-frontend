import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducer";

const rootReducer = combineReducers({
  todos: todoReducer
})

export const store = configureStore({
  reducer: rootReducer
})