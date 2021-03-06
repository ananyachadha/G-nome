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
import Genome from '../../build/contracts/Genome.json'
import ETHQuery from 'ethjs-query'
import Contract from 'ethjs-contract'

const genomeAddr = "0xb395fb4e714a70f92a0259c6d999a87b2c3da1c3"

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
    this.getAccount();
    this.initializeGenome(genomeAddr);
    window.addEventListener("resizeGLW", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resizeGLW", this.updateDimensions.bind(this));
  }

  getAccount() {
    const self = this
    window.web3.eth.getAccounts(function(err, res) {
      self.setState({account: res})
    })
  }

  initializeContract() {
    if(window.web3) {
      const eth = new ETHQuery(window.web3.currentProvider)
      const contract = new Contract(eth)
      return contract
    }
  }

  initializeGenome(genomeAddr) {
    const contract = this.initializeContract();
    const GenomeContract = contract(Genome.abi);
    const genomeInstance = GenomeContract.at(genomeAddr);
    this.setState({genomeAddr: genomeAddr, genome: genomeInstance})
    return genomeInstance;
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
        console.log(resp[0].hash)
        let ipfsString = resp[0].hash;

        let storageObj = (self.props.ipfs.log) ? self.props.ipfs.log : {}
        storageObj[files[0].name] = resp[0].hash
        self.updateLog(storageObj)
        //submit transaction to the blockchain using metamask
        const genomeInstance = self.state.genome;
        genomeInstance.upload(ipfsString, {from: self.state.account[0]})
        .then(function(resp) {
          console.log("Transaction Hash:", resp)
          console.log("Submitted ipfs hash:", ipfsString)
        })
      })
    }
    reader.readAsArrayBuffer(files[0])
  }

  render() {
    const uploadImg = '../assets/upload.png'
    return (
      //submit transaction to the blockchain using metamask

      <div style={this.state.styles.root}>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <img src={"https://github.com/rbrtknwls/UofTHacks7/blob/master/img/credidicon.png?raw=true"} width='150px' height='150px' style={{paddingLeft:'25px', cursor: 'pointer'}}/>
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
