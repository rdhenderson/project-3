//Here all we need is the combineReducers function to combine our reducers so we can export them to our store
import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import { reducer as form } from 'redux-form';

import * as reducer from './ducks';


const rootReducer = combineReducers({
  ...reducer,
  burgerMenu,
  form,
});

export default rootReducer;
