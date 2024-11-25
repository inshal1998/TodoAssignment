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

interface TodoState {
  userTodos: UserTodo[];
  fetchedTodos: UserTodo[];
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
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();

  return data.map((item: UserTodo) => ({
    id: generateUniqueId(),
    title: item.title ?? 'Untitled',
    description: item.description ?? '', 
    completeDate: item.completedDate ?? '', 
    createdAt: new Date().toISOString().split("T")[0], 
    completed: false,
  }));
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

    getSelectedTodo: (state, action: PayloadAction<{id: string}>) => {
      const selectedTodo = state.userTodos.find(
        todo => todo.id === action.payload.id,
      );
      state.selectedTodo = selectedTodo || null;
    },

    updateTodo: (state, action: PayloadAction<{todo: UserTodo}>) => {
      const updatedTodo = action.payload.todo;
      const todoIndex = state.userTodos.findIndex(
        todo => todo.id === updatedTodo.id,
      );
      if (todoIndex !== -1) {
        state.userTodos[todoIndex] = action.payload.todo;
      }
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
