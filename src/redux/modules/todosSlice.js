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
    // extraReducers를 주석 처리하고 나면, 비동기 액션인 __addToDo 및 __deleteTodo의 성공 (fulfilled) 및 실패 (rejected) 케이스에 대한 상태 업데이트 로직이 
    // 제거되므로 해당 비동기 액션의 성공 또는 실패 결과가 제대로 처리되지 않게됨
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
