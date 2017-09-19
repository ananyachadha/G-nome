import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { store, history } from './store'
import App from './App'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics, Settings } from './components/index'

const muiTheme = getMuiTheme(lightBaseTheme.js);

render(
  <Router history={history}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('app')
);
