import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../utils/constants';

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFilter: (filter: 'title' | 'completed' | 'latest') => void;
}

const BottomModal: React.FC<BottomModalProps> = ({ visible, onClose, onSelectFilter }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => onSelectFilter('title')}>
          <Text style={styles.filterOption}>Sort by Title</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectFilter('completed')}>
          <Text style={styles.filterOption}>Sort by Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelectFilter('latest')}>
          <Text style={styles.filterOption}>Sort by Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingHorizontal:20,
    marginBottom:20
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
  },
  filterOption: {
    fontSize: 16,
    paddingVertical: 10,
    color: Colors.black,
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    textAlign: 'center',
    color: Colors.coral_red,
  },
});

export default BottomModal;
