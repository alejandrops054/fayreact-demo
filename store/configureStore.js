import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import detallesReducer from '../src/redux/reducers/detallesReducer';
import tiendasReducer from '../src/redux/reducers/tiendasReducer';
import campsReducer from '../src/redux/reducers/campsReducer';
import locationReducer from '../src/redux/reducers/locationReducer';
import camaraReducer from '../src/redux/reducers/camaraReducer';

const rootReducer = combineReducers({
  detalles: detallesReducer,
  tiendas: tiendasReducer,
  camps: campsReducer,
  location: locationReducer,
  camara: camaraReducer,
});

const initialState = {};

const middleware = [thunk];

const configureStore = () => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
export default configureStore;
