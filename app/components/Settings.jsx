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
      window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
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

  render() {
    return (
      <div>
        <Toolbar />
        <AppDrawer />
        <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256}}>
          <FlatButton label="Attest" onClick={this.uportAttest.bind(this)} style={{backgroundColor:'black', color:'red'}}/>
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
