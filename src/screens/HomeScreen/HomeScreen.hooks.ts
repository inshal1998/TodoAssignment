import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect, useState} from 'react';
import {
  fetchTodos,
  toggleCompleted,
  deleteTodo,
  UserTodo,
} from '../../store/todo-slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProps} from '../../navigation/navigation-types';
import {Alert} from 'react-native';

const useHomeScreen = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [selectedTodo, setselectedTodo] = useState<UserTodo>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    'latest' | 'title' | 'completed' | null
  >(null);
  const [todoToDisplay, settodoToDisplay] = useState<UserTodo[]>([]);
  const userTodos = useSelector(
    (state: RootState) => state.todoSlice.userTodos || [],
  );
  const fetchedTodos = useSelector(
    (state: RootState) => state.todoSlice.fetchedTodos || [],
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProps>();

  const onSearch = (text: string) => {
    setSearchText(text);
    const filteredTodos = (
      userTodos.length > 0 ? userTodos : fetchedTodos
    ).filter(todo => todo.title.toLowerCase().includes(text.toLowerCase()));
    settodoToDisplay(filteredTodos);
  };

  const sortTodos = (filter: 'title' | 'completed' | 'latest') => {
    let sortedTodos = [...todoToDisplay];
    if (filter === 'title') {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === 'completed') {
      sortedTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
    } else if (filter === 'latest') {
      sortedTodos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    settodoToDisplay(sortedTodos);
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const initialTodos = userTodos.length > 0 ? userTodos : fetchedTodos;
    settodoToDisplay(initialTodos);
  }, [userTodos, fetchedTodos]);

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

  const removeTodo = (id: string) => {
    Alert.alert('Delete Todo', 'Are you Sure You Want To Remove!!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(deleteTodo({id}))},
    ]);
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const onSelectedItem = (item: UserTodo) => {
    setselectedTodo(item);
    toggleModal();
  };

  return {
    userTodos,
    fetchedTodos,
    todoToDisplay,
    handleToggle,
    navigateToAdd,
    isLoading,
    setisLoading,
    removeTodo,
    isModalVisible,
    toggleModal,
    searchText,
    onSearch,
    setFilterModalVisible,
    isFilterModalVisible,
    onSelectedItem,
    selectedTodo,
    sortTodos,
  };
};
export {useHomeScreen};
