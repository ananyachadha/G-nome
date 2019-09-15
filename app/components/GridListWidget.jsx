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
          <img src={"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxuczp4PSJodHRwOi8vbnMuYWRvYmUuY29tL0V4dGVuc2liaWxpdHkvMS4wLyIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHJlcXVpcmVkRXh0ZW5zaW9ucz0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIj48L2ZvcmVpZ25PYmplY3Q+PGcgaTpleHRyYW5lb3VzPSJzZWxmIj48cGF0aCBkPSJNODksNjljMCwwLTguMS01LjktMTguNC02LjRjMi0xLjYsNC0zLjQsNS44LTUuNEM4Ny4xLDQ1LjEsODguNywyOSw4OC43LDI5cy0xNS44LDMuNS0yNi42LDE1LjZjLTEsMS4yLTIsMi40LTIuOSwzLjYgICAgYzAuNC0yLjgsMC42LTUuNywwLjYtOC43YzAtMjAuNC05LjgtMzctOS44LTM3cy05LjgsMTYuNi05LjgsMzdjMCwzLDAuMiw1LjksMC42LDguN2MtMC45LTEuMi0xLjgtMi40LTIuOS0zLjYgICAgQzI3LjEsMzIuNSwxMS4zLDI5LDExLjMsMjlzMS42LDE2LjEsMTIuNCwyOC4yYzEuOCwyLDMuOCwzLjgsNS44LDUuNEMxOS4yLDYzLjIsMTEsNjksMTEsNjlzOC45LDYuNSwyMCw2LjUgICAgYzIuNCwwLDQuNi0wLjMsNi43LTAuOGMtNC41LDUuMi01LjcsMTEuNS01LjcsMTEuNXM3LjgtMSwxMy41LTYuNGMwLjYtMC42LDEuMi0xLjIsMS43LTEuOGwtMC45LDE2LjVjLTAuMSwxLjYsMS4yLDMsMi44LDNoMS44ICAgIGMxLjYsMCwyLjktMS40LDIuOC0zTDUyLjgsNzhjMC41LDAuNiwxLjEsMS4yLDEuNywxLjhjNS43LDUuNCwxMy41LDYuNCwxMy41LDYuNHMtMS4yLTYuMy01LjctMTEuNWMyLjEsMC41LDQuNCwwLjgsNi43LDAuOCAgICBDODAsNzUuNSw4OSw2OSw4OSw2OXoiPjwvcGF0aD48L2c+PC9zd2l0Y2g+PC9zdmc+"} width='150px' height='150px' style={{paddingLeft:'25px', cursor: 'pointer'}}/>
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
