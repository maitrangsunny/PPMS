import React, { Component } from "react";

import Connect from "../../../stores/connect";

import Layout from "../../../components/layout/index";

import List from "./list";
import Add from "./add";

class Stock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    let action = this.props.match.params.action;
    // console.log(action)
    if (action === "danh-sach") {
      child = <List />;
    } else if (action === "them-moi") {
      child = <Add />;
    } else {
      child = <Add id={action} />;
    }
    return (
      <Layout
        logout={() => {
          this.props.actions.storage.removeAccessToken(),
            this.props.actions.storage.removeUser();
        }}
      >
        {child}
      </Layout>
    );
  }
}

export default Connect(Stock);
