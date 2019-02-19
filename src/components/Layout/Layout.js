import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  closeSideDrawerHandler = () => {
      this.setState({showSideDrawer: false});
  }

  render() {
    return (
      <>
        <Toolbar />
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
