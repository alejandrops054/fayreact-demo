import {SET_CAMPS, SET_CURRENT_CAMP} from '../constants';
import api from '../../util/api';
import {userF} from '../../AuthProvider';

export const getCamps = idTienda => async dispatch => {
  api({token: userF.token})
    .get('camps', {
      params: {
        tienda_id: idTienda,
      },
    })
    .then(({data}) => {
      console.log(data);
      dispatch({
        type: SET_CAMPS,
        payload: data,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const setCurrentCamp = camp => {
  return {
    type: SET_CURRENT_CAMP,
    payload: camp,
  };
};
