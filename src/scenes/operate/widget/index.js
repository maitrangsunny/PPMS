import React, { Component } from "react";

import Connect from "../../../stores/connect";

import Layout from "../../../components/layout";
import Utils, { LINK } from "../../../utils";

import List from "./widget_list";
import Add from "./widget_add";
import DebtList from "./debt_list";

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.match.params.action);
    let child = <div />;
    if (!this.props.match.params.action) {
      child = <List />;
    } else if (this.props.match.params.action === "them-moi") {
      child = <List />;
    } else {
      child = <List id={this.props.match.params.action} />;
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

export default Connect(Widget);
