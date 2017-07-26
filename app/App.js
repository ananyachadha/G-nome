import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from './actions/userAction'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppDrawer, Toolbar } from './components/index'
import { web3 } from './web3.js'
import BN from 'bn.js';
import contract from 'truffle-contract'
import MetaCoin from '../build/contracts/MetaCoin.json'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.web3 = web3
  }

  componentDidMount() {
    this.props.dispatch(setUser('111111', 'Testing dispatch'))
  }

  getWeb3() {
    let web3 = window.web3

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      console.log('Injected web3 detected.');
      this.state.web3 = web3
      exports.web3 = web3
    } else {
      var provider = new Web3.providers.HttpProvider('http://localhost:8545')
      web3 = new Web3(provider)
      console.log('No web3 instance injected, using Local web3.');
      this.state.web3 = web3
      exports.web3 = web3
    }
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
