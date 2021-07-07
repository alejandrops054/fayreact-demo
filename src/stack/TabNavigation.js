import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TiendasScreen from './Screen/Tiendas';
import GaleriaScreen from './Screen/Galeria';
import PerfilScreen from './Screen/Perfil';
import SincronizarScreen from './Screen/Sincronizar';

const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#F9362C',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptionStyle}
      tabBarOptions={{
        activeTintColor: '#F9362C',
      }}>
      <Tab.Screen
        name="Tiendas"
        component={TiendasScreen}
        options={{
          tabBarLabel: 'Tiendas',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Galeria"
        component={GaleriaScreen}
        options={{
          tabBarLabel: 'Galeria',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="camera" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Sincronizar"
        component={SincronizarScreen}
        options={{
          tabBarLabel: 'Sincronizar',
          tabBarIcon: ({color, size}) => (
            <Icon name="sync-alt" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
