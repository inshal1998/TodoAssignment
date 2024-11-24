import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useHomeScreen} from './HomeScreen.hooks';
import globalStyles from '../../utils/globalStyle';
import {UserTodo} from '../../store/todo-slice';
import {CustomActivityLoader, FloatingActionBtn} from '../../components';
import {DeleteIcon, EditIcon} from '../../assets';
import {Colors} from '../../utils/constants';
import {TodoDetails} from '..';

const HomeScreen = () => {
  const {
    removeTodo,
    navigateToAdd,
    todosToDisplay,
    isLoading,
    toggleModal,
    isModalVisible,
  } = useHomeScreen();

  const renderItem = ({item, index}: {item: UserTodo; index: number}) => {
    let title =
      item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title;
    return (
      <View style={styles.flatListContainer}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                globalStyles.largeTxtBoldStyle,
                {
                  color: item.completed
                    ? Colors.medium_sea_green
                    : Colors.black,
                },
              ]}>{`${title}`}</Text>
            <TouchableOpacity onPress={toggleModal} style={{marginLeft: 15}}>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <Text>{item.createdAt}</Text>
        </View>
        <TouchableOpacity onPress={() => removeTodo(item.id)}>
          <DeleteIcon />
        </TouchableOpacity>
        <TodoDetails
          isVisible={isModalVisible}
          onClose={toggleModal}
          listData={item}
        />
      </View>
    );
  };

  return (
    <View style={globalStyles.flexOne}>
      <CustomActivityLoader visible={isLoading} />
      <FlatList
        data={todosToDisplay}
        renderItem={renderItem}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.verticalSpace} />}
      />
      <FloatingActionBtn onPress={() => navigateToAdd()} />
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
