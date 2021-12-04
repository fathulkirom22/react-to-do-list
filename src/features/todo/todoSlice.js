import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTodo } from './todoAPI'

const initialState = {
  data: [],
  status: 'idle',
  increment: 0,
};


export const getTodo = createAsyncThunk(
  'todo/getTodo',
  async () => {
    const res = await fetchTodo()
    return res
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    deleteByID: (state, action) => {
      state.data = state.data.filter(elm => elm.id !== action.payload)
    },
    create: (state, action) =>{
      let tmp = {
        ...action.payload,
        id: state.increment,
        createdAt: Date()
      }
      state.data.push(tmp)
      state.increment += 1
    },
    edit: (state, action) => {
      state.data = state.data.map(elm => elm.id === action.payload.id ? action.payload : elm)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = 'idel'
        state.data = action.payload
        state.increment = action.payload.length + 1
      })
  }
})

export const selectData = (state) => state.todo.data
export const selectTodoFinish = (state) => state.todo.data.filter(elm => elm.status === 1)
export const selectTodoUnfinish = (state) => state.todo.data.filter(elm => elm.status === 0)
export const selectStatus = (state) => state.todo.status

export const { deleteByID, create, edit } = todoSlice.actions;

export default todoSlice.reducer