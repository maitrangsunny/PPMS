import React, { Component } from "react";

import Connect from "../../stores/connect";

import Layout from "../../components/layout";

import Cart from "./cart";
import Invoice from "./invoice";
import InvoiceDetail from "./invoice_detail";
import DebtList from './debt_list';
import OrderList from './order_list';
import PermanentlyDeletedProduct from './permanently_deleted_product';
import TemporaryDeletedProduct from './temporary_deleted_product';


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
        child = <Cart />;
        break;
      case "cong-no":
        child = <DebtList />;
        break;
      case "pending-order-list":
        child = <OrderList />;
        break;
      case "temporary-deleted-product":
        child = <TemporaryDeletedProduct />;
      break;
      case "permanently-deleted-product":
        child = <PermanentlyDeletedProduct />;
      break;
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
