import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from './actions/userAction'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppDrawer, Toolbar } from './components/index'
import Web3 from 'web3'
import BN from 'bn.js';
import contract from 'truffle-contract'
import MetaCoin from '../build/contracts/MetaCoin.json'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
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
    } else {
      var provider = new Web3.providers.HttpProvider('http://localhost:8545')
      web3 = new Web3(provider)
      console.log('No web3 instance injected, using Local web3.');
      this.state.web3 = web3
    }
  }

  render() {
      let metacoin = contract(MetaCoin)
      this.getWeb3()
      metacoin.setProvider(this.state.web3.currentProvider)
      let metacoinInstance
      this.state.web3.eth.getAccounts((error, accounts) => {
        metacoin.deployed().then((instance) => {
          metacoinInstance = instance
          return metacoinInstance.getBalance.call("0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D", {from: accounts[0]})
        }).then((result) => {
          this.setState({balance: result.c[0]});
        })
      })
      return (
        <div>
          <Toolbar />
          <AppDrawer />
          <span>Balance: {this.state.balance}</span>
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
