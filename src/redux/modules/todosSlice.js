import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    
    await waitTwoSeconds()

    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (id, thunkAPI) => {
    
    await waitTwoSeconds()

    return id;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      state.list = state.list.filter((todo) => todo.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    //extraReducers 사용: reducers에서 바로구현되지 않는 기타 Reducer로직을 구현
    // try catch로도 가능한가?
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.list = state.list.filter((todo) => todo.id !== idToDelete);
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
