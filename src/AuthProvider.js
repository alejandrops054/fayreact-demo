import React, {useEffect, useState, createContext} from 'react';
import * as SecureStore from 'expo-secure-store';
import api from './util/api';

export const AuthContext = createContext({});

export let userF;

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
      const timer = setTimeout(() => {
        setError(null);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      userF = user;
    }
  }, [user]);

  const logIn = (email, password) => {
    setLoading(true);

    api()
      .post('/auth/token', {
        email,
        password,
        device_name: 'Mobile',
      })
      .then(response => {
        const userResponse = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          token: response.data.token,
        };
        setUser(userResponse);
        setError(null);
        SecureStore.setItemAsync('user', JSON.stringify(userResponse));
        setLoading(false);
      })
      .catch(({errors}) => {
        console.log(errors);
        setError(errors);
        SecureStore.deleteItemAsync('user');
        setLoading(false);
      });
  };

  const logOut = () => {
    api({token: user.token})
      .delete('/auth/token')
      .then(() => {
        setUser(null);
        userF = null;
        SecureStore.deleteItemAsync('user');
      })
      .catch(({errors}) => {
        console.error(errors);
        setError(errors);
      });
  };

  return (
    <AuthContext.Provider
      value={{user, setUser, loading, error, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
