import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

interface CustomActivityIndicatorProps {
  visible: boolean;
  color?: string;
  size?: 'small' | 'large';
  backgroundColor?: string;
}

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({
  visible,
  color = '#4CAF50',
  size = 'large',
  backgroundColor = 'rgba(0, 0, 0, 0.5)', 
}) => {
  if (!visible) return null; 

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
});

export default CustomActivityIndicator;
