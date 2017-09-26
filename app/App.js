import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics, Settings} from './components/index'
import { setUser } from './actions/userAction'
import { web3 } from './web3.js'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.web3 = web3
  }

  componentDidMount() {
    this.props.dispatch(setUser(this.state.web3.eth.accounts[0]))
  }

  render() {
      return (
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Dashboard' component={Home} />
          <Route exact path='/Status' component={Status} />
          <Route exact path='/Charts' component={Charts} />
          <Route exact path='/Analytics' component={Analytics} />
          <Route exact path='/Settings' component={Settings} />
        </div>
      )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

export default connect(mapStoreToProps)(App)
