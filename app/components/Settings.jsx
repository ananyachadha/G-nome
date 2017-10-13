import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics } from './index'
import FlatButton from 'material-ui/FlatButton';
import { Connect } from 'uport-connect'
import { uport } from '../uport.js'

class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount() {
      window.addEventListener("resizeSettings", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resizeSettings", this.updateDimensions.bind(this));
  }

  uportAttest() {
    uport.attestCredentials({
      sub: this.props.main.uport.address,
      claim: { "EULA": "I Agree" }
    })
    .then((resp) => {
      console.log("resp", resp)
    })
  }

  uportSendEth() {
    const txobject = {
       from: '0x9530dCBEB129E3a3EaBFC6B55e442122301aEfbE',
       to: '0x0Aa6b15E6dC54155f79BBb536D8C0c9195F1F27D',
       value: 5
     }
     uport.sendTransaction(txobject).then(txID => {
       console.log(txID)
     })
  }

  render() {
    return (
      <div>
        <Toolbar />
        <AppDrawer />
        <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256}}>
          <FlatButton label="Attest" onClick={this.uportAttest.bind(this)} style={{backgroundColor:'black', color:'red'}}/>
          <FlatButton label="Attest" onClick={this.uportSendEth.bind(this)} style={{backgroundColor:'black', color:'red'}}/>
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

const Settings = connect(mapStoreToProps)(SettingsComponent)
export default Settings
