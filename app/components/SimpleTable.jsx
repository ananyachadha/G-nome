import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { Toolbar } from './index'
import { updateLog } from '../actions/logAction'
import Genome from '../../build/contracts/Genome.json'
import ETHQuery from 'ethjs-query'
import Contract from 'ethjs-contract'

const genomeAddr = "0xb395fb4e714a70f92a0259c6d999a87b2c3da1c3"

class SimpleTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: [],
      styles: {
        openButton: {
          backgroundColor: '#00b2a9',
          color: '#FFFFFF',
          margin: '2px'
        }
      }
    };
  }

  componentDidMount() {
    this.getAccount();
    this.initializeGenome(genomeAddr);
  }

  openFile(e) {
    let open_link = window.open('','_blank');
    const ipfsFileHash = e.currentTarget.parentNode.parentNode.childNodes[1].innerHTML
    const fileLink = `https://ipfs.io/ipfs/${ipfsFileHash}`

    open_link.location=fileLink
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
    console.log(genomeInstance)
    this.setState({genomeAddr: genomeAddr, genome: genomeInstance})
    return genomeInstance;
  }

  validateTrue(key) {
    const self = this;
    const genomeInstance = this.state.genome;
    genomeInstance.getgenomeUser(0).then(function(response){
      genomeInstance.validate(true, response[0], {from: self.state.account[0]})
      .then(function(resp) {
        console.log("Transaction Hash:", resp)
        let log = self.props.ipfs.log;
        let newLog = delete log[key]
        self.props.dispatch(updateLog(log))
      })
    })

  }

  validateFalse() {

  }

  render() {
    let tableList
    if(this.props.ipfs.log)  {
      tableList = Object.keys(this.props.ipfs.log).map((k) => {
        return (
          <TableRow key={k}>
            <TableHeaderColumn>{k}</TableHeaderColumn>
            <TableRowColumn>{this.props.ipfs.log[k]}</TableRowColumn>
            <TableRowColumn style={{textAlign:'right'}}>
              <FlatButton label="Open" onClick={this.openFile.bind(this)} style={this.state.styles.openButton}/>
              <FlatButton id={k} label="Yes" onClick={this.validateTrue.bind(this, k)} style={this.state.styles.openButton}/>
              <FlatButton label="No" onClick={this.validateFalse.bind(this)} style={this.state.styles.openButton}/>
            </TableRowColumn>
          </TableRow>
        )
      })
    }
    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>IPFS Hash</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { tableList }
          </TableBody>
        </Table>
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

const SimpleTable = connect(mapStoreToProps)(SimpleTableComponent)
export default SimpleTable
