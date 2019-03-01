import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import Loading from "../../components/loading";
import serialize from "form-serialize";
import Modal from "react-modal";
import Utils, { LINK } from "../../utils";
import { Link } from "react-router-dom";
import SuggesEditext from "../../components/suggestCustomer";
import PrintTemplate from "react-print";
import UiDatepicker from "../../components/forms/date_picker";
import BillForm from "../../components/modalDetailBill";
class SearchCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      data: [],
      loading: false,
      dataCustomer: [],
      listCustomer: [],
      startDay: "",
      endDay: "",
      idCustomer: 0,
      idDetail: 0,
      selectData: [],
    };
  }

  afterOpenModal = () => {
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  async componentWillMount() {
    this.setState({ loading: true });
    await this.props.actions.authenticate.getAllCustomer(
      this.props.storage.token
    );
    await this.props.actions.authenticate.getListOrder(
      this.props.storage.token
    );
  }

  getTime(time) {
    var maxDate = new Date(time * 1000);
    var maxDateFormatted =
      this.pad(maxDate.getDate(), 2, "0") +
      "/" +
      this.pad(maxDate.getMonth() + 1, 2, "0") +
      "/" +
      maxDate.getFullYear()
      +
      " "
      +
      this.pad(maxDate.getHours(), 2, "0") +
      ":" +
      this.pad(maxDate.getMinutes(), 2, "0");
    return maxDateFormatted;
  }

  pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  detailOrder = id => {
    this.props.actions.authenticate.getDetailOrder(
      this.props.storage.token,
      id
    );
    this.setState({ modalIsOpen: true, idDetail: id });
  };

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
    if (
      nextProps.authenticate.listOrder &&
      nextProps.authenticate.listOrder.status == 200
    ) {
      this.setState({
        loading: false,
        dataCustomer: nextProps.authenticate.listOrder.data,
      });
    }

    if (
      nextProps.authenticate.detailCustomer &&
      nextProps.authenticate.detailCustomer.status == 200
    ) {
      this.setState({
        loading: false,
        dataCustomer: nextProps.authenticate.detailCustomer.data.order,
      });
    }
    if (
      nextProps.authenticate.allCustomer &&
      nextProps.authenticate.allCustomer.status == 200
    ) {
      this.setState({
        listCustomer: nextProps.authenticate.allCustomer.data,
      });
    }
    if (
      nextProps.product.listBill &&
      nextProps.product.listBill.status == 200
      //  && !nextProps.product.shortBill
    ) {
      this.setState({
        dataCustomer: nextProps.product.listBill.data,
        loading: false,
      });
      // nextProps.actions.product.setFlagShortBill();
    }
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  format3(n) {
    return n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,");
  }

  print() {
    window.print();
  }

  dataReturn = value => {
    this.setState({ idCustomer: value.id });
  };

  locData() {
    this.setState({ loading: true });
    this.props.actions.product.sortListBill(
      this.props.storage.token,
      this.state.idCustomer,
      this.state.startDay,
      this.state.endDay
    );
  }

  raiseInvoiceClicked() {
    const url = "https://ppms.vn&data=12";
    window.open(url, "_blank");
  }

  render() {
    return (
      <div id="content">
        {/* <div>
          <BillForm data={this.state.selectData} />
        </div> */}
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <div class="heading-info">
              <h1 className="page-title txt-color-blueDark page-title--mg">
                Danh Sách Đơn Hàng
              </h1>
              <div className="bt-solid"></div>
            </div>            
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <button
                  onClick={() =>
                    this.setState({
                      dataCustomer: this.props.authenticate.listOrder.data,
                    })
                  }
                  type="button"
                  className="btn btn-common btn-green btn-lg"
                >
                  Xem Tất Cả
                </button>
              </li>
            </ul>
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
                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Tên khách hàng :</h3>
                      <SuggesEditext
                        dataReturn={data => this.dataReturn(data)}
                        languages={this.state.listCustomer}
                        renderInputComponent={inputProps => (
                          <input
                            {...inputProps}
                            ref={c => (this._inputName = c)}
                          />
                        )}
                        value={this.state.nameCustomer}
                      />
                    </label>
                  </div>

                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Từ ngày :</h3>
                      <UiDatepicker
                        type="text"
                        name="finishdate"
                        id="startDay"
                        maxRestrict="#startdate"
                        placeholder="Từ ngày"
                        data-date-format="yy-mm-dd"
                        defaultValue={this.state.startDay}
                        onChange={e =>
                          this.setState({ startDay: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Đến ngày :</h3>
                      <UiDatepicker
                        type="text"
                        name="finishdate"
                        id="endDay"
                        maxRestrict="#endtdate"
                        placeholder="Đến ngày"
                        data-date-format="yy-mm-dd"
                        defaultValue={this.state.endDay}
                        onChange={e =>
                          this.setState({ endDay: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>
              </form>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul id="sparks" style={{textAlign: 'center', marginBottom: '10px'}}>
                  <li className="sparks-info">
                    <button
                      onClick={() => this.locData()}
                      type="button"
                      className="btn btn-common btn-green btn-lg"
                    >
                      Lọc
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </JarvisWidget>
        <JarvisWidget editbutton={false} color="darken">
          <header>
            <span className="widget-icon">
              <i className="fa fa-table" />
            </span>
            <h2>Danh sách đơn hàng</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <div className="custom-table-bill">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Ngày giao hàng</th>
                        <th>Số điện thoại</th>
                        <th>Note</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataCustomer
                        ? this.state.dataCustomer.map((item, index) => (
                            <tr key={index}>
                              <th>{item.name}</th>
                              <th>{item.address}</th>
                              <th>{this.getTime(item.delivery_date)}</th>
                              <th>{item.phone}</th>
                              <th>{item.note}</th>
                              <th style={{whiteSpace:'nowrap', width: '180px'}}>
                                <button
                                  className="btn btn-common btn-blue"
                                  type="button"
                                  onClick={() => this.detailOrder(item.id)}
                                >
                                  Chi tiết
                                </button>
                                {/* <button
                                  className="btn btn-success col-xs-offset-2"
                                  data-toggle="modal"
                                  data-target="#billModal"
                                  onClick={() => this.detailOrder(item.id)}
                                  // onClick={event =>
                                  //   this.setState({ selectData: item })
                                  // }
                                >
                                  Chi Tiết
                                </button> */}
                                <Link
                                  className="btn btn-common btn-orange"
                                  style={{marginLeft: '5px'}}
                                  to={Utils.link(LINK.WIDGET, item.id)
                                  }
                                >
                                  Chỉnh sửa
                                </Link>
                              </th>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </JarvisWidget>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={Modal.zeroStyle}
          style={{
            overlay: {
              position: "fixed",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              alignSelf: "center",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
			  padding: "20px",
			  transform: "translate(-50%, -50%)"
            },
          }}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div>
            <h4>Tên : {this.state.data.name}</h4>
            <h4>Địa chỉ :{this.state.data.address}</h4>
            <h4>Số điện thoại :{this.state.data.phone}</h4>
            <h4>
              Ngày đặt hàng :{this.getTime(this.state.data.delivery_date)}
            </h4>
            <h4>Ghi chú :{this.state.data.note}</h4>
            <h4 ref={subtitle => (this.subtitle = subtitle)}>
              Chi tiết đơn đặt hàng
            </h4>
            <div className="custom-table-list-bill">
              <table className="table table-bordered table-striped table-hover">
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
                    ? this.state.data.po_product.map((item, index) => (
                        <tr key={item.id}>
                          <th>{item.name}</th>
                          <th>{item.quantity}</th>
                          <th>{this.format3(parseInt(item.price))}</th>
                          <th>{this.format3(parseInt(item.amount))}</th>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            <h2>
              Tổng tiền đơn hàng :{" "}
              {this.format2(parseInt(this.state.data.amount), "VND")}
            </h2>
            <Link
              className="btn btn-info col-xs-offset-4"
              to={Utils.link(LINK.PRINT, this.state.idDetail)}
            >
              In Đơn Hàng
            </Link>
          </div>
        </Modal>
        <Loading loading={this.state.loading} />
      </div>
    );
  }
}

export default Connect(SearchCart);
