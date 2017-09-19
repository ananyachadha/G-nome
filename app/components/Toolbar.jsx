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
      web3: web3
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
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`Admin Console`} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={`Balance: ${this.props.main.balance}`} />
          <IconMenu
            iconButtonElement={<IconButton><SocialPerson /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" containerElement={<Link to="/Login" />} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Toolbars = connect(mapStoreToProps)(ToolbarComponent)
export default Toolbars
