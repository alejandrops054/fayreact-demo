import {Platform} from 'react-native';
import {
  MOVE_IMAGE,
  SAVE_TO_DB,
  SET_LOADING,
  SET_IMAGEN,
  SET_NUMERO_FOTOS,
  ELIMINAR_IMAGEN,
} from '../constants';
import moment from 'moment';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import {openDatabase} from 'react-native-sqlite-storage';
import SweetAlert from 'react-native-sweet-alert';

var db = openDatabase({name: 'ImagesDatabase.db'});

const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/Pictures`,
  android: `${RNFS.ExternalStorageDirectoryPath}/Pictures`,
});

const dirPictures = `${dirHome}/Fay`;

export const moveImage = filePath => async dispatch => {
  try {
    // set new image name and filepath
    const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
    const newFilepath = `${dirPictures}/${newImageName}`;
    // move and save image to new filepath
    let imageMoved = await moveAttachment(filePath, newFilepath).then(
      imageMoved => {
        if (imageMoved) {
          return RNFS.scanFile(newFilepath);
        } else {
          console.log("Didn't really move the image");
          return false;
        }
      },
    );
    console.log('image moved', imageMoved);
    dispatch({
      type: MOVE_IMAGE,
      payload: imageMoved,
    });
  } catch (error) {
    console.log(error);
  }
};

const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPictures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            console.log('FILE MOVED', filePath, newFilepath);
            resolve(true);
          })
          .catch(error => {
            console.log('moveFile error', error);
            reject(error);
          });
      })
      .catch(err => {
        console.log('mkdir error', err);
        reject(err);
      });
  });
};

export const saveToDb =
  (clave, comentario, fecha, hora, location, imagen) => async dispatch => {
    console.log(
      '\nClave: ',
      clave,
      '\nComentario: ',
      comentario,
      '\nFecha: ',
      fecha,
      '\nHora: ',
      hora,
      '\nLocation: ',
      location,
      '\nUri: ',
      imagen,
    );

    let toSave = {
      id: uuid.v4(),
      clave,
      comentario,
      imagen,
      location,
      fecha,
      hora,
    };

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO galeria (id, clave, comentario, imagen, latitud, longitud, fecha, hora) VALUES (?,?,?,?,?,?,?,?)',
        [
          toSave.id,
          clave,
          comentario,
          imagen,
          location.coords.latitude,
          location.coords.longitude,
          fecha,
          hora,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            //imprimirRows();
          } else {
            SweetAlert.showAlertWithOptions({
              title: 'Error',
              text: 'La imagen no ha sido guardada en la base de datos',
              confirmButtonTitle: 'OK',
              confirmButtonColor: '#000',
              style: 'danger',
              cancellable: false,
            });
          }
        },
      );
    });

    let name = imagen.replace('/storage/emulated/0/Pictures/Fay/', '');

    let toDispatch = {
      id: uuid.v4(),
      clave,
      comentario,
      imagen,
      name,
      location,
      fecha,
      hora,
    };

    dispatch({
      type: SAVE_TO_DB,
      payload: toDispatch,
    });
  };

const imprimirRows = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM galeria', [], (tx, results) => {
      for (let i = 0; i < results.rows.length; i++)
        console.log(results.rows.item(i));
    });
  });
};

export const setLoading = bool => {
  return {
    type: SET_LOADING,
    payload: bool,
  };
};

export function setImagen(uri) {
  return {
    type: SET_IMAGEN,
    payload: uri,
  };
}

export function setNumeroFotos(numero) {
  return {
    type: SET_NUMERO_FOTOS,
    payload: numero,
  };
}

export const eliminarImagen = id => async dispatch => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM galeria where id=?', [id], (tx, results) => {
      console.log('Results', results.rowsAffected);
      if (results.rowsAffected > 0) {
        SweetAlert.showAlertWithOptions({
          title: 'Imagen Eliminada',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: false,
        });
      } else {
        alert('A ocurrido un error intente de nuevo');
      }
    });
  });

  dispatch({
    type: ELIMINAR_IMAGEN,
    payload: id,
  });
};
