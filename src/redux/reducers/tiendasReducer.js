import {
  FILTER_FUNCTION,
  FILTER_FUNCTION_NO_TEXT,
  RENDER_TIENDAS,
  SET_CURRENT_STORE,
  SET_ERRORS,
  SET_LOADING,
} from '../constants';
const initialState = {
  tiendas: [],
  filteredData: [],
  currentStore: {},
  loading: true,
  search: '',
  errors: [],
};
const tiendasReducer = (state = initialState, action) => {
  switch (action.type) {
    case RENDER_TIENDAS:
      return {
        ...state,
        tiendas: action.payload,
        filteredData: action.payload,
        loading: false,
      };
    case SET_CURRENT_STORE:
      return {
        ...state,
        currentStore: action.payload,
      };
    case FILTER_FUNCTION:
      return {
        ...state,
        filteredData: state.tiendas.filter(item => {
          const itemData = item.tienda_nombre
            ? item.tienda_nombre.toUpperCase()
            : ''.toUpperCase();
          const textData = action.payload.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }),
        search: action.payload,
      };
    case FILTER_FUNCTION_NO_TEXT:
      return {
        ...state,
        filteredData: state.tiendas,
        search: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: [...errors, action.payload],
      };
    default:
      return state;
  }
};
export default tiendasReducer;
