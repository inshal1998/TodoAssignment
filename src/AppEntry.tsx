import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import RootStackNavigator from './navigation/root-stack-navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from './utils/constants';

const AppEntry:React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <GestureHandlerRootView style={styles.safeAreaViewStyle}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle={'light-content'}
        />
        <RootStackNavigator />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default AppEntry;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
});
