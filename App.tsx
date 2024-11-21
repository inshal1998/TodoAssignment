import React from 'react';
import store from './src/store/store';
import {Provider} from 'react-redux';
import AppEntry from './src/AppEntry';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}

export default App;
