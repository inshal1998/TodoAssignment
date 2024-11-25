import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets';
import {Colors} from '../../utils/constants';
import {CusomBtn, CustomCheckBox, TextInputComponent} from '../../components';
import {useTodoDetail} from './TodoDetail.hooks';
import globalStyles from '../../utils/globalStyle';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  listData: {id: string};
}

const TodoDetailScreen: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  listData,
}) => {
  const {
    localTodoDetail,
    updateField,
    updateDetail,
    handleClose,
    errors,
    markCompleted,
  } = useTodoDetail(listData.id);

  const handleUpdate = () => {
    updateDetail(onClose);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => handleClose(onClose)}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.modalContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <Text
                style={[globalStyles.mediumTextStyle, styles.headerTxtStyle]}>
                Update Todo Detail
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.closeButton, {justifyContent: 'flex-end'}]}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
            <TextInputComponent
              value={localTodoDetail.title}
              inputContainerStyle={{marginBottom: 16}}
              onChangeText={value => updateField('title', value)}
              editable={!localTodoDetail.completed}
              placeholder="Enter title"
              errorMessage={errors.title}
              showError={errors.title !== ''}
            />
            <TextInputComponent
              value={localTodoDetail.description}
              inputContainerStyle={{marginBottom: 16}}
              onChangeText={value => updateField('description', value)}
              editable={!localTodoDetail.completed}
              placeholder="Enter description"
              errorMessage={errors.description}
              showError={errors.description !== ''}
            />
            <View style={styles.checkboxRow}>
              <CustomCheckBox
                isChecked={localTodoDetail.completed}
                onToggle={markCompleted}
              />
              <Text style={styles.dateText}>
                {localTodoDetail.completed
                  ? localTodoDetail.completedDate
                  : localTodoDetail.createdAt}
              </Text>
            </View>
            <CusomBtn
              title="Update Detail"
              onPress={handleUpdate}
              buttonStyle={styles.updateButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    margin: 0,
    padding: 30,
    borderRadius: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    marginLeft: 10,
    color: Colors.lightBlack,
  },
  updateButton: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTxtStyle: {
    marginLeft: '25%',
    textAlign: 'center',
  },
});

export default TodoDetailScreen;
