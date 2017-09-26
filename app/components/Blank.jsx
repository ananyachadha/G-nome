import React, { Component } from 'react'
import { connect } from 'react-redux'

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Chart = connect(mapStoreToProps)(ChartComponent)
export default Chart
