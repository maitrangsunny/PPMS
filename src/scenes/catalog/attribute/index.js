import React, { Component } from "react";

import Connect from "../../../stores/connect";

import Layout from "../../../components/layout";

import List from "./product_list";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    if (!this.props.match.params.action) {
      child = <List />;
    } else {
      child = <Add id={this.props.match.params.action} />;
    }
    return <Layout logout={() => this.setLogOut()}>{child}</Layout>;
  }

  setLogOut() {
    this.props.actions.storage.removeAccessToken();
    this.props.actions.storage.removeUser();
  }
}

export default Connect(Product);
