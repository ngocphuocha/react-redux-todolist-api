import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk
export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
});

export const addTodos = createAsyncThunk("todos/todoAdded", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  return newTodo;
});

export const deleteTodo = createAsyncThunk(
  "todos/todoDeleted",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },
  reducers: {
    // addTodo: {
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },

    markComplete(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
  },

  extraReducers: {
    // Get all todos
    [getTodos.pending]: (state, action) => {
      console.log("Fetching todos from backend ...");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("Done get all todos");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      alert("Failed to get todos!");
    },

    // Add todo
    [addTodos.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },

    // Delete todo
    [deleteTodo.fulfilled]: (state, action) => {
      const todoId = action.payload;
      console.log("delete ok");
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
  },
});

// Async action creator, action and reducer dispath

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// Action export
export const { markComplete, todosFetched } = todosSlice.actions;

// Reducer
export const todosReducer = todosSlice.reducer;
