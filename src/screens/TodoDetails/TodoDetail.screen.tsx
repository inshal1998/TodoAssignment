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
import { CloseIcon } from '../../assets';
import { Colors } from '../../utils/constants';
import { CusomBtn, CustomCheckBox, TextInputComponent } from '../../components';
import { useTodoDetail } from './TodoDetail.hooks';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  listData: { id: string };
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
            <TouchableOpacity
              onPress={() => handleClose(onClose)}
              style={styles.closeButton}>
              <CloseIcon />
            </TouchableOpacity>
            <TextInputComponent
              value={localTodoDetail.title}
              onChangeText={(value) => updateField('title', value)}
              editable={!localTodoDetail.completed}
              placeholder="Enter title"
              errorMessage={errors.title}
              showError={errors.title !== ''}
            />
            <TextInputComponent
              value={localTodoDetail.description}
              onChangeText={(value) => updateField('description', value)}
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
});

export default TodoDetailScreen;
