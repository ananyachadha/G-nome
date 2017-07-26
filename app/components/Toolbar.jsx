import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import contract from 'truffle-contract'
import MetaCoin from '../../build/contracts/MetaCoin.json'
import { setBalance } from '../actions/userAction'
import { AppDrawer } from './index'
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
    let metacoin = contract(MetaCoin)
    metacoin.setProvider(this.state.web3.currentProvider)
    let metacoinInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      metacoin.deployed().then((instance) => {
        metacoinInstance = instance
        return metacoinInstance.getBalance.call("0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D")
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
          <AppDrawer />
        </ToolbarGroup>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Broadcasts" />
            <MenuItem value={2} primaryText="All Voice" />
            <MenuItem value={3} primaryText={this.props.main.addr} />
            <MenuItem value={4} primaryText="Complete Voice" />
            <MenuItem value={5} primaryText="Complete Text" />
            <MenuItem value={6} primaryText="Active Voice" />
            <MenuItem value={7} primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={`Balance: ${this.props.main.balance}`} />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
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
