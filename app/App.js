import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppDrawer, Toolbar } from './components/index'
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
          <Toolbar />
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
