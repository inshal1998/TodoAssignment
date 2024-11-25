import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { UserTodo, updateTodo, toggleCompleted } from '../../store/todo-slice';
import { useEffect, useState } from 'react';

const useTodoDetail = (id: string) => {
  const initialTodo = useSelector(
    (state: RootState) =>
      state.todoSlice.userTodos.find((todo) => todo.id === id) || ({} as UserTodo)
  );

  const [localTodoDetail, setLocalTodoDetail] = useState<UserTodo>(initialTodo);
  const [errors, setErrors] = useState({ title: '', description: '' });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (initialTodo.id !== localTodoDetail.id) {
      setLocalTodoDetail(initialTodo);
    }
  }, [initialTodo, localTodoDetail.id]);

  const updateField = (key: keyof UserTodo, value: string | boolean) => {
    setLocalTodoDetail((prev) => ({
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

    if (!localTodoDetail.title.trim()) {
      newErrors.title = 'Title is required.';
    }

    if (!localTodoDetail.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const updateDetail = (onSuccess?: () => void) => {
    if (validate()) {
      dispatch(updateTodo({ todo: localTodoDetail }));
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handleClose = (onClose: () => void) => {
    setLocalTodoDetail(initialTodo); 
    onClose();
  };

  const markCompleted = () => {
    setLocalTodoDetail((prev) => ({
      ...prev,
      completed: !prev.completed,
      completedDate:new Date().toISOString().split('T')[0]
    }));
    dispatch(updateTodo({todo:localTodoDetail}));
    
  };

  return {
    localTodoDetail,
    updateField,
    updateDetail,
    handleClose,
    errors,
    markCompleted,
  };
};

export { useTodoDetail };
