import React from 'react';
import {AuthProvider} from './src/AuthProvider';
import Router from './src/Router';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({
  name: 'ImagesDatabase.db',
});

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
