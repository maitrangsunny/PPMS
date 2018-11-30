/**
 * Created by Phuoc Minh on 12/14/2017.
 */
import React, { Component } from "react";
import Connect from "../stores/connect";
import BootstrapValidator from "../components/forms/bootstrap_validator";
import Data from "../scenes/account/components/table";
import serialize from "form-serialize";
import JarvisWidget from "../components/jarvis_widget";
class BillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bref: "",
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBref = this.handleChangeBref.bind(this);
  }

  componentWillMount = () => {
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.data.name,

      bref: nextProps.data.user_id,
    });
  }
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeBref(event) {
    this.setState({ bref: event.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    let form = document.querySelector("#attributeForm");
    var obj = serialize(form, { hash: true });
    return false;
  }
  render() {
    return (
      <div
        className="modal fade"
        id="customerModal"
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
                              <label className="label">Tên nhóm quyền</label>
                              <label className="input">
                                <input
                                  type="text"
                                  className="input-xs"
                                  name="name"
                                  value={this.state.name}
                                  onChange={this.handleChangeName}
                                  placeholder="Tên nhóm quyền"
                                  data-bv-notempty="true"
                                  data-bv-notempty-message="Tên nhóm quyền không được bỏ trống"
                                />
                              </label>
                            </section>
                            <section className="form-group">
                              <label className="label">Mô tả</label>
                              <label className="input">
                                <input
                                  type="text"
                                  className="input-xs"
                                  name="bref"
                                  value={this.state.bref}
                                  onChange={this.handleChangeBref}
                                  placeholder="Mổ tả"
                                  data-bv-notempty="true"
                                  data-bv-notempty-message="Mô tả không được bỏ trống"
                                />
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
                                        <td>Tên</td>
                                        <td>Read</td>
                                        <td>Write</td>
                                        <td>Execute</td>
                                        <td>All</td>
                                      </tr>
                                    </thead>
                                    <Data
                                      rows={this.props.data.permission}
                                      type={this.props.data.type}
                                    />
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
                              Xác nhận
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
