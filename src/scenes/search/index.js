import React, { Component } from "react";

import Connect from "../../stores/connect";

import Layout from "../../components/layout";

import Cart from "./cart";
import Invoice from "./invoice";
import InvoiceDetail from "./invoice_detail";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    switch (this.props.match.params.action) {
      case "gio-hang":
        child = <Invoice />;
        break;
      case "don-hang":
        child = <Invoice />;
      case "chi-tiet-khach-hang":
        child = this.props.match.params.id ? (
          <Cart id={this.props.match.params.id} />
        ) : (
          <Cart />
        );
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

export default Connect(Search);
