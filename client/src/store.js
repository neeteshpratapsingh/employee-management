import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './employerReducers';

// const initialState = {};

const middleware = [ thunk ];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
