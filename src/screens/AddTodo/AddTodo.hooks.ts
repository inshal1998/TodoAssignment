import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todo-slice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProps } from '../../navigation/navigation-types';

const useAddTodoScreen = () => {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProps>();

  const submitTodo = () =>{
    if (!title || !description) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      dispatch(addTodo({title , description}))
      settitle('');
      setdescription('');
      navigation.goBack()
    }
  }
  return {
    title,
    settitle,
    description,
    setdescription,
    submitTodo,
    showErrors
  };
};
export {useAddTodoScreen};
