import React from 'react';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import store from './store/store';
import { Main } from './ui/Main';

function App() {
  return (
    <Provider store={store}>
      <Main>
        <Navigation />
      </Main>
    </Provider>
  );
}

export default App;
