import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { UserTodo, updateTodo, toggleCompleted } from '../../store/todo-slice';
import { useEffect, useState } from 'react';

const useTodoDetail = (id: string) => {
  const initialTodo = useSelector(
    (state: RootState) => state.todoSlice.userTodos.find(todo => todo.id === id) || {} as UserTodo
  );

  const [todoDetail, setTodoDetail] = useState<UserTodo>(initialTodo);
  const [errors, setErrors] = useState({ title: '', description: '' });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTodoDetail(initialTodo);
  }, [initialTodo]);

  const updateField = (key: keyof UserTodo, value: string | boolean) => {
    setTodoDetail((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'title' || key === 'description') {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { title: string; description: string } = {
      title: '',
      description: '',
    };

    if (!todoDetail.title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (!todoDetail.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const updateDetail = (onSuccess?: () => void) => {
    if (validate()) {
      dispatch(updateTodo({ todo: todoDetail }));
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const markCompleted = (id: string) => {
    dispatch(toggleCompleted({ id }));
  };

  return {
    todoDetail,
    updateField,
    updateDetail,
    errors,
    markCompleted,
    initialTodo,  // Include initialTodo so we can reset it when needed
  };
};

export { useTodoDetail };
