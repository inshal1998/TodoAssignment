import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors } from '../utils/constants';
import globalStyles from '../utils/globalStyle';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorMessage?: string;
  showError?: boolean;
  SvgIcon?: React.FC; 
  onIconClick?: () => void; 
  iconWidth?: number;
  containerStyle?: ViewStyle,
  inputContainerStyle?:ViewStyle
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  showError = false,
  SvgIcon,
  onIconClick,
  iconWidth = 40,
  containerStyle,
  inputContainerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container , containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            globalStyles.mediumTextStyle,
            inputContainerStyle,
            showError && errorMessage ? styles.inputError : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray_600}
          {...rest}
        />
        {SvgIcon && (
          <TouchableOpacity
            onPress={onIconClick}
            style={[styles.iconContainer, { width: iconWidth }]}
          >
            <SvgIcon />
          </TouchableOpacity>
        )}
      </View>
      {showError && errorMessage && (
        <Text style={[globalStyles.mediumTextStyle , styles.errorText]}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
    color: Colors.lightBlack,
  },
  inputError: {
    borderColor: Colors.coral_red,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 4,
    color: Colors.coral_red,
  },
});

export default CustomTextInput;
