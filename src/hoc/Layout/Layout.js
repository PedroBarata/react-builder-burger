import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  closeSideDrawerHandler = () => {
      this.setState({showSideDrawer: false});
  }
  
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    return (
      <>
        <Toolbar showSide={this.toggleSideDrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
