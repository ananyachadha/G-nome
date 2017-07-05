import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { appDrawer } from './components/index'

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme.js)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
