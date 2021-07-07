import React from 'react';
import {View} from 'react-native';

const Layout = ({children, title}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
    }}>
    {children}
  </View>
);

export default Layout;
