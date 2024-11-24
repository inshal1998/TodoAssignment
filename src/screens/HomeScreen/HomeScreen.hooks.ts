import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect, useState} from 'react';
import {fetchTodos, toggleCompleted , deleteTodo} from '../../store/todo-slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProps} from '../../navigation/navigation-types';

const useHomeScreen = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const userTodos = useSelector(
    (state: RootState) => state.todoSlice.userTodos || [],
  );
  const fetchedTodos = useSelector(
    (state: RootState) => state.todoSlice.fetchedTodos || [],
  );
  const todosToDisplay = userTodos.length > 0 ? userTodos : fetchedTodos;

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProps>();

  useEffect(() => {
    setisLoading(true);
    if (userTodos.length === 0) {
      dispatch(fetchTodos());
    }
    setisLoading(false);
  }, [userTodos.length, dispatch]);

  const handleToggle = (id: string) => {
    dispatch(toggleCompleted({id}));
  };

  const navigateToAdd = () => {
    navigation.navigate('AddTodoScreen');
  };

  const removeTodo = (id:string) =>{
    dispatch(deleteTodo({id}))
  }

  return {
    userTodos,
    fetchedTodos,
    todosToDisplay,
    handleToggle,
    navigateToAdd,
    isLoading,
    setisLoading,
    removeTodo
  };
};
export {useHomeScreen};
