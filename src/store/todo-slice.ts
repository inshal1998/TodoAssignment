import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_API_CONFIG} from '../utils/api-config';
import { generateUniqueId } from '../utils/constants';

export interface UserTodo {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  completedDate: string;
  createdAt: string;
}

export interface FetchedTodo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  userTodos: UserTodo[];
  fetchedTodos: FetchedTodo[];
  selectedTodo:UserTodo | null;
  isLoading: boolean;
  error: string;
}

const initialTodoState: TodoState = {
  userTodos: [],
  fetchedTodos: [],
  isLoading: false,
  error: '',
  selectedTodo:null
};

export const fetchTodos = createAsyncThunk('fetchedTodos', async () => {
  const response = await fetch(DEFAULT_API_CONFIG.base_url);
  const data: FetchedTodo[] = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodoState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) => {
      const userTodo: UserTodo = {
        title: action.payload.title,
        description: action.payload.description,
        id: generateUniqueId(),
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
        completedDate: '',
      };
      state.userTodos.push(userTodo);
    },

    toggleCompleted: (state, action: PayloadAction<{id: string}>) => {
      state.userTodos.find(todo => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
          todo.completedDate = todo.completedDate
            ? new Date().toISOString().split('T')[0]
            : '';
        }
      });
    },

    getSelectedTodo : (state , action:PayloadAction<{id:string}>) =>{
      const selectedTodo = state.userTodos.find(
        (todo) => todo.id === action.payload.id
      );
      state.selectedTodo = selectedTodo || null
    },

    updateTodo: (state , action: PayloadAction<{todo:UserTodo}>) =>{
      state.userTodos.find((todo)=>{
        todo.completed=action.payload.todo.completed,
        todo.id=action.payload.todo.id,
        todo.createdAt=action.payload.todo.createdAt,
        todo.title=action.payload.todo.title,
        todo.description=action.payload.todo.description,
        todo.completedDate=action.payload.todo.completedDate
      })
    },

    deleteTodo: (state, action: PayloadAction<{id: string}>) => {
      const selectedTodo = state.userTodos.findIndex(
        todo => todo.id === action.payload.id,
      );
      state.userTodos.splice(selectedTodo, 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.fetchedTodos = actions.payload;
      })
      .addCase(fetchTodos.rejected, (state, actions) => {
        state.error = actions.error.message || 'Something Went Wrong';
      });
  },
});

export const {addTodo, toggleCompleted, deleteTodo, updateTodo ,getSelectedTodo} = todoSlice.actions;
export default todoSlice.reducer;
