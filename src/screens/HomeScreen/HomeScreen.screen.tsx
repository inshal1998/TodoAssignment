import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useHomeScreen} from './HomeScreen.hooks';
import globalStyles from '../../utils/globalStyle';
import {UserTodo} from '../../store/todo-slice';
import {CustomCheckBox} from '../../components';
import FloatingActionButton from '../../components/FloatingActionBtn';
import CustomActivityIndicator from '../../components/CustomActivityLoader';
import {DeleteIcon, EditIcon} from '../../assets';

const HomeScreen = () => {
  const {handleToggle,removeTodo, navigateToAdd, todosToDisplay, isLoading} =
    useHomeScreen();

  const renderItem = ({item, index}: {item: UserTodo; index: number}) => {
    let title =
      item.title.length > 30
        ? `${item.title.substring(0, 30)}...}`
        : item.title;
    return (
      <View style={styles.flatListContainer}>
        <View>
          <Text style={globalStyles.largeTxtBoldStyle}>{`${title}`}</Text>
          <Text>{item.createdAt}</Text>
        </View>
        <TouchableOpacity>
          <EditIcon/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>removeTodo(item.id)}>
          <DeleteIcon/>
        </TouchableOpacity>
        {/* <CustomCheckBox
          isChecked={item.completed}
          onToggle={() => handleToggle(item.id)}
        /> */}
      </View>
    );
  };

  return (
    <View style={globalStyles.flexOne}>
      <CustomActivityIndicator visible={isLoading} />
      <FlatList
        data={todosToDisplay}
        renderItem={renderItem}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.verticalSpace} />}
      />
      <FloatingActionButton onPress={() => navigateToAdd()} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalSpace: {
    paddingVertical: 10,
  },
});
