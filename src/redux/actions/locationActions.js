import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../../app.json';
import {SET_LOCATION, SET_HAS_LOCATION} from '../constants';

const forceLocation = true;
const highAccuracy = true;
const locationDialog = true;

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const getLocation = () => async dispatch => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      dispatch({
        type: SET_LOCATION,
        payload: position,
      });
      return true;
    },
    error => {
      Alert.alert(`Code ${error.code}`, error.message);
      dispatch({
        type: SET_LOCATION,
        payload: null,
      });
      console.log(error);
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: highAccuracy,
      timeout: 150000,
      maximumAge: 100000,
      distanceFilter: 0,
      forceRequestLocation: forceLocation,
      showLocationDialog: locationDialog,
    },
  );
};

export const setHasLocation = (bool) => {
  return {
    type: SET_HAS_LOCATION,
    payload: bool
  }
};
