import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SocialPerson from 'material-ui/svg-icons/social/person';
import contract from 'truffle-contract'
import HumanStandardToken from '../../build/contracts/HumanStandardToken.json'
import { setBalance } from '../actions/userAction'
import { AppDrawer , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics, Settings  } from './index'
import { balance } from '../App.js'
import { web3 } from '../web3.js'

class ToolbarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      web3: web3,
      style: {
        backgroundColor: '#00b2a9',
        menuItem: {
          textAlign: 'right'
        }
      }
    };
  }

  componentDidMount() {
  }

  handleChange = (event, index, value) => this.setState({value});

  getBalance() {
    let hst = contract(HumanStandardToken)
    hst.setProvider(this.state.web3.currentProvider)
    let hstInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      hst.deployed().then((instance) => {
        hstInstance = instance
        return hstInstance.balanceOf.call("0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D")
      }).then((result) => {
        this.props.dispatch(setBalance(this.props.main.addr, result.c[0]))
      })
    })
  }

  render() {
    this.getBalance()
    if (this.props.main.name) {
      return (
        <Toolbar style={this.state.style}>
          <ToolbarGroup>
            <ToolbarTitle text={`Admin Console`} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={`${this.props.main.uport.address}`} />
            <IconMenu
              iconButtonElement={<IconButton><SocialPerson /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem primaryText={`Name: ${this.props.main.name}`} style={this.state.style.menuItem}/>
              <MenuItem primaryText={`Network: ${this.props.main.uport.network.charAt(0).toUpperCase() + this.props.main.uport.network.slice(1)}`} style={this.state.style.menuItem} />
              <MenuItem primaryText="Settings" containerElement={<Link to="/Settings" />} style={this.state.style.menuItem} />
              <MenuItem primaryText="Sign out" containerElement={<Link to="/Login" />} style={this.state.style.menuItem} />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      )
    } else {
      return (
        <Toolbar style={this.state.style}>
          <ToolbarGroup>
            <ToolbarTitle text={`Admin Console`} />
          </ToolbarGroup>
        </Toolbar>
      )
    }
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Toolbars = connect(mapStoreToProps)(ToolbarComponent)
export default Toolbars
