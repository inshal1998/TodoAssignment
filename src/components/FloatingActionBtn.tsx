import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Colors} from '../utils/constants';

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.medium_sea_green,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default FloatingActionButton;
