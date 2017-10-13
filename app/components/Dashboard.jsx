import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, SimpleTable, GridListWidget } from './index'


class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: [],
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount() {
      window.addEventListener("resizeDB", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resizeDB", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256, overflowY:'auto'}}>
        <GridListWidget />
        <SimpleTable />
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Dashboard = connect(mapStoreToProps)(DashboardComponent)
export default Dashboard
