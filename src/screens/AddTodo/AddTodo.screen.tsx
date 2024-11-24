import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAddTodoScreen} from './AddTodo.hooks';
import globalStyles from '../../utils/globalStyle';
import CustomTextInput from '../../components/TextInputComponent';
import CustomButton from '../../components/CustomBtn';
const AddTodo = () => {
  const {settitle, title, description, setdescription, submitTodo, showErrors} =
    useAddTodoScreen();
  return (
    <View style={[globalStyles.alignContentCenter , globalStyles.flexOne]}>
      <CustomTextInput
        value={title}
        onChangeText={text => settitle(text)}
        placeholder="Enter Title"
        errorMessage={!title ? 'Title is required' : ''}
        showError={showErrors}
      />
      <CustomTextInput
        value={description}
        onChangeText={text => setdescription(text)}
        placeholder="Enter Description"
        errorMessage={!description ? 'Description is required' : ''}
        showError={showErrors}
      />
      <CustomButton
        title="Add Todo"
        onPress={submitTodo}
        buttonStyle={{marginTop: 16}}
      />
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({});
