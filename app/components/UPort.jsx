import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Home, Status, Charts, Analytics, Settings } from './index'
import { Credentials, SimpleSigner } from 'uport'
import { Connect } from 'uport-connect'
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { setUport } from '../actions/userAction'
import { store, history } from '../store'
import { web3, uport } from '../uport.js'
import kjua from 'kjua'

class UPortComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      uport: uport,
      web3: web3,
      authenticated: false,
      style: {
        center: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
          marginBottom: '15px',
          fontFamily: 'Helvetica',
          color: '#FFFFFF',
          fontSize: '2em',
        },
        qr: {
          boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px',
          top: '100px',
          height: '350px',
          width: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }
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
      this.uportConnect();
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  uportConnect() {
    uport.requestCredentials({
      requested: ['name', 'avatar', 'country'],
      notifcations: true
    },
    (uri) => {

      const qr = kjua({
        text: uri,
        fill: '#000000',
        size: 300,
        back: '#ffffff'
      })

      // Create wrapping link for mobile touch
      let aTag = document.createElement('a')
      aTag.href = uri

      // Nest QR in <a> and inject
      aTag.appendChild(qr)
      document.querySelector('#kqr').appendChild(aTag)
    })
    .then((credentials) => {
      console.log("uport", credentials)
      this.props.dispatch(setUport(this.props.main.addr, credentials.name, credentials, this.state.uport))
      this.setState({authenticated: true})
    })
  }

  render() {
    if (this.state.authenticated) {
        return <Redirect to='/Dashboard'/>;
     }
    return (
      <div style={{height:`${this.state.height}px`, width:`${this.state.width}px`}}>
        <Toolbar />
        <div style={this.state.style.center}>
          Log in with uPort
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div id='kqr' style={this.state.style.qr}>
          </div>
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

const UPort = connect(mapStoreToProps)(UPortComponent)
export default UPort
