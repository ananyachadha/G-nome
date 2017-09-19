import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Home, Status, Charts, Analytics, Settings } from './index'


class LoginComponent extends Component {
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
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Login = connect(mapStoreToProps)(LoginComponent)
export default Login
