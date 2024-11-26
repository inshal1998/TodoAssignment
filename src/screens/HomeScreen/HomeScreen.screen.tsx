import {
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
import {
  BottomModal,
  CustomActivityLoader,
  FloatingActionBtn,
} from '../../components';
import {DeleteIcon, EditIcon, FilterIcon} from '../../assets';
import {Colors} from '../../utils/constants';
import {TodoDetails} from '..';
import CustomTextInput from '../../components/TextInputComponent';

const HomeScreen = () => {
  const {
    removeTodo,
    navigateToAdd,
    userTodos,
    todoToDisplay,
    isLoading,
    toggleModal,
    isModalVisible,
    searchText,
    setFilterModalVisible,
    isFilterModalVisible,
    onSearch,
    onSelectedItem,
    selectedTodo,
    sortTodos,
  } = useHomeScreen();

  const toggleFilterModal = () => setFilterModalVisible(!isFilterModalVisible);

  const onSelectFilter = (filter: 'title' | 'completed' | 'latest') => {
    sortTodos(filter);
    toggleFilterModal();
  };

  const renderItem = ({item, index}: {item: UserTodo; index: number}) => {
    let title =
      item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title;
    let isUserTodo = userTodos.length > 0;
    let isCompleted = item.completed;
    return (
      <View style={styles.flatListContainer}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                globalStyles.largeTxtBoldStyle,
                {
                  color: isCompleted ? Colors.medium_sea_green : Colors.black,
                  textDecorationStyle: 'dashed',
                },
              ]}>{`${title}`}</Text>
            {isUserTodo && (
              <TouchableOpacity
                onPress={() => onSelectedItem(item)}
                style={{marginLeft: 15}}>
                <EditIcon />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={[globalStyles.mediumTextStyle ,{
              color: isCompleted ? Colors.medium_sea_green : Colors.black,
            }]}>
            {isCompleted ? item.completedDate : item.createdAt}
          </Text>
        </View>
        {isUserTodo && (
          <TouchableOpacity onPress={() => removeTodo(item.id)}>
            <DeleteIcon />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const HeaderComponent = () => (
    <View style={styles.headerContainer}>
      <CustomTextInput
        value={searchText}
        inputContainerStyle={{
          borderWidth: 0,
        }}
        containerStyle={{marginVertical: 5, paddingHorizontal: 10}}
        onChangeText={text => onSearch(text)}
        placeholder="Search Todo"
        SvgIcon={FilterIcon}
        onIconClick={toggleFilterModal}
      />
    </View>
  );

  return (
    <View style={[globalStyles.flexOne, {padding: 0}]}>
      <CustomActivityLoader visible={isLoading} />
      {HeaderComponent()}
      <FlatList
        data={todoToDisplay}
        renderItem={renderItem}
        removeClippedSubviews={true}
        style={{paddingHorizontal: 20, marginTop: 10}}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.verticalSpace} />}
      />
      {selectedTodo && (
        <TodoDetails
          isVisible={isModalVisible}
          onClose={toggleModal}
          listData={selectedTodo}
        />
      )}
      <FloatingActionBtn onPress={() => navigateToAdd()} />
      <BottomModal
        visible={isFilterModalVisible}
        onClose={toggleFilterModal}
        onSelectFilter={onSelectFilter}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalSpace: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
  textInput: {
    borderRadius: 10,
  },
  filterText: {
    color: Colors.black,
  },
});
