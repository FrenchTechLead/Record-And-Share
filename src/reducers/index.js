import {combineReducers} from 'redux';
import recorderReducer from './RecorderReducer';
import cordovaReducer from './CordovaReducer';
import drawerReducer from './DrawerReducer';

// you can create other reducers and put them in the combine Reducers middleWare.
export default combineReducers({
  recorderReducer,
  cordovaReducer,
  drawerReducer
})
