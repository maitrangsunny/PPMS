import React, { Component } from "react";

import Utils, { LINK } from "../../../utils";
import { Link } from "react-router-dom";
import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";
import Loading from "../../../components/loading";
import Paginate from "../../../components/paginate";
import serialize from "form-serialize";
import Modal from "react-modal";
import ModalDelete from "../../../components/modalDelete";
import CustomerModal from "../../../components/modalDetailCustomer";
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
		loading: false,
		data: [],
		listCustomer: [],
		modalIsOpen: false,
		modalDeleteCustomer: false,
		idDelete: 0,
    };
    this.detailCustomer = this.detailCustomer.bind();
  }

  async componentWillMount() {
    this.setState({ loading: true });
    await this.props.actions.authenticate.getAllCustomer(
      this.props.storage.token
    );
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  async deleteCustomer(id) {
    await this.props.actions.authenticate.deleteCustomer(
      this.props.storage.token,
      id
    );
  }

  detailCustomer = id => {
    this.setState({ modalIsOpen: true });
    this.props.actions.authenticate.detailCustomer(
      this.props.storage.token,
      id
    );
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.allCustomer &&
      nextProps.authenticate.allCustomer.status == 200
    ) {
      this.setState({
        listCustomer: nextProps.authenticate.allCustomer.data,
        loading: false,
      });
    }
    if (
      nextProps.authenticate.detailCustomer &&
      nextProps.authenticate.detailCustomer.status == 200
    ) {
      this.setState({
        data: nextProps.authenticate.detailCustomer.data,
      });
    }
    if (
      nextProps.authenticate.deleteCustomer &&
      nextProps.authenticate.deleteCustomer.status == 200 &&
      !nextProps.authenticate.flagDeleteCustomer
    ) {
      this.props.actions.authenticate.setFlagDeleteCustomer(true);
      this.props.actions.authenticate.getAllCustomer(this.props.storage.token);
      this.setState({
        modalDeleteCustomer: false,
        idDelete: 0,
      });
    }
  }

  pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  getTime(time) {
    var maxDate = new Date(time * 1000);
    var maxDateFormatted =
      this.pad(maxDate.getDate(), 2, "0") +
      "/" +
      this.pad(maxDate.getMonth() + 1, 2, "0") +
      "/" +
      maxDate.getFullYear();
    return maxDateFormatted;
  }

  render() {
    return (
      <div id="content">
        <Loading loading={this.state.loading} />
        {/* <div>
          <CustomerModal data={"asdasda1111s"} />
        </div> */}
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Danh sách khách hàng
            </h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info" />
            </ul>
          </div>
        </div>
        <JarvisWidget editbutton={false} color="darken">
          <header>
            <span className="widget-icon">
              <i className="fa fa-table" />
            </span>
            <h2>Danh sách nội dung</h2>
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
                        <th>email</th>
                        <th>Số điện thoại</th>
                        <th>Note</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listCustomer &&
                      this.state.listCustomer.length > 0
                        ? this.state.listCustomer.map((item, index) => (
                            <tr key={index}>
                              <th>{item.name}</th>
                              <th>{item.address}</th>
                              <th>{item.email}</th>
                              <th>{item.phone}</th>
                              <th>{item.note}</th>
                              <th>
                                <button
                                  className="btn btn-success col-xs-offset-1"
                                  type="button"
                                  onClick={() => this.detailCustomer(item.id)}
                                >
                                  Chi tiết
                                </button>
                                {/* <button
                                  className="btn btn-success col-xs-offset-2"
                                  data-toggle="modal"
                                  data-target="#customerModal"
                                  // onClick={() => alert("asdasd")}
                                >
                                  {" "}
                                  Chi Tiết
                                </button> */}
                                <button
                                  className="btn btn-info col-xs-offset-1"
                                  onClick={() =>
                                    this.setState({
                                      idDelete: item.id,
                                      modalDeleteCustomer: true,
                                    })
                                  }
                                >
                                  Xóa
                                </button>
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
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              alignSelf: "center",
            },
            content: {
              position: "absolute",
              top: "30%",
              left: "40%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div>
            <h4>Tên : {this.state.data.name}</h4>
            <h4>Địa chỉ :{this.state.data.address}</h4>
            <h4>Số điện thoại :{this.state.data.phone}</h4>
            <h4>Ghi chú :{this.state.data.note}</h4>
            <h4 ref={subtitle => (this.subtitle = subtitle)}>
              Danh sách đơn hàng đã đặt
            </h4>
            {this.state.data.order && this.state.data.order.length > 0 ? (
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>SĐT</th>
                    <th>Tổng tiền</th>
                    <th>Ngày giao hàng</th>
                    <th>Ghi chí</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.order.map((item, index) => (
                    <tr key={index}>
                      <th>{item.name}</th>
                      <th>{item.address}</th>
                      <th>{item.phone}</th>
                      <th>{item.amount}</th>
                      <th>{this.getTime(item.delivery_date)}</th>
                      <th>{item.note}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Khách hàng này chưa có đơn đặt hàng nào</div>
            )}
            <Link
              className="btn btn-info col-xs-offset-2"
              to={Utils.link(LINK.DETAIL_CUSTOMER, this.state.data.id)}
            >
              Đơn hàng đã mua
            </Link>
          </div>
        </Modal>
        <ModalDelete
          status={this.state.modalDeleteCustomer}
          actionLeft={() => this.setState({ modalDeleteCustomer: false })}
          actionRight={() => this.deleteCustomer(this.state.idDelete)}
        />
      </div>
    );
  }
}

export default Connect(ProductList);
