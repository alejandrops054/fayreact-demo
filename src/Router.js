import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import * as SecureStore from 'expo-secure-store';
import AuthStack from './stack/AuthStack';
import AppStack from './stack/AppStack';

const Router = () => {
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then(userString => {
        setUser(JSON.parse(userString));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
