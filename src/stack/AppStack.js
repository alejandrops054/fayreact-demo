import React, {useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {createStackNavigator} from '@react-navigation/stack';
import CampScreen from './Screen/Camp';
import DetallesScreen from './Screen/Detalles';
import CamaraDetallesScreen from './Screen/CamaraDetalles';
import Camara from './Screen/Camara';
import TabNavigation from './TabNavigation';

var db = openDatabase({name: 'ImagesDatabase.db'});

const Stack = createStackNavigator();

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

const AppStack = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS galeria', [], (tx, result) => {
        console.log('Table Droped');
      });
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS galeria(id VARCHAR(255), clave VARCHAR(255), comentario VARCHAR(255), imagen VARCHAR(255), latitud FLOAT(3, 7), longitud FLOAT(3, 7), fecha VARCHAR(100), hora VARCHAR(100))',
        [],
        (tx, results) => {
          console.log('Table Created');
        },
      );
    });
  }, []);
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Tiendas" component={TabNavigation} />
      <Stack.Screen name="Camp" component={CampScreen} />
      <Stack.Screen name="Detalles" component={DetallesScreen} />
      <Stack.Screen
        name="CamDetalles"
        component={CamaraDetallesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camara"
        component={Camara}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
