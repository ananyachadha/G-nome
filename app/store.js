import * as Reducers from './reducers';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ ...Reducers, routing: routerReducer });
const historyMiddleware = routerMiddleware(hashHistory);
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk), applyMiddleware(historyMiddleware)));

module.exports = {
  store: store,
  history: hashHistory
};
