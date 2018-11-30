import React, { Component, PureComponent } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import SmartNestable from "../../components/common/smart_nestable";
import BootstrapValidator from "../../components/forms/bootstrap_validator";
import serialize from "form-serialize";
import Loading from "../../components/loading";
import Utils from "../../utils";
import SuggesEditext from "../../components/suggestCustomer";

class ListProductAdmin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      data: [],
      listCustomer: [],
      listSelect: [],
      idCustomer: 0,
      keywords: "",
    };
  }

  componentWillMount = () => {};

  componentDidMount() {
    this.props.actions.admin.listCustomerAdmin(this.props.storage.token);
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.admin.listCustomerAdmin === "object" &&
      nextProps.admin.listCustomerAdmin.status == 200
    ) {
      this.setState({ data: nextProps.admin.listCustomerAdmin.data });
    }

    if (
      typeof nextProps.admin.detailCustomerAdmin === "object" &&
      nextProps.admin.detailCustomerAdmin.status == 200 &&
      !nextProps.admin.flagProductCustomer
    ) {
      this.props.actions.admin.setFlagProductCustomer(true);
      this.setState({ listCustomer: nextProps.admin.detailCustomerAdmin.data });
    }

    if (
      typeof nextProps.admin.deleteCustomerAdmin === "object" &&
      nextProps.admin.deleteCustomerAdmin.status == 200 &&
      !nextProps.admin.flagDeleteProduct
    ) {
      this.props.actions.admin.setFlagDeleteProduct(true);
      this.setState({ listCustomer: nextProps.admin.deleteCustomerAdmin.data });
    }
  }

  deleteProduct() {
    this.props.actions.admin.deleteProductCustomer(
      this.props.storage.token,
      this.state.idCustomer,
      this.state.listSelect,
      this.state.keywords
    );
  }

  submitSearch() {
    this.props.actions.admin.detailProductCustomer(
      this.props.storage.token,
      this.state.idCustomer,
      this.state.keywords
    );
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  dataReturn = value => {
    this.setState({ idCustomer: value.id });
  };

  render() {
    return (
      <div id="content">
        <Loading loading={this.state.loading} />
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Danh sách thuốc của cửa hàng
            </h1>
          </div>
        </div>
        <JarvisWidget editbutton={false} custombutton={false}>
          <header>
            <span className="widget-icon">
              <i className="fa fa-edit" />
            </span>
            <h2>Thông tin khách hàng</h2>
          </header>
          <div>
            {/* widget content */}
            <div className="no-padding">
              <form className="smart-form" id="search">
                <div className="row input-order">
                  <div className="col col-md-6 col-sm-6 col-xs-6">
                    <label className="input">
                      <h3>Tên cửa hàng :</h3>
                      <SuggesEditext
                        dataReturn={data => this.dataReturn(data)}
                        languages={this.state.data}
                        renderInputComponent={inputProps => (
                          <input
                            {...inputProps}
                            ref={c => (this._inputName = c)}
                          />
                        )}
                        value={this.state.nameCustomer || ""}
                      />
                    </label>
                  </div>

                  <div className="col col-md-6 col-sm-6 col-xs-6">
                    <label className="input">
                      <h3>Tìm kiếm thuốc :</h3>
                      <input
                        type="text"
                        name="t"
                        placeholder="Từ khóa"
                        value={this.state.keywords}
                        onChange={e =>
                          this.setState({ keywords: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
              <ul id="sparks" className="">
                <li className="sparks-info">
                  <button
                    onClick={() => this.submitSearch()}
                    type="button"
                    className="btn btn-success btn-lg"
                  >
                    Tìm Kiếm
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </JarvisWidget>
        {this.state.showError ? (
          <section>
            <div className="alert alert-danger fade in">
              <i className="fa-fw fa fa-times" />
              <strong>Lỗi!</strong> {this.props.product.error}
            </div>
          </section>
        ) : (
          <div id="content">
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 className="page-title txt-color-blueDark">
                  Danh sách thuốc của cửa hàng{" "}
                  {this.props.admin.detailCustomerAdmin
                    ? this.props.admin.detailCustomerAdmin.outlet.name
                    : ""}
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">
                  <li
                    onClick={() => this.deleteProduct()}
                    className="sparks-info"
                  >
                    <button type="button" className="btn btn-danger btn-lg">
                      Xóa
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <JarvisWidget editbutton={false} color="darken">
              <header>
                <span className="widget-icon">
                  <i className="fa fa-table" />
                </span>
                <h2>Danh sách</h2>
              </header>
              <div>
                <div className="custom-table-bill">
                  {this.NumberList(this.state.listCustomer)}
                </div>
              </div>
            </JarvisWidget>
          </div>
        )}
      </div>
    );
  }

  NumberList(data) {
    if (data.length > 0) {
      const listItems = data.map((item, index) => this.itemList(item, index));
      return <div>{listItems}</div>;
    }
    return;
  }

  itemList(item, index) {
    let flag = this.state.listSelect.indexOf(item.id) > -1;
    if (flag) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 10,
            marginBottom: 10,
            background: "#f0f0f0",
            flexDirection: "row",
            border: "2px solid #000",
            borderWidth: 1,
            alignItems: "center",
            padding: "20px 20px 20px 20px",
          }}
          key={index}
          onClick={() => this.selectCate(index, item.id)}
        >
          <h5 style={{ width: 100 }}>{index + 1}</h5>
          <h3 style={{ fontWeight: "300", flex: 1 }}>{item.name}</h3>
          <h5 style={{ flex: 1 }}>
            {this.format2(parseInt(item.price), "VNĐ")}
          </h5>
          <h5 style={{ flex: 1 }}>
            {Utils.getTime(parseInt(item.created_at))}
          </h5>
          <span className="glyphicon">&#xe067;</span>
        </div>
      );
    }
    return (
      <div
        onClick={() => this.selectCate(index, item.id)}
        style={{
          display: "flex",
          width: "100%",
          height: 10,
          marginBottom: 10,
          background: "#FFF",
          flexDirection: "row",
          border: "2px solid #9d9d9d",
          borderWidth: 1,
          alignItems: "center",
          padding: "20px 20px 20px 20px",
        }}
        key={index}
      >
        <h5 style={{ width: 100 }}>{index + 1}</h5>
        <h3 style={{ fontWeight: "300", flex: 1 }}>{item.name}</h3>
        <h5 style={{ flex: 1 }}>{this.format2(parseInt(item.price), "VNĐ")}</h5>
        <h5 style={{ flex: 1 }}>{Utils.getTime(parseInt(item.created_at))}</h5>
        <p>
          <span className="glyphicon glyphicon-unchecked" />
        </p>
      </div>
    );
  }

  selectCate(index, id) {
    let arrayData = this.state.listCustomer.slice();
    let arraySelect = this.state.listSelect.slice();

    let tempFlag = arrayData[index].is_enable || false;
    arrayData[index].is_enable = !tempFlag;

    let position = arraySelect.indexOf(id);
    if (position > -1) {
      arraySelect.splice(position, 1);
    } else {
      arraySelect.push(id);
    }
    this.setState({ listSelect: arraySelect, data: arrayData });
  }
}
export default Connect(ListProductAdmin);
