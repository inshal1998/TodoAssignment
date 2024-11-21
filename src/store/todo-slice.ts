import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

export interface Todo {
  id: string;
  name: string;
  frequency: string;
  completeAt: string;
  createdAt: string;
  isCompleted: boolean;
}

interface TodoState {
  todo: Todo[];
  isLoading: boolean;
  error: string;
}

const initialHabitState: TodoState = {
  todo: [],
  error: '',
  isLoading: false,
};

export const fetchItemById = createAsyncThunk('todo', () => {
  return fetch('https://dummyjson.com/products').then(res =>
    res.json().then(data => data),
  );
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialHabitState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{name: string; frequency: string}>,
    ) => {
      const newHabit: Todo = {
        name: action.payload.name,
        frequency: action.payload.frequency,
        id: Date.now().toString(),
        completeAt: '',
        createdAt: new Date().toISOString(),
        isCompleted: false,
      };
      state.todo.push(newHabit);
    },

    toggleCompleted: (state, action: PayloadAction<{id: string}>) => {
      state.todo.find(habit => {
        if (habit.id === action.payload.id) {
          habit.isCompleted = !habit.isCompleted;
          habit.completeAt = habit.isCompleted
            ? new Date().toISOString().split('T')[0]
            : '';
        }
      });
    },

    deleteTodo: (state, action: PayloadAction<{id: string}>) => {
      const selectedHabit = state.todo.findIndex(
        habit => habit.id === action.payload.id,
      );
      state.todo.splice(selectedHabit, 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItemById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchItemById.fulfilled, (state, actions) => {
        state.isLoading = false;
        Alert.alert(JSON.stringify(actions.payload, undefined, 4));
      })
      .addCase(fetchItemById.rejected, (state, actions) => {
        state.error = actions.error.message || 'Something Went Wrong';
      });
  },
});

export const {addTodo, toggleCompleted, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
