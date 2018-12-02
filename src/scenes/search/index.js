import React, { Component } from "react";

import Connect from "../../stores/connect";

import Layout from "../../components/layout";

import Cart from "./cart";
import Invoice from "./invoice";
import InvoiceDetail from "./invoice_detail";
import Debt_List from './debt_list';


class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    console.log('asdhasdjasdasdasd',this.props.match.params.action)
    switch (this.props.match.params.action) {
      case "gio-hang":
        child = <Invoice />;
        break;
      case "don-hang":
        child = <Cart />;
        break
      case "cong-no":
        child = <Debt_List />;
        break
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
