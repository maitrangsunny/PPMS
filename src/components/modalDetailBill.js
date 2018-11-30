/**
 * Created by Phuoc Minh on 12/14/2017.
 */
import React, { Component } from "react";
import Connect from "../stores/connect";
import BootstrapValidator from "../components/forms/bootstrap_validator";
import Data from "../scenes/account/components/table";
import serialize from "form-serialize";
import JarvisWidget from "../components/jarvis_widget";
import PrintTemplate from "react-print";
class BillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bref: "",
      data: props.data,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBref = this.handleChangeBref.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  };

  componentWillMount = () => {};

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.data.name,
      bref: nextProps.data.bref,
    });
  }
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeBref(event) {
    this.setState({ bref: event.target.value });
  }
  onSubmit(e) {
    // e.preventDefault();
    // let form = document.querySelector("#attributeForm");
    // var obj = serialize(form, { hash: true });
    // console.log(obj);
    // return false;
    window.matchMedia("print");
  }

  changeTitle = title => {
    alert("hehehehe");
    this.setState({ title });
  };

  print = () => {
    window.print();
  };

  render() {
    const { data } = this.state;
    return (
      <div
        className="modal fade"
        id="billModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Thông Tin Đơn Hàng {data.name}
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
                    <div className="widget-body no-padding ">
                      <BootstrapValidator>
                        <form
                          id="attributeForm"
                          className="smart-form"
                          data-bv-message="This value is not valid"
                          data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                          data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                          data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                        >
                          <fieldset>
                            <section className="form-group">
                              <label className="label">
                                Tên Khách Hàng : {data.name}
                              </label>
                            </section>
                          </fieldset>
                          <fieldset>
                            <section className="form-group">
                              <label className="label">
                                Số điện thoại : {data.phone}
                              </label>
                            </section>
                            <section className="form-group">
                              <label className="label">
                                Địa chỉ : {data.address}
                              </label>
                            </section>
                            <section className="form-group">
                              <label className="label">
                                Ghi chú : {data.note}
                              </label>
                            </section>
                            <section className="form-group">
                              <label className="label">
                                Tổng tiền : {data.amount}
                              </label>
                            </section>
                          </fieldset>

                          <fieldset>
                            <div className="panel">
                              <div className="panel-body">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                      <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Đơn vị</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Chi tiết</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data && data.po_product
                                        ? data.po_product.map((item, index) => (
                                            <tr key={index}>
                                              <th>{index}</th>
                                              <th>{item.name}</th>
                                              <th>{item.uom}</th>
                                              <th>{item.quantity}</th>
                                              <th>{item.price}</th>
                                              <th>{item.amount}</th>
                                              <th>{item.note}</th>
                                            </tr>
                                          ))
                                        : null}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <footer>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={this.onSubmit.bind(this)}
                            >
                              In Đơn Hàng
                            </button>
                          </footer>
                        </form>
                      </BootstrapValidator>
                    </div>
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
export default Connect(BillForm);
