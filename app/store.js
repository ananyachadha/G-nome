import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk'
import * as Reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ ...Reducers });
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

module.exports = {
  store: store
};
