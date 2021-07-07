import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import {tailwind} from '../../../tailwind';
import {AuthContext} from '../../AuthProvider';
import {Avatar, FAB} from 'react-native-elements';
import {launchCamera} from 'react-native-image-picker';
import api from '../../util/api';
import {API_AVATAR} from '@env';

const PerfilScreen = ({navigation}) => {
  const {user, logOut} = useContext(AuthContext);
  const [filePath, setFilePath] = useState('');
  const [userAvatar, setUserAvatar] = useState(API_AVATAR + user.id);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        setFilePath(response);
        if (response.didCancel) {
          //alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          //alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          //alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          //alert(response.errorMessage);
          return;
        } else {
          const file = {
            name: response.assets['0'].fileName,
            type: response.assets['0'].type,
            uri:
              Platform.OS === 'android'
                ? response.assets['0'].uri
                : response.assets['0'].uri.replace('file://', ''),
          };
          const formData = new FormData();
          formData.append('images', file);
          const headers = {
            'Content-Type': 'multipart/form-data',
          };
          api({token: user.token})
            .post('user/upload', formData, {headers})
            .then(async ({data}) => {
              //setUserAvatar(filePath.uri)
            })
            .catch(error => {
              console.log(error);
            });
          setUserAvatar(response.assets['0'].uri);
        }
      });
    }
  };

  return (
    <>
      <View style={tailwind('bg-white h-full p-4 pt-4')}>
        <View style={tailwind('items-center w-full bg-white')}>
          <Avatar
            containerStyle={tailwind('')}
            rounded
            size="xlarge"
            source={{
              uri: userAvatar,
            }}
          />
          <FAB
            style={styles.fab}
            icon={{
              name: 'camera-alt',
              size: 25,
              color: 'white',
            }}
            onPress={() => {
              chooseFile();
            }}
            color={'#cdcdcd'}
          />
          <Text style={tailwind('pt-3 font-bold text-xl')}>{user.name}</Text>
          <Text style={tailwind('text-gray-500 text-lg')}>{user.email}</Text>
        </View>

        <View style={tailwind('mt-5')}>
          <Button onPress={() => logOut()} title="Cerrar Sesión" />
        </View>
      </View>
    </>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 50,
    right: 60,
    bottom: 10,
  },
});
