import {SET_CURRENT_CAMP, SET_CAMPS} from '../constants';

const initialState = {
  currentCamp: null,
  camps: [],
};

const campsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPS:
      return {
        ...state,
        camps: action.payload,
      };
    case SET_CURRENT_CAMP:
      return {
        ...state,
        currentCamp: action.payload,
      };
    default:
      return state;
  }
};

export default campsReducer;
