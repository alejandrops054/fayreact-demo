import {
  ELIMINAR_IMAGEN,
  MOVE_IMAGE,
  SAVE_TO_DB,
  SET_LOADING,
  SET_NUMERO_FOTOS,
} from '../constants';
const initialState = {
  photoTaked: false,
  loading: true,
  imagen: '',
  imagenes: [],
  numeroDeFotos: 0,
};
const camaraReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_IMAGE:
      return {
        ...state,
        imagen: action.payload,
        photoTaked: true,
      };
    case SAVE_TO_DB:
      return {
        ...state,
        photoTaked: false,
        imagenes: [...state.imagenes, action.payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_NUMERO_FOTOS:
      return {
        ...state,
        numeroDeFotos: action.payload,
      };
    case ELIMINAR_IMAGEN:
      return {
        ...state,
        imagenes: state.imagenes.filter(imagen => imagen.id !== action.payload),
      };
    default:
      return state;
  }
};

export default camaraReducer;
