import {
  SET_CLAVE,
  SET_COMENTARIO,
  SET_ERRORS,
  AGREGAR_IMAGEN_SELECCIONADA,
  QUITAR_IMAGEN_SELECCIONADA,
  ENVIAR_INFORMACION,
  GET_FECHA,
  GET_HORA,
  PREPARE_DETAILS,
  SET_DETAILS_READY,
  SET_INFORMACION_ENVIADA,
  IMAGEN_SUBIDA,
  IMAGEN_NO_SUBIDA,
} from '../constants';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import RNFetchBlob from 'react-native-fetch-blob';

import {API_URL} from '@env';

import {userF} from '../../AuthProvider';

export function setClave(clave) {
  return {
    type: SET_CLAVE,
    payload: clave,
  };
}

export function setComentario(comentario) {
  return {
    type: SET_COMENTARIO,
    payload: comentario,
  };
}

export const agregarImagenSeleccionada = img => async dispatch => {
  dispatch({
    type: AGREGAR_IMAGEN_SELECCIONADA,
    payload: img,
  });
};

export const quitarImagenSeleccionada = id => async dispatch => {
  dispatch({
    type: QUITAR_IMAGEN_SELECCIONADA,
    payload: id,
  });
};

export const enviarInformacion =
  (imagenes, camp_id, producto, tienda, detalles, clave, comentario) =>
  async dispatch => {
    const url = API_URL + 'enviar-informacion';

    const info = {
      imgs: imagenes,
      camp: camp_id,
      producto,
      tienda,
      detalles,
      clave,
      comentario,
    };

    console.log('se envía la información:\n ', info);

    imagenes.forEach(element => {
      RNFetchBlob.fetch(
        'POST',
        url,
        {
          Authorization: `Bearer ${userF.token}`,
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
        },
        [
          // part file from storage
          {
            name: 'imagenes',
            filename: element.name,
            type: 'image/jpeg',
            data: RNFetchBlob.wrap('file://' + element.imagen),
          },
          // elements without property `filename` will be sent as plain text
          {name: 'camp', data: camp_id.toString()},
          {name: 'producto', data: producto.toString()},
          {name: 'tienda', data: tienda.toString()},
          {name: 'detalles', data: detalles.toString()},
          {name: 'clave', data: clave.toString()},
          {name: 'comentario', data: comentario.toString()},
        ],
      )
        .then(resp => {
          console.log(resp.data);
          if (resp.data === '0') {
            dispatch({
              type: IMAGEN_SUBIDA,
              payload: {
                id: element.id,
                imagen: element.imagen,
                status: resp.data,
              },
            });
          } else if (resp.data === '0') {
            dispatch({
              type: IMAGEN_NO_SUBIDA,
              payload: {
                id: element.id,
                imagen: element.imagen,
                status: resp.data,
              },
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    });

    return {
      type: ENVIAR_INFORMACION,
      payload: true,
    };
  };

export const setErrors = error => {
  return {
    type: SET_ERRORS,
    payload: error,
  };
};

export const getFecha = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return {
    type: GET_FECHA,
    payload: yyyy + '-' + mm + '-' + dd,
  };
};

export const getHora = () => async dispatch => {
  var current = new Date();
  dispatch({
    type: GET_HORA,
    payload: current.toLocaleTimeString(),
  });
};

export const prepareDetails = (imagenes, location) => {
  var current = new Date();
  var dd = String(current.getDate()).padStart(2, '0');
  var mm = String(current.getMonth() + 1).padStart(2, '0');
  var yyyy = current.getFullYear();

  let toma = [
    {
      fecha: imagenes[0].fecha + ' ' + imagenes[0].hora,
      ubicacion:
        imagenes[0].location.coords.latitude +
        ',' +
        imagenes[0].location.coords.longitude,
    },
  ];

  let subida = [
    {
      fecha: yyyy + '-' + mm + '-' + dd + ' ' + current.toLocaleTimeString(),
      ubicacion: location.coords.latitude + ',' + location.coords.longitude,
    },
  ];

  let details = [toma, subida];

  return {
    type: PREPARE_DETAILS,
    payload: details,
  };
};

export const setDetailsReady = bool => {
  return {
    type: SET_DETAILS_READY,
    payload: bool,
  };
};

export const setInformacionEnviada = bool => {
  return {
    type: SET_INFORMACION_ENVIADA,
    payload: bool,
  };
};
