import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import serialize from "form-serialize";
import BootstrapValidator from "../../components/forms/bootstrap_validator";
import FUNC from "../../utils";
class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      active: 0,
      showError: false,
      showSuccess: false,
      message: "",
    };
  }

  onSubmit(e) {
    this.setState({ showError: false, showSuccess: false });
    if (!FUNC.validateEmail(this.state.email)) {
      this.setState({ showError: true, message: "Định đạng email không đúng" });
      return;
    }
    if (this.state.password != this.state.confirmPassword) {
      this.setState({ showError: true, message: "Mật khẩu không trùng nhau" });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({ showError: true, message: "Mật khẩu ít nhất 6 ký tự" });
      return;
    }
    if (this.state.email == "") {
      this.setState({ showError: true, message: "Email không được bỏ trống" });
      return;
    }
    e.preventDefault();
    let form = document.querySelector("#smart-form");
    var obj = serialize(form, { hash: true });
    this.props.actions.authenticate.addUser(this.props.storage.token, obj);
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.addUser &&
      nextProps.authenticate.addUser.status == 403
    ) {
      this.setState({ showError: true, message: nextProps.authenticate.error });
      return;
    }
    if (
      nextProps.authenticate.addUser &&
      nextProps.authenticate.addUser.status == 401
    ) {
      this.setState({ showError: true, message: nextProps.authenticate.error });
      return;
    }
    if (
      nextProps.authenticate.addUser &&
      nextProps.authenticate.addUser.status == 200
    ) {
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        showSuccess: true,
        message: nextProps.authenticate.success,
      });
      return;
    }
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">Thêm tài khoản</h1>
          </div>
        </div>
        {this.state.showError ? (
          <section>
            <div className="alert alert-danger fade in">
              <i className="fa-fw fa fa-times" />
              <strong>Lỗi!</strong> {this.state.message}
            </div>
          </section>
        ) : this.state.showSuccess ? (
          <section>
            <div className="alert alert-success fade in">
              <i className="fa-fw fa fa-times" />
              <strong>Thành Công</strong> {this.state.message}
            </div>
          </section>
        ) : null}
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
            <h2>Thông tin tài khoản</h2>
          </header>
          <div>
            {/* widget content */}
            <div className="widget-body no-padding">
              <BootstrapValidator>
                <form
                  id="smart-form"
                  className="smart-form"
                  data-bv-message="This value is not valid"
                  data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                  data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                  data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                >
                  <fieldset>
                    <section className="form-group">
                      <label className="label">Email</label>
                      <label className="input">
                        <input
                          type="text"
                          className="input-xs"
                          name="name"
                          value={this.state.email}
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                          placeholder="Email"
                          data-bv-notempty="true"
                          data-bv-notempty-message="email không được bỏ trống"
                        />
                      </label>
                    </section>
                    <section className="form-group">
                      <label className="label">Password</label>
                      <label className="input">
                        <input
                          type="password"
                          className="input-xs"
                          name="pass"
                          value={this.state.password}
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                          placeholder="Mật khẩu"
                          data-bv-notempty="true"
                          data-bv-notempty-message="Mật khẩu không được bỏ trống"
                        />
                      </label>
                    </section>
                    <section className="form-group">
                      <label className="label">Xác nhận mật khẩu</label>
                      <label className="input">
                        <input
                          type="password"
                          className="input-xs"
                          value={this.state.confirmPassword}
                          onChange={e =>
                            this.setState({ confirmPassword: e.target.value })
                          }
                          placeholder="Xác nhận mật khẩu"
                          data-bv-notempty="true"
                          data-bv-notempty-message="Xác nhận mật khẩu không được bỏ trống"
                        />
                      </label>
                    </section>
                    <section className="form-group">
                      <label className="label">Tình trạng</label>
                      <label className="select">
                        <select
                          className="input-sm"
                          value={this.state.location}
                          name="active"
                          data-bv-field="color"
                          onChange={e =>
                            this.setState({
                              location: parseInt(e.target.value),
                            })
                          }
                        >
                          <option value={0}>Kích hoạt</option>
                          <option value={1}>Khóa</option>
                        </select>{" "}
                        <i />{" "}
                      </label>
                    </section>
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
    );
  }
}

export default Connect(AccountProfile);
