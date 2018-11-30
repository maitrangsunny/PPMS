import React, { Component } from "react";
import Modal from "react-modal";
import Connect from "../../../stores/connect";
import SuggesEditext from "../../../components/suggestCustomer";
import Paginate from "../../../components/paginate";
import Autosuggest from "react-autosuggest";
import UiDatepicker from "../../../components/forms/date_picker";
import Loading from "../../../components/loading";
import Utils, { BIGBOX, LINK } from "../../../utils";
import { Link } from "react-router-dom";
import index from "../../../stores/states/authenticate/index";
import Cleave from "cleave.js/react";
import BootstrapValidator from "../../../components/forms/bootstrap_validator";
import Data from "../../../scenes/account/components/table";
import serialize from "form-serialize";
import JarvisWidget from "../../../components/jarvis_widget";
import PrintTemplate from "react-print";
var Router = require("react-router");
var History = Router.History;
class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.detailOrder &&
      nextProps.authenticate.detailOrder.status == 200 &&
      !nextProps.authenticate.flagDetailBill
    ) {
      nextProps.actions.authenticate.setFlagDetailBill(true);
      this.setState({
        data: nextProps.authenticate.detailOrder.data,
        // selectData: nextProps.authenticate.detailOrder.data,
      });
    }
  }

  componentWillMount() {
    this.props.actions.authenticate.getDetailOrder(
      this.props.storage.token,
      this.props.id
    );
  }

  getTime(time) {
    var maxDate = new Date(time * 1000);
    var maxDateFormatted =
      this.pad(maxDate.getDate(), 2, "0") +
      "/" +
      this.pad(maxDate.getMonth() + 1, 2, "0") +
      "/" +
      maxDate.getFullYear() +
      " " +
      this.pad(maxDate.getHours(), 2, "0") +
      ":" +
      this.pad(maxDate.getMinutes(), 2, "0");
    return maxDateFormatted;
  }

  pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  format3(n) {
    return n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,");
  }

  printData() {
    var divToPrint = document.getElementById("printTable");
    let newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  render() {
    return (
      <div role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={() => this.props.close()}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Thông Tin Đơn Hàng
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <JarvisWidget
                  colorbutton={false}
                  editbutton={false}
                  custombutton={false}
                >
                  <header>
                    <span className="widget-icon">
                      {" "}
                      <i className="fa fa-edit" />{" "}
                    </span>
                    <h2>Thông tin chi tiết</h2>
                  </header>
                  <div>
                    {/* widget content */}
                    <div id="printTable" className="widget-body no-padding ">
                      <BootstrapValidator>
                        <form
                          id="attributeForm"
                          className="smart-form"
                          data-bv-message="This value is not valid"
                          data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                          data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                          data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                        >
                          <div>
                            <h4>Tên : {this.state.data.name}</h4>
                            <h4>Địa chỉ : {this.state.data.address}</h4>
                            <h4>Số điện thoại : {this.state.data.phone}</h4>
                            <h4>
                              Ngày đặt hàng :{" "}
                              {this.getTime(this.state.data.delivery_date)}
                            </h4>
                            <h4>Ghi chú : {this.state.data.note}</h4>
                            <h4 ref={subtitle => (this.subtitle = subtitle)}>
                              Chi tiết đơn đặt hàng
                            </h4>
                          </div>
                          <div className="panel">
                            <div className="panel-body">
                              <div className="table-responsive">
                                <table
                                  style={{
                                    textAlign: "center",
                                  }}
                                  border="1"
                                  cellpadding="8"
                                  className="table table-striped table-bordered table-hover"
                                >
                                  <thead>
                                    <tr>
                                      <th>Tên</th>
                                      <th>Số lượng</th>
                                      <th>Giá</th>
                                      <th>Thành tiền</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.data.po_product &&
                                    this.state.data.po_product.length > 0
                                      ? this.state.data.po_product.map(
                                          (item, index) => (
                                            <tr>
                                              <td>{item.name}</td>
                                              <td>{item.quantity}</td>
                                              <td>
                                                {this.format3(
                                                  parseInt(item.price)
                                                )}
                                              </td>
                                              <td>
                                                {this.format3(
                                                  parseInt(item.amount)
                                                )}
                                              </td>
                                            </tr>
                                          )
                                        )
                                      : null}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <h4>
                            Total :
                            {this.format2(
                              parseInt(this.state.data.amount),
                              "VND"
                            )}
                          </h4>
                          <footer />
                        </form>
                      </BootstrapValidator>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary pull-right"
                      onClick={() => this.printData()}
                    >
                      Xác nhận In
                    </button>
                  </div>
                </JarvisWidget>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Connect(Print);
