import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../utils/constants';

interface CheckBoxProps {
  isChecked: boolean;
  onToggle: () => void;
}

const CustomCheckBox: React.FC<CheckBoxProps> = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={[styles.box, isChecked && styles.checkedBox]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius:5
  },
  checkedBox: {
    backgroundColor: Colors.emerald_green,
    borderColor: Colors.emerald_green
  },
  checkmark: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default CustomCheckBox;
