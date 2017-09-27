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

class SimpleTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: []
    };
  }

  openFile(e) {
    let open_link = window.open('','_blank');
    const ipfsFileHash = e.currentTarget.parentNode.parentNode.childNodes[1].innerHTML
    const fileLink = `https://ipfs.io/ipfs/${ipfsFileHash}`

    open_link.location=fileLink
  }

  render() {
    // let nameArray = Object.keys(this.props.ipfs.log)
    // let logArray = nameArray.map((k) => this.props.ipfs.log[k])
    let tableList
    if(this.props.ipfs.log)  {
      tableList = Object.keys(this.props.ipfs.log).map((k) => {
        return (
          <TableRow key={k}>
            <TableHeaderColumn>{k}</TableHeaderColumn>
            <TableRowColumn>{this.props.ipfs.log[k]}</TableRowColumn>
            <TableRowColumn><FlatButton label="Open" onClick={this.openFile.bind(this)}/></TableRowColumn>
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
              <TableHeaderColumn>Status</TableHeaderColumn>
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
