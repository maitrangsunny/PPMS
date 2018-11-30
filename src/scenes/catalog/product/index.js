import React, { Component } from "react";

import Connect from "../../../stores/connect";

import Layout from "../../../components/layout";

import List from "./product_list";
import Add from "./product_add";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    if (!this.props.match.params.action) {
      child = <List />;
    } else if (this.props.match.params.action === "them-moi") {
      child = <Add />;
    } else {
      child = <Add id={this.props.match.params.action} />;
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

export default Connect(Product);
