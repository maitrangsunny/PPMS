import React, { Component } from "react";

import serialize from "form-serialize";
import Utils, { LINK } from "../../utils";
import FUNC from "../../utils";
import Connect from "../../stores/connect";
import Loading from "../../components/loading";
import {Tabs, Tab} from "react-bootstrap";

const styleText = {
  color: "#3677af",
  fontWeight: "normal",
  margin: 15,
  fontSize: 18,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      showSuccess: false,
      email: "",
      password: "",
      registerName: "",
      registerEmail: "",
      resigterPass: "",
      confirmPass: "",
      register: false,
      renderDangNhap: true,
      forgotPassword: false,
      inputForgotPassword: "",
      loading: false,
      passCode: false,

      passCode: "",
      passEmail: "",
      passPass: "",
      passPassEmail: "",
    };
  }

  handleLogin(e) {
    if (this.state.email == "") {
      alert("Email không được để trống");
      return;
    }
    if (!FUNC.validateEmail(this.state.email)) {
      alert("Định dạng email không chính xác");
      return;
    }
    if (this.state.password == "") {
      alert("Password không được để trống");
      return;
    } else {
      this.setState({ showError: false, showSuccess: false });
      e.preventDefault();
      const form = document.querySelector("#login-form");
      const data = serialize(form, { hash: true });
      this.props.actions.authenticate.login(data);
    }
  }

  switchRoute(e){
    // this.props.actions.app.navigate(Utils.link(LINK.ADD_CUSTOMER_PAGE));
    this.props.actions.app.navigate(Utils.link(LINK.STORE));
   
  }

  handerRegister(e) {
    if (this.state.resigterPass !== this.state.confirmPass) {
      alert("Mật khẩu phải giống nhau");
      return;
    }
    if (this.state.resigterPass.length < 6) {
      alert("Mật khẩu ít nhất 6 ký tự");
      return;
    } else {
      this.setState({
        register: true,
        loading: true,
        showError: false,
        showSuccess: false,
      });
      this.setState({ showError: false, showSuccess: false });
      e.preventDefault();
      const form = document.querySelector("#register-form");
      const data = serialize(form, { hash: true });
      this.props.actions.authenticate.register(data);
    }
  }

  handleForgot(e) {
    this.setState({ loading: true, showError: false, showSuccess: false });
    this.props.actions.authenticate.sendCodePassword(
      this.state.inputForgotPassword
    );
  }

  handelSendCode(e) {
    if (this.state.passCode == "") {
      alert("Mã code không để trống");
      return;
    }
    if (
      this.state.passEmail == "" ||
      !FUNC.validateEmail(this.state.passEmail)
    ) {
      alert("Email không đúng");
      return;
    }
    if (this.state.passPass.length < 6) {
      alert("Mật khẩu phải nhiều hơn 6 ký tự ");
      return;
    }
    if (this.state.passPass != this.state.passPassEmail) {
      alert("Mật khẩu không trùng nhau");
      return;
    } else {
      this.setState({ loading: true, showError: false, showSuccess: false });
      this.props.actions.authenticate.resetPassword(
        this.state.passCode,
        this.state.passEmail,
        this.state.passPass
      );
    }
  }

  componentWillReceiveProps(nextProps) {
	if (
   	  nextProps.authenticate.login &&
      nextProps.authenticate.login.status == 200 &&
      !nextProps.authenticate.flagLogin
    ) {
      this.props.actions.storage.setUser(nextProps.authenticate.login);
      this.props.actions.storage.setAccessToken(nextProps.authenticate.token);
      this.props.actions.app.navigate(Utils.link(LINK.DASHBOARD));
      this.props.actions.authenticate.setFlagLogin(true);
      this.setState({ loading: false });
    }
    if (
      nextProps.authenticate.login &&
      nextProps.authenticate.login.status == 401 &&
      !nextProps.authenticate.flagLogin
    ) {
      this.setState({ loading: false, showError: true });
    }
    if (
      nextProps.authenticate.register &&
      nextProps.authenticate.register.status == 200 &&
      !nextProps.authenticate.flagRegister
    ) {
      this.props.actions.authenticate.setFlagRegister(true);
      this.setState({ register: false, loading: false, showSuccess: true });
    }
    if (
      nextProps.authenticate.register &&
      nextProps.authenticate.register.status == 401
    ) {
      this.setState({ loading: false, showError: true });
    }
    if (
      nextProps.authenticate.sendCode &&
      nextProps.authenticate.sendCode.status == 200 &&
      !nextProps.authenticate.flagSendCode
    ) {
      this.props.actions.authenticate.setFlagSendCode(true);
      this.setState({
        showSuccess: true,
        showError: false,
        loading: false,
        passCode: true,
        forgotPassword: false,
      });
    }
    if (
      nextProps.authenticate.resetPass &&
      nextProps.authenticate.resetPass.status == 200 &&
      !nextProps.authenticate.flagResetPass
    ) {
      this.props.actions.authenticate.setFlagResetPass(true);
      this.setState({ loading: false, showSuccess: true, passCode: false });
    }
    if (
      nextProps.authenticate.resetPass &&
      nextProps.authenticate.resetPass.status == 401
    ) {
      this.setState({ loading: false, showError: true });
    }
    if (
      nextProps.authenticate.sendCode &&
      nextProps.authenticate.sendCode.status == 401
    ) {
      this.setState({ loading: false, showError: true, showSuccess: false });
    }
  }

  updateInputValue(evt) {
    this.setState({
      email: evt.target.value,
    });
  }

  updateInputValuePassword(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  updateInputForgotPassword(evt) {
    this.setState({
      inputForgotPassword: evt.target.value,
    });
  }

  render() {
    return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">
          {/* <div id="logo-group" /> */}
        </header>
        <div id="main" role="main" className="animated fadeInDown">
          <Loading loading={this.state.loading} />
          <div id="content" className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                <img
                  style={{ width: 250, height: 80, resizeMode: "contain" }}
                  src="/assets/img/logo.jpg"
                  alt="PPMS"
                />{" "}
                <h1 className="txt-color-blue login-header-big">PPMS</h1>
                <div className="hero">
                  <div className="pull-left login-desc-box-l">
                    <h4 style={styleText}>
                      {" "}
                      - Tiết kiệm 80% thời gian làm đơn hàng{" "}
                    </h4>
                    <h4 style={styleText}> - In đơn hàng ngay </h4>
                    <h4 style={styleText}> - Thống kê doanh số </h4>
                    <h4 style={styleText}> - Thống kê đơn hàng </h4>
                    <h4 style={styleText}> - Quản lý mọi lúc mọi nơi </h4>
                  </div>
                  <img
                    src="/assets/img/demo/iphoneview.png"
                    className="pull-right display-image"
                    alt=""
                    style={{ width: "210px" }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div className="well no-padding">
                  {this.state.register ? (

                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title="Đăng ký quản lý">
                        <form id="register-form" className="smart-form client-form">
                          <header>Vui lòng điền thông tin</header>
                          <fieldset>
                            {this.state.showError ? (
                              <section>
                                <div className="alert alert-danger fade in">
                                  <i className="fa-fw fa fa-times" />
                                  <strong>Lỗi!</strong>{" "}
                                  {this.props.authenticate.error}
                                </div>
                              </section>
                            ) : this.state.showSuccess ? (
                              <section>
                                <div className="alert alert-success fade in">
                                  <i className="fa-fw fa fa-times" />
                                  <strong>Thành Công</strong>{" "}
                                  {this.props.authenticate.success}
                                </div>
                              </section>
                            ) : null}
                            <section>
                              <label className="label">Tên</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="email"
                                  onChange={abc =>
                                    this.setState({
                                      registerName: abc.target.value,
                                    })
                                  }
                                  name="name"
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>

                            <section>
                              <label className="label">Email</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="email"
                                  onChange={abc =>
                                    this.setState({
                                      registerEmail: abc.target.value,
                                    })
                                  }
                                  name="email"
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>
                            <section>
                              <label className="label">Mật khẩu</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-lock" />
                                <input
                                  type="password"
                                  name="password"
                                  onChange={def =>
                                    this.setState({
                                      resigterPass: def.target.value,
                                    })
                                  }
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-minlength="3"
                                  data-maxnlength="20"
                                  data-message="Please enter your email password"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-lock txt-color-teal" /> Mật
                                  khẩu
                                </b>{" "}
                              </label>
                            </section>
                            <section>
                              <label className="label">Xác nhận mật khẩu</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="password"
                                  onChange={abc =>
                                    this.setState({ confirmPass: abc.target.value })
                                  }
                                  name="xacnhan"
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>
                            <section>
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  name="remember"
                                  defaultChecked={true}
                                />
                                <i />Stay signed in
                              </label>
                            </section>
                          </fieldset>
                          <footer>
                            <button
                              type="button"
                              className="btn btn-common btn-blue"
                              onClick={evt => this.handerRegister(evt)}
                            >
                              Đăng ký
                            </button>
                            <a onClick={() => this.setState({ register: false })}>
                              Đã có tài khoản ? Đăng nhập
                            </a>
                          </footer>
                        </form>
                      </Tab>
                    <Tab eventKey={2} title="Đăng ký thành viên">
                      <form id="register-form" className="smart-form client-form">
                          <header>Vui lòng điền thông tin</header>
                          <fieldset>
                            {this.state.showError ? (
                              <section>
                                <div className="alert alert-danger fade in">
                                  <i className="fa-fw fa fa-times" />
                                  <strong>Lỗi!</strong>{" "}
                                  {this.props.authenticate.error}
                                </div>
                              </section>
                            ) : this.state.showSuccess ? (
                              <section>
                                <div className="alert alert-success fade in">
                                  <i className="fa-fw fa fa-times" />
                                  <strong>Thành Công</strong>{" "}
                                  {this.props.authenticate.success}
                                </div>
                              </section>
                            ) : null}
                            <section>
                              <label className="label">Tên</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="email"
                                  
                                  name=""
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>

                            <section>
                              <label className="label">Email</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="email"
                                
                                  name=""
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>
                            <section>
                              <label className="label">Mật khẩu</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-lock" />
                                <input
                                  type="password"
                                  name=""
                                  
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-minlength="3"
                                  data-maxnlength="20"
                                  data-message="Please enter your email password"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-lock txt-color-teal" /> Mật
                                  khẩu
                                </b>{" "}
                              </label>
                            </section>
                            <section>
                              <label className="label">Xác nhận mật khẩu</label>
                              <label className="input">
                                {" "}
                                <i className="icon-append fa fa-user" />
                                <input
                                  type="password"
                                  
                                  name=""
                                  data-smart-validate-input=""
                                  data-required=""
                                  data-email=""
                                  data-message-required="Please enter your email address"
                                  data-message-email="Please enter a VALID email address"
                                />
                                <b className="tooltip tooltip-top-right">
                                  <i className="fa fa-user txt-color-teal" />
                                  Email
                                </b>
                              </label>
                            </section>
                            <section>
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  name="remember"
                                  defaultChecked={true}
                                />
                                <i />Stay signed in
                              </label>
                            </section>
                          </fieldset>
                          <footer>
                            <button
                              type="button"
                              className="btn btn-common btn-green"
                              
                            >
                              Đăng ký
                            </button>
                            <a onClick={() => this.setState({ register: false })}>
                              Đã có tài khoản ? Đăng nhập
                            </a>
                          </footer>
                        </form>
                    </Tab>
                  </Tabs>
                  







                  ) : (
                    <form id="login-form" className="smart-form client-form">
                      <header>Đăng nhập</header>
                      <fieldset>
                        {this.state.showError ? (
                          <section>
                            <div className="alert alert-danger fade in">
                              <i className="fa-fw fa fa-times" />
                              <strong>Lỗi!</strong>{" "}
                              {this.props.authenticate.error}
                            </div>
                          </section>
                        ) : this.state.showSuccess ? (
                          <section>
                            <div className="alert alert-success fade in">
                              <i className="fa-fw fa fa-times" />
                              <strong>Thành Công</strong>{" "}
                              {this.props.authenticate.success}
                            </div>
                          </section>
                        ) : null}
                        <section>
                          <label className="label">Email</label>
                          <label className="input">
                            {/* {" "}
                            <i className="icon-append fa fa-user" /> */}
                            <input
                              type="email"
                              onChange={abc => this.updateInputValue(abc)}
                              name="phone"
                              data-smart-validate-input=""
                              data-required=""
                              data-email=""
                              data-message-required="Please enter your email address"
                              data-message-email="Please enter a VALID email address"
                            />
                            <b className="tooltip tooltip-top-right">
                              <i className="fa fa-user txt-color-teal" />
                              Email
                            </b>
                          </label>
                        </section>
                        <section>
                          <label className="label">Mật khẩu</label>
                          <label className="input">
                            {/* {" "}
                            <i className="icon-append fa fa-lock" /> */}
                            <input
                              type="password"
                              name="password"
                              onChange={def =>
                                this.updateInputValuePassword(def)
                              }
                              data-smart-validate-input=""
                              data-required=""
                              data-minlength="3"
                              data-maxnlength="20"
                              data-message="Please enter your email password"
                            />
                            <b className="tooltip tooltip-top-right">
                              <i className="fa fa-lock txt-color-teal" /> Mật
                              khẩu
                            </b>{" "}
                          </label>
                        </section>
                        <section>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              name="remember"
                              defaultChecked={true}
                            />
                            <i />Stay signed in
                          </label>
                        </section>
                        {this.state.forgotPassword ? (
                          <section>
                            <label className="label">Mật khẩu</label>
                            <label className="input">
                              {" "}
                              <i className="icon-append fa fa-lock" />
                              <input
                                type="text"
                                name=""
                                onChange={def =>
                                  this.updateInputForgotPassword(def)
                                }
                                data-smart-validate-input=""
                                data-required=""
                                data-minlength="3"
                                data-maxnlength="20"
                                data-message="Please enter your email password"
                              />
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-lock txt-color-teal" /> Mật
                                khẩu
                              </b>{" "}
                            </label>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={evt => this.handleForgot(evt)}
                            >
                              Lấy lại mật khẩu
                            </button>
                          </section>
                        ) : null}
                        {this.state.passCode ? (
                          <section>
                            <label className="label">Mã Code</label>
                            <label className="input">
                              {" "}
                              <i className="icon-append fa fa-lock" />
                              <input
                                type="text"
                                name=""
                                onChange={def =>
                                  this.setState({ passCode: def.target.value })
                                }
                                data-smart-validate-input=""
                                data-required=""
                                data-minlength="3"
                                data-maxnlength="20"
                                data-message="Please enter your email password"
                              />
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-lock txt-color-teal" />{" "}
                                Email
                              </b>{" "}
                            </label>
                            <label className="label">Email</label>
                            <label className="input">
                              {" "}
                              <i className="icon-append fa fa-lock" />
                              <input
                                type="text"
                                name=""
                                onChange={def =>
                                  this.setState({ passEmail: def.target.value })
                                }
                                data-smart-validate-input=""
                                data-required=""
                                data-minlength="3"
                                data-maxnlength="20"
                                data-message="Please enter your email password"
                              />
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-lock txt-color-teal" /> Mật
                                khẩu
                              </b>{" "}
                            </label>
                            <label className="label">Mật Khẩu</label>
                            <label className="input">
                              {" "}
                              <i className="icon-append fa fa-lock" />
                              <input
                                type="password"
                                name=""
                                onChange={def =>
                                  this.setState({ passPass: def.target.value })
                                }
                                data-smart-validate-input=""
                                data-required=""
                                data-minlength="3"
                                data-maxnlength="20"
                                data-message="Please enter your email password"
                              />
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-lock txt-color-teal" /> Mật
                                khẩu
                              </b>{" "}
                            </label>
                            <label className="label">
                              Xác nhận mật khẩu mới
                            </label>
                            <label className="input">
                              {" "}
                              <i className="icon-append fa fa-lock" />
                              <input
                                type="password"
                                name=""
                                onChange={def =>
                                  this.setState({
                                    passPassEmail: def.target.value,
                                  })
                                }
                                data-smart-validate-input=""
                                data-required=""
                                data-minlength="3"
                                data-maxnlength="20"
                                data-message="Please enter your email password"
                              />
                              <b className="tooltip tooltip-top-right">
                                <i className="fa fa-lock txt-color-teal" /> Xác
                                nhận mật khẩu mới
                              </b>{" "}
                            </label>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={evt => this.handelSendCode(evt)}
                            >
                              Đổi mật khẩu
                            </button>
                          </section>
                        ) : null}
                      </fieldset>
                      <footer>
                        <a onClick={() => this.setState({ register: true })}>
                          Chưa có tài khoản ? Đăng ký
                        </a>
                        <button
                          type="button"
                          className="btn btn-common btn-green"
                          onClick={evt => this.handleLogin(evt)}
                        >
                          Đăng Nhập
                        </button>
                      </footer>
                      <footer>                        
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={evt => this.switchRoute(evt)}
                        >
                          Đặt hàng
                        </button>
                      </footer>
                    </form>
                  )}
                  {this.state.passCode ? null : (
                    <div>
                      <a
                        onClick={() =>
                          this.setState({
                            forgotPassword: !this.state.forgotPassword,
                          })
                        }
                      >
                        Quên Mật Khẩu
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Connect(Login);
