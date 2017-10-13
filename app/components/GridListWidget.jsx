import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux'
import { Connect } from 'uport-connect'
import { uport } from '../uport.js'
import { updateLog } from '../actions/logAction'
import Dropzone from 'react-dropzone'
import CryptoJS from 'crypto-js'
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

class GridListWidgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: [],
      styles: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          height: '250px'
        },
        gridList: {
          display: 'flex',
          flexWrap: 'nowrap',
          paddingLeft: '15px',
          paddingRight: '15px'
        },
        titleStyle: {
          color: 'rgb(0, 188, 212)',
        },
      }
    };
  }

  updateDimensions() {
      this.setState({width: window.innerWidth-256, height: window.innerHeight});
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount() {
      window.addEventListener("resizeGLW", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resizeGLW", this.updateDimensions.bind(this));
  }

  updateLog(storageObj) {
    localStorage.setItem('ipfsLog', JSON.stringify(storageObj))
    this.props.dispatch(updateLog(storageObj))
  }

  onDrop(files) {
    let self = this
    const reader = new FileReader()
    reader.onload = function () {
      const bufferedArray = new Buffer(reader.result)
      localStorage.setItem("bufferedArray", bufferedArray)
      ipfs.add(bufferedArray)
      .then((resp) => {
        let storageObj = (self.props.ipfs.log) ? self.props.ipfs.log : {}
        storageObj[files[0].name] = resp[0].hash
        self.updateLog(storageObj)
      })
    }
    reader.readAsArrayBuffer(files[0])
  }

  render() {
    const uploadImg = '../assets/upload.png'
    return (
      <div style={this.state.styles.root}>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <img src={"https://image.flaticon.com/icons/png/512/12/12313.png"} width='150px' height='150px' style={{paddingLeft:'25px', cursor: 'pointer'}}/>
          <p style={{marginTop:'auto', textAlign:'center', fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Upload to <img src={"https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/02/1456818734ipfs-logo.png"} width='80px' height='30px'/></p>
        </Dropzone>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main,
    ipfs: store.ipfs
  }
}

const GridListWidget = connect(mapStoreToProps)(GridListWidgetComponent)
export default GridListWidget
