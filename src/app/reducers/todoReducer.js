import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTodo.fulfilled.type, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(postTodo.fulfilled.type, (state, action) => {
      state.todos.unshift(action.payload);
    });
    builder.addCase(deleteTodo.fulfilled.type, (state, action) => {
      state.todos = state.todos.filter(
        (item) => item._id !== action.payload._id
      );
    });
    builder.addCase(patchTodo.fulfilled.type, (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item._id === action.payload._id) {
          item.completed = !item.completed;
        }
        return item;
      });
    });
  },
});

export const getTodo = createAsyncThunk("todos/get", async (_, thunkApi) => {
  try {
    const response = await axios.get("http://localhost:5050/todos");
    return thunkApi.fulfillWithValue(response.data);
  } catch (error) {
    console.log(`getTodo: ${error}`);
  }
});

export const postTodo = createAsyncThunk(
  "todos/post",
  async (value, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:5050/todos", {
        text: value,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(`postTodo: ${error}`);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`http://localhost:5050/todos/${id}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(`deleteTodo: ${error}`);
    }
  }
);

export const patchTodo = createAsyncThunk(
  "todos/patch",
  async ({id, completed}, thunkApi) => {
    try {
      const response = await axios.patch(`http://localhost:5050/todos/${id}`, {
        completed: !completed
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(`patchTodo: ${error}`);
    }
  }
);

export default todoSlice.reducer;
