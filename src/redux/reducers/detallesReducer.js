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

const initialState = {
  clave: '',
  comentario: '',
  fecha: '',
  hora: '',
  details: [],
  detailsReady: false,
  imagenesSeleccionadas: [],
  imagenesSubidas: [],
  imagenesNoSubidas: [],
  informacionEnviada: false,
  errors: [],
};

const detallesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLAVE:
      return {
        ...state,
        clave: action.payload,
      };
    case SET_COMENTARIO:
      return {
        ...state,
        comentario: action.payload,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: [...state, action.payload],
      };
    case AGREGAR_IMAGEN_SELECCIONADA:
      return {
        ...state,
        imagenesSeleccionadas: [...state.imagenesSeleccionadas, action.payload],
      };
    case QUITAR_IMAGEN_SELECCIONADA:
      return {
        ...state,
        imagenesSeleccionadas: state.imagenesSeleccionadas.filter(
          imagen => imagen.id !== action.payload,
        ),
      };
    case ENVIAR_INFORMACION:
      return {
        ...state,
        imagenesSubidas: [...state.imagenesSubidas, action.payload],
        informacionEnviada: action.payload,
      };
    case GET_FECHA:
      return {
        ...state,
        fecha: action.payload,
      };
    case GET_HORA:
      return {
        ...state,
        hora: action.payload,
      };
    case PREPARE_DETAILS:
      return {
        ...state,
        details: action.payload,
        detailsReady: true,
      };
    case SET_DETAILS_READY:
      return {
        ...state,
        detailsReady: action.payload,
      };
    case SET_INFORMACION_ENVIADA:
      return {
        ...state,
        informacionEnviada: action.payload,
      };
    case IMAGEN_SUBIDA:
      return {
        ...state,
        imagenesSubidas: [...state.imagenesSubidas, action.payload],
        informacionEnviada: true,
      };
    case IMAGEN_NO_SUBIDA:
      return {
        ...state,
        imagenesNoSubidas: [...state.imagenesNoSubidas, action.payload],
        informacionEnviada: true,
      };
    default:
      return state;
  }
};
export default detallesReducer;
