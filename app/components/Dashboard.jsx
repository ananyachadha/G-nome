import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, SimpleTable, GridListWidget } from './index'


class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: []
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

  handleUpdateInput(value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ]
    });
  }

  render() {
    return (
      <div style={{height:`${this.state.height}px`, width:`${this.state.width}px`, paddingLeft:256}}>
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
