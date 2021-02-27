import { combineReducers } from 'redux';
import authReducer from './authreducer';
import streamReducer from './streamReducer';

import { reducer as formReducer } from 'redux-form';
export default combineReducers({
    authReducer: authReducer,
    form: formReducer,
    streams: streamReducer
});