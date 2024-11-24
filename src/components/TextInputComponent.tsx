import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Fonts } from '../utils/constants';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorMessage?: string;
  showError?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  showError = false,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          showError && errorMessage ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        {...rest}
      />
      {showError && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width:"100%",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.lightBlack,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.coral_red,
  },
  errorText: {
    marginTop: 4,
    color: Colors.coral_red,
    fontSize: 12,
  },
});

export default CustomTextInput;
