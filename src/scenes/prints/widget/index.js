import React, { Component } from "react";

import Connect from "../../../stores/connect";

import Layout from "../../../components/layout";
import Utils, { LINK } from "../../../utils";
import List from "./print";

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List
        close={() => this.props.history.goBack()}
        id={this.props.match.params.action}
      />
    );
  }
}

export default Connect(Widget);
