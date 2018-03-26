import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Charts, Analytics, Settings} from './index'
import FlatButton from 'material-ui/FlatButton'
import Escrow from '../../build/contracts/Escrow.json'
import HSToken from '../../build/contracts/HumanStandardToken.json'
import ETHQuery from 'ethjs-query'
import Contract from 'ethjs-contract'

const tokenAddr = "0xb352ce1d19ba244bf12193d8f12d562fd2bf3ab8"
const escrowAddr = "0xb375560e61a49221338edb61358fa4a2632a6662"

class StatusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      web3: web3,
    };
  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount() {
      const self = this
      this.getMetaMask();
      this.getAccount();
      this.initializeToken();
      this.initializeEscrow();
      this.checkBalance(escrowAddr, function(resp) {
        self.setState({contractBalance: resp})
      });
      window.addEventListener("resizeStatus", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resizeStatus", this.updateDimensions.bind(this));
  }

  getMetaMask() {
      if(window.web3) {
        this.setState({metamask: window.web3})
      }
  }

  getAccount() {
    const self = this
    window.web3.eth.getAccounts(function(err, res) {
      self.setState({account: res})
      self.checkBalance(res[0], function(resp) {
        self.setState({userBalance: resp})
      });
    })
  }

  initializeContract() {
    if(window.web3) {
      const eth = new ETHQuery(window.web3.currentProvider)
      const contract = new Contract(eth)
      return contract
    }
  }

  initializeToken(tokenAddr) {
    const contract = this.initializeContract();
    const HStoken = contract(HSToken.abi, HSToken.bytecode, {from: this.state.account[0]});
    // HStoken.new(arg1,arg2, (err, res) => {
    //   console.log(res);
    // });
    const hstoken = HStoken.at(tokenAddr);
    this.setState({tokenAddr: tokenAddr, hstoken: hstoken})
    return hstoken
  }

  initializeEscrow(escrowAddr) {
    const contract = this.initializeContract();
    const EscrowContract = contract(Escrow.abi);
    const escrow = EscrowContract.at(escrowAddr);
    this.setState({escrowAddr: escrowAddr, escrow: escrow})
    return escrow
  }

  depositToken() {
    const self = this
    const value = 100

    const hstoken = this.initializeToken(tokenAddr)
    const escrow = this.initializeEscrow(escrowAddr)
    hstoken.approve(escrowAddr, value, {from: this.state.account[0]})
    .then(function(resp) {
      console.log("approve", resp)
      escrow.depositToken(tokenAddr, value, {from: self.state.account[0]})
      .then(function(resp) {
        console.log("deposit", resp)
      })
    })
  }

  withdrawToken() {
    const self = this
    const value = 50

    const hstoken = this.initializeToken(tokenAddr)
    const escrow = this.initializeEscrow(escrowAddr)
    escrow.withdrawToken(tokenAddr, value, {from: self.state.account[0]})
    .then(function(resp) {
      console.log("withdraw", resp)
    })
  }

  checkBalance(addr, callback) {
    const escrow = this.initializeEscrow(escrowAddr)
    escrow.balanceOf(tokenAddr, addr)
    .then(function(resp) {
      callback(resp[0].words[0])
    })
  }

  render() {
    return (
      <div style={{height:`${this.state.height}px`, width:`${this.state.width}px`}}>
        <Toolbar />
        <AppDrawer />
        <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256}}>
          <FlatButton label="Deposit 100 Tokens" onClick={this.depositToken.bind(this)} style={{backgroundColor:'black', color:'red'}}/>
          <FlatButton label="Withdraw 50 Tokens" onClick={this.withdrawToken.bind(this)} style={{backgroundColor:'black', color:'red'}}/>
          <FlatButton label={"Staked Tokens: " + this.state.userBalance} onClick={console.log()} style={{backgroundColor:'black', color:'white'}}/>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Status = connect(mapStoreToProps)(StatusComponent)
export default Status
