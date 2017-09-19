import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics } from './index'


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
      window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div style={{height:`${this.state.height}px`, width:`${this.state.width}px`}}>
        <Toolbar />
        <AppDrawer />
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
