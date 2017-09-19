import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux'

class GridListWidgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataSource: [],
      styles: {
        root: {
          display: 'flex',
          flexWrap: 'wrap'
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

  render() {
    return (
      <div style={this.state.styles.root}>
        <GridList style={this.state.styles.gridList} cols={1.1}>
          <GridTile
            key={"adsfasf"}
            titleStyle={this.state.styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={"https://consensys.net/img/logo.svg"} />
          </GridTile>
        </GridList>
        <GridList style={this.state.styles.gridList} cols={1.1}>
          <GridTile
            key={"adsfasf"}
            titleStyle={this.state.styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={"https://consensys.net/img/logo.svg"} />
          </GridTile>
        </GridList>
        <GridList style={this.state.styles.gridList} cols={1.1}>
          <GridTile
            key={"adsfasf"}
            titleStyle={this.state.styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={"https://consensys.net/img/logo.svg"} />
          </GridTile>
        </GridList>
        <GridList style={this.state.styles.gridList} cols={1.1}>
          <GridTile
            key={"adsfasf"}
            titleStyle={this.state.styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={"https://consensys.net/img/logo.svg"} />
          </GridTile>
        </GridList>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const GridListWidget = connect(mapStoreToProps)(GridListWidgetComponent)
export default GridListWidget
