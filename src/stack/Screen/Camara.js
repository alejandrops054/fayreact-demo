import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import {CameraScreen} from 'react-native-camera-kit';
import AnimatedLoader from 'react-native-animated-loader';
import {getFecha, getHora} from '../../redux/actions/detallesActions';
import {getLocation, setHasLocation} from '../../redux/actions/locationActions';
import {
  moveImage,
  saveToDb,
  setLoading,
  setImagen,
  setNumeroFotos,
} from '../../redux/actions/camaraActions';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const Camara = ({
  navigation,
  getLocation,
  setHasLocation,
  moveImage,
  saveToDb,
  setLoading,
  setNumeroFotos,
  getFecha,
  getHora,
  detalles: {clave, comentario, fecha, hora},
  location: {location, hasLocation},
  camara: {photoTaked, loading, imagen, numeroDeFotos},
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getFecha();
    getLocation();
  }, []);

  useEffect(() => {
    if (hasLocation) {
      setLoading(false);
    }
  }, [hasLocation]);

  useEffect(() => {
    if (photoTaked) {
      saveToDb(clave, comentario, fecha, hora, location, imagen);
      setNumeroFotos(numeroDeFotos + 1);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [photoTaked]);

  const onBottomButtonPressed = event => {
    if (event.type === 'capture') {
      getHora();
      moveImage(event.image.uri);
    } else {
      terminar();
    }
  };

  const terminar = () => {
    SweetAlert.showAlertWithOptions(
      {
        title: 'Terminado',
        subTitle: `Se ha tomado ${numeroDeFotos.length} foto/s.`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'success',
        cancellable: true,
      },
      callback => {
        setHasLocation(false);
        navigation.goBack();
      },
    );
  };

  const ifLoading = () => {
    if (!loading) {
      return (
        <CameraScreen
          actions={{leftButtonText: 'Terminar'}}
          onBottomButtonPressed={event => onBottomButtonPressed(event)}
          flashImages={{
            on: require('../../../assets/images/flashOn.png'),
            off: require('../../../assets/images/flashOff.png'),
            auto: require('../../../assets/images/flashAuto.png'),
          }}
          cameraFlipImage={require('../../../assets/images/cameraFlipIcon.png')}
          captureButtonImage={require('../../../assets/images/cameraButton.png')}
          torchOnImage={require('../../../assets/images/torchOn.png')}
          torchOffImage={require('../../../assets/images/torchOff.png')}
          showCapturedImageCount
          saveToCameraRoll={false}
        />
      );
    } else {
      return (
        <SafeAreaView>
          <View>
            <AnimatedLoader
              visible={visible}
              overlayColor="rgba(255,255,255,0.75)"
              source={require('../../../assets/loading.json')}
              animationStyle={styles.lottie}
              speed={1}>
              <Text>Obteniendo Ubicación...</Text>
            </AnimatedLoader>
          </View>
        </SafeAreaView>
      );
    }
  };

  return ifLoading();
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    justifyContent: 'center',
    width: 500,
    height: 500,
  },
});

const mapStateToProps = state => ({
  detalles: state.detalles,
  location: state.location,
  camara: state.camara,
});

export default connect(mapStateToProps, {
  setImagen,
  setNumeroFotos,
  getFecha,
  getHora,
  getLocation,
  moveImage,
  saveToDb,
  setLoading,
  setHasLocation,
})(Camara);
