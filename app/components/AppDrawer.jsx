import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer';
import AutoComplete from 'material-ui/AutoComplete';
import {List, ListItem} from 'material-ui/List';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import EditorChart from 'material-ui/svg-icons/editor/insert-chart';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, Dashboard, SimpleTable, GridListWidget, Home, Status, Charts, Analytics, Settings } from './index'

class AppDrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

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

const AppDrawer = connect(mapStoreToProps)(AppDrawerComponent)
export default AppDrawer
