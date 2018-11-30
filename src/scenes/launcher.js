import React, { Component } from "react";

import Connect from "../stores/connect";

import Utils, { LINK } from "../utils";

import Configs from "../configs";

class Launcher extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await this.props.actions.storage.getAccessToken();
    await this.props.actions.authenticate.getAllProduct(
      this.props.storage.token
    );
    await this.props.actions.storage.getUser();
    let navigations = Configs["navigation"];
    let res = {};
    this.populate(navigations.items, [], res);
    this.props.actions.app.setNavigation(res);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.storage.token !== nextProps.storage.token) {
      if (nextProps.storage.token === "") {
        this.props.actions.app.navigate(Utils.link(LINK.LOGIN));
      }
    }
  }

  render() {
    return this.props.children;
  }

  populate(list, parents = [], res = {}) {
    let p = [];
    for (let i in list) {
      let detail = list[i];
      if (detail.route) {
        res[detail.route] = {
          ...detail,
          parents: parents,
        };
      } else {
        p = parents.slice();
        p.push(detail);
        this.populate(detail.items, p, res);
        p = [];
      }
    }
  }
}

export default Connect(Launcher);
