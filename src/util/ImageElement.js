import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {connect} from 'react-redux';

import {
  agregarImagenSeleccionada,
  quitarImagenSeleccionada,
} from '../redux/actions/detallesActions';
import {eliminarImagen, setNumeroFotos} from '../redux/actions/camaraActions';

import Icon from 'react-native-vector-icons/FontAwesome5';
import SweetAlert from 'react-native-sweet-alert';
import CheckBox from '@react-native-community/checkbox';

const ImageElement = ({
  imgsrc,
  agregarImagenSeleccionada,
  quitarImagenSeleccionada,
  eliminarImagen,
  setNumeroFotos,
  camara: {numeroDeFotos},
}) => {
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    if (isSelected) {
      agregarImagenSeleccionada(imgsrc);
      setNumeroFotos(numeroDeFotos + 1);
    } else {
      quitarImagenSeleccionada(imgsrc.id);
      setNumeroFotos(numeroDeFotos - 1);
    }
  }, [isSelected]);

  const deletePhoto = () => {
    SweetAlert.showAlertWithOptions(
      {
        title: 'Seguro que quiere eliminar?',
        confirmButtonTitle: 'Eliminar',
        confirmButtonColor: '#DA0000',
        showCancelButton: true,
        style: 'warning',
        cancellable: true,
      },
      callback => eliminarImagen(imgsrc.id),
    );
  };

  return (
    <View style={styles.imageWrap}>
      <Image
        source={{uri: 'file://' + imgsrc.imagen}}
        style={styles.image}></Image>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Icon
          name="trash-alt"
          size={20}
          onPress={() => deletePhoto()}
          style={{
            margin: 5,
          }}
        />
        <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={newValue => setSelection(newValue)}
          style={styles.checkbox}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    margin: 2,
    padding: 2,
    height: 250,
    width: 175,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  checkbox: {
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
});

const mapStateToProps = state => ({
  camara: state.camara,
});

export default connect(mapStateToProps, {
  agregarImagenSeleccionada,
  quitarImagenSeleccionada,
  eliminarImagen,
  setNumeroFotos,
})(ImageElement);
