import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import serialize from "form-serialize";
import BootstrapValidator from "../../components/forms/bootstrap_validator";
class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      loading: false,
      showError: false,
      showSuccess: false,
      message: "",
    };
  }

  onSubmit(e) {
    this.setState({ showError: false, showSuccess: false });
    if (this.state.newPassword != this.state.confirmNewPassword) {
      this.setState({ message: "Mật khẩu không trùng nhau", showError: true });
      return;
    }
    if (this.state.newPassword.length < 6) {
      this.setState({
        message: "Mật khẩu phải ít nhất 6 ký tự",
        showError: true,
      });
      return;
    }
    if (this.state.oldPassword == "") {
      this.setState({
        message: "Mật khẩu không được bỏ trống",
        showError: true,
      });
      return;
    }
    e.preventDefault();
    let form = document.querySelector("#smart-form");
    var obj = serialize(form, { hash: true });
    this.props.actions.authenticate.changePasswordAdmin(
      this.props.storage.token,
      obj
    );
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.changePassword &&
      nextProps.authenticate.changePassword.status == 403
    ) {
      this.setState({ message: nextProps.authenticate.error, showError: true });
    }
    if (
      nextProps.authenticate.changePassword &&
      nextProps.authenticate.changePassword.status == 200
    ) {
      this.setState({
        message: nextProps.authenticate.success,
        showSuccess: true,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">Đổi mật khẩu</h1>
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
            <h2>Đổi mật khẩu</h2>
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
                      <label className="label">Mật khẩu cũ</label>
                      <label className="input">
                        <input
                          type="password"
                          className="input-xs"
                          name="oldPassword"
                          value={this.state.oldPassword}
                          onChange={e =>
                            this.setState({ oldPassword: e.target.value })
                          }
                          placeholder="OldPassword"
                          data-bv-notempty="true"
                          data-bv-notempty-message="Mật khẩu cũ"
                        />
                      </label>
                    </section>
                    <section className="form-group">
                      <label className="label">Mật khẩu mới</label>
                      <label className="input">
                        <input
                          type="password"
                          className="input-xs"
                          name="pass"
                          value={this.state.newPassword}
                          onChange={e =>
                            this.setState({ newPassword: e.target.value })
                          }
                          placeholder="Mật khẩu"
                          data-bv-notempty="true"
                          data-bv-notempty-message="Mật khẩu không được bỏ trống"
                        />
                      </label>
                    </section>
                    <section className="form-group">
                      <label className="label">Xác nhận mật khẩu mới</label>
                      <label className="input">
                        <input
                          type="password"
                          className="input-xs"
                          value={this.state.confirmNewPassword}
                          onChange={e =>
                            this.setState({
                              confirmNewPassword: e.target.value,
                            })
                          }
                          placeholder="Xác nhận mật khẩu"
                          data-bv-notempty="true"
                          data-bv-notempty-message="Xác nhận mật khẩu không được bỏ trống"
                        />
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
