import {SET_LOCATION, SET_HAS_LOCATION} from '../constants';
const initialState = {
  location: [],
  hasLocation: false
};
const tiendasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
        hasLocation: true
      };
    case SET_HAS_LOCATION:
      return {
        ...state,
        hasLocation: action.payload
      };
    default:
      return state;
  }
};
export default tiendasReducer;
