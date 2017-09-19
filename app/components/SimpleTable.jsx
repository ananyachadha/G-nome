import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
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


  render() {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const SimpleTable = connect(mapStoreToProps)(SimpleTableComponent)
export default SimpleTable
