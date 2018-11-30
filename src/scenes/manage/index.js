import React, { Component } from "react";

import Connect from "../../stores/connect";

import Layout from "../../components/layout";

import Add from "./product_pending";
import List from "./list_user";
import DeleteProduct from "./deleteProduct";
import ListProductCustomer from "./listProductCustomer";
class AccountList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let child = <div />;
    switch (this.props.match.params.action) {
      case "list":
        child = <List />;
        break;
      case "pending-product":
        child = <Add />;
        break;
      case "delete-product":
        child = <DeleteProduct />;
      case "list-product-customer":
        child = <ListProductCustomer />;
        break;
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

export default Connect(AccountList);
