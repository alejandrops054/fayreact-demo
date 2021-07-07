import api from '../../util/api';
import {userF} from '../../AuthProvider';
import {
  FILTER_FUNCTION,
  FILTER_FUNCTION_NO_TEXT,
  RENDER_TIENDAS,
  SET_CURRENT_STORE,
  SET_ERRORS,
  SET_LOADING,
} from '../constants';

export const renderTiendas = () => async dispatch => {
  api({token: userF.token})
    .get('tiendas')
    .then(async ({data}) => {
      console.log(data);
      dispatch({
        type: RENDER_TIENDAS,
        payload: data,
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    });
};

export const searchFilterFunction = text => async dispatch => {
  if (text) {
    dispatch({
      type: FILTER_FUNCTION,
      payload: text,
    });
  } else {
    dispatch({
      type: FILTER_FUNCTION_NO_TEXT,
      payload: text,
    });
  }
};

export const setCurrentTienda = tienda => {
  return {
    type: SET_CURRENT_STORE,
    payload: tienda,
  };
};

export const setLoading = bool => {
  return {
    type: SET_LOADING,
    payload: bool,
  };
};
