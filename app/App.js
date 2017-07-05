import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from './actions/userAction'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppDrawer, Toolbar } from './components/index'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(setUser('111111', 'Testing dispatch'))
  }

  render() {
      return (
        <div>
          <Toolbar />
          <AppDrawer />
          {this.props.main.name}
        </div>
      )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

export default connect(mapStoreToProps)(App)
