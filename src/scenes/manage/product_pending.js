import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import SmartNestable from "../../components/common/smart_nestable";
import BootstrapValidator from "../../components/forms/bootstrap_validator";
import serialize from "form-serialize";
import Loading from "../../components/loading";
import Utils from "../../utils";

class GeolocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      data: [],
      listSelect: [],
    };
  }

  componentWillMount = () => {
    this.props.actions.product.listProductPending(this.props.storage.token);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.product.listProductPending &&
      nextProps.product.listProductPending.status == 200 &&
      !nextProps.product.flagListPending
    ) {
      nextProps.actions.product.setFlagListPending();
      this.setState({
        showError: false,
        data: nextProps.product.listProductPending.data,
      });
    } else {
      this.setState({ showError: true });
    }

    if (
      nextProps.product.addPending &&
      nextProps.product.addPending.status == 200 &&
      !nextProps.product.flagAddPending
    ) {
      nextProps.actions.product.setFlagAddPending();
      this.setState({
        showError: false,
        data: nextProps.product.addPending.data,
      });
    } else {
      this.setState({ showError: false });
    }
    if (
      nextProps.product.deletePending &&
      nextProps.product.deletePending.status == 200 &&
      !nextProps.product.flagDeletePending
    ) {
      nextProps.actions.product.setFlagDeletePending();
      this.setState({
        showError: false,
        data: nextProps.product.deletePending.data,
      });
    } else {
      this.setState({ showError: false });
    }
  }

  addPending() {
    this.props.actions.product.addPending(
      this.props.storage.token,
      this.state.listSelect
    );
  }

  deletePending() {
    this.props.actions.product.deletePending(
      this.props.storage.token,
      this.state.listSelect,
    );
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  render() {
    return (
      <div id="content">
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
                  Danh sách chờ duyệt
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">
                  <li className="sparks-info">
                    <button
                      onClick={() => this.addPending()}
                      type="button"
                      className="btn btn-success btn-lg"
                    >
                      Thêm Mới
                    </button>
                  </li>
                  <li
                    onClick={() => this.deletePending()}
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
                  {this.NumberList(this.state.data)}
                </div>
              </div>
            </JarvisWidget>
          </div>
        )}
      </div>
    );
  }

  NumberList(data) {
    const listItems = data.map((item, index) => this.itemList(item, index));
    return <div>{listItems}</div>;
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
          <h5 style={{ flex: 1 }}>{item.outlet.name}</h5>
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
        <h5 style={{ flex: 1 }}>{item.outlet.name}</h5>
        <h5 style={{ flex: 1 }}>{Utils.getTime(parseInt(item.created_at))}</h5>
        <p>
          <span className="glyphicon glyphicon-unchecked" />
        </p>
      </div>
    );
  }

  selectCate(index, id) {
    let arrayData = this.state.data.slice();
    let arraySelect = this.state.listSelect.slice();

    let tempFlag = arrayData[index].is_check || false;
    arrayData[index].is_check = !tempFlag;

    let position = arraySelect.indexOf(id);
    if (position > -1) {
      arraySelect.splice(position, 1);
    } else {
      arraySelect.push(id);
    }
    this.setState({ listSelect: arraySelect, data: arrayData });
  }
}
export default Connect(GeolocationList);
