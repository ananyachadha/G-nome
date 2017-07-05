import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk'
import * as Reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ ...Reducers });
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

store.dispatch({
  type: "SET_USER",
  payload: {
    id: 123,
    name: "blah"
  }
})

module.exports = {
  store: store
};
