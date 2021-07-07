import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AnimatedLoader from 'react-native-animated-loader';
import {AuthContext} from '../AuthProvider';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {tailwind} from '../../tailwind';
import Layout from '../Layout';
import Header from '../Header';

const Stack = createStackNavigator();

const LoginScreen = ({navigation}) => {
  const {logIn, error, loading} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loading]);

  return (
    <Layout title="Iniciar Sesión">
      <Header title="" />
      {loading ? (
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/loading.json')}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
      ) : (
        <View style={tailwind('p-5 w-full')}>
          {error && (
            <Text
              style={tailwind('text-red-800 bg-red-200 p-3 mb-5 rounded-md')}>
              {error}
            </Text>
          )}
          <TextInput
            style={tailwind(
              'mb-2 relative px-3 py-2 border border-gray-300 text-gray-900 rounded-md',
            )}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            textContentType="emailAddress"
            autoCapitalize="none"
          />

          <View style={styles.sectionStyle}>
            <TextInput
              style={{flex: 1, color: '#000000'}}
              onChangeText={text => setPassword(text)}
              placeholder="Contraseña"
              secureTextEntry={secureText}
            />
            <Icon
              name={secureText ? 'eye' : 'eye-slash'}
              size={20}
              color="#000"
              onPress={() => setSecureText(!secureText)}
              style={{margin: 10}}
            />
          </View>

          <Button
            title="Iniciar Sesión"
            color="#F9362C"
            onPress={() => logIn(email, password)}
          />
        </View>
      )}
    </Layout>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    justifyContent: 'center',
    width: 600,
    height: 600,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    height: 43,
    width: 320,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AuthStack;
