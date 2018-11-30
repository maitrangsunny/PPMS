import React, { Component } from "react";
import Utils, { LINK } from "../../utils";
import { Link } from "react-router-dom";
import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import serialize from "form-serialize";

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      name: "",
      email: "",
      createDay: "",
    };
  }

  onSubmit(e) {
    this.props.actions.authenticate.updateUser(
      this.props.storage.token,
      this.props.id,
      this.state.display
    );
  }

  componentWillMount() {
    if (this.props.id) {
      this.props.actions.authenticate.detailUser(
        this.props.storage.token,
        this.props.id
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const updateState = {};
    if (
      nextProps.authenticate.detailUser &&
      nextProps.authenticate.detailUser.status == 200
    ) {
      if (nextProps.authenticate.detailUser.data.is_active == 1) {
        updateState.display = true;
      }
      if (nextProps.authenticate.detailUser.data.is_active == 0) {
        updateState.display = false;
      }
      const newState = {
        ...updateState,
        name: nextProps.authenticate.detailUser.data.name,
        email: nextProps.authenticate.detailUser.data.email,
        createDay: nextProps.authenticate.detailUser.data.created_at,
      };
      this.setState(newState);
    }
  }

  _handleChange = () => {
    this.setState({ display: !this.state.display });
  };

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Chi tiết nhân viên
            </h1>
          </div>
        </div>
        <div className="row">
          <article className="col-sm-12 col-md-12 col-lg-5">
            <JarvisWidget
              editbutton={false}
              custombutton={false}
              color="darken"
            >
              <header>
                <span className="widget-icon">
                  {" "}
                  <i className="fa fa-edit" />{" "}
                </span>
                <h2>Thông tin nhân viên</h2>
              </header>
              <div>
                {/* widget content */}
                <div className="widget-body no-padding">
                  <form className="smart-form" id="smart-form">
                    <fieldset>
                      <section>
                        <label className="col col-5">Họ & tên</label>
                        <input
                          className="col col-7"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </section>
                    </fieldset>
                    <fieldset>
                      <section>
                        <label className="col col-5">Email</label>
                        <label className="col col-7">{this.state.email}</label>
                      </section>
                    </fieldset>
                    <fieldset>
                      <section>
                        <label className="col col-5">Google</label>
                        <label className="col col-7">
                          nhthinh.dev@gmail.com
                        </label>
                      </section>
                    </fieldset>
                    <fieldset>
                      <section>
                        <label className="col col-5">Facebook</label>
                        <label className="col col-7">123456aasdcbdvasj</label>
                      </section>
                    </fieldset>
                    <fieldset>
                      <section>
                        <label className="col col-5">Ngày đăng kí</label>
                        <label className="col col-7">
                          {this.state.createDay}
                        </label>
                      </section>
                    </fieldset>
                    <fieldset>
                      <section>
                        <label className="col col-5">Trạng thái</label>
                        <div className="col col-7">
                          <div>
                            <label className="toggle">
                              <input
                                ref="switch"
                                checked={this.state.display}
                                onChange={this._handleChange}
                                className="switch"
                                type="checkbox"
                              />
                               <i
                                className="col-lg-12"
                                data-swchon-text="Mở"
                                data-swchoff-text="Khóa"
                              />
                              <div>
                                <div />
                              </div>
                            </label>
                          </div>
                        </div>
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
                </div>
              </div>
            </JarvisWidget>
          </article>
          <article className="col-sm-12 col-md-12 col-lg-7">
            <JarvisWidget
              editbutton={false}
              custombutton={false}
              color="darken"
            >
              <header>
                <span className="widget-icon">
                  {" "}
                  <i className="fa fa-reorder" />{" "}
                </span>
                <h2>Địa chỉ nhận hàng </h2>
              </header>
              <div>
                {/* widget content */}
                <div className="widget-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Thời gian</th>
                          <th>Họ & tên</th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                          <th>Địa chỉ</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>10/10/2017 10:10:10</td>
                          <td>
                            <Link
                              to={Utils.link(
                                LINK.ACCOUNT,
                                "thong-tin-ca-nhan/" + this.props.id
                              )}
                            >
                              Nguyễn Văn A
                            </Link>
                          </td>
                          <td>84090909009</td>
                          <td>khoapm555@gmai.com</td>
                          <td>123/456 Cống Quỳnh</td>
                          <td>
                            <span className="label label-success">
                              Thành công
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </JarvisWidget>
          </article>
        </div>
        <div className="row">
          <article className="col-sm-12 col-md-12 col-lg-12">
            {/* Widget ID (each widget will need unique ID)*/}
            <JarvisWidget
              editbutton={false}
              custombutton={false}
              color="darken"
            >
              <header>
                <span className="widget-icon">
                  {" "}
                  <i className="fa fa-reorder" />{" "}
                </span>
                <h2>Đơn hàng đã tạo</h2>
              </header>
              <div>
                {/* widget content */}
                <div className="widget-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Ngày đặt</th>
                          <th>Mã đơn hàng</th>
                          <th>Người nhận</th>
                          <th>Địa chỉ nhận</th>
                          <th>Email</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>10/10/2017 10:10:10</td>
                          <td>
                            <a href="">WREDSFVSR</a>
                          </td>
                          <td>Nguyễn Văn A</td>
                          <td>123/456 Cống Quỳnh, Q1,TPHCM</td>
                          <td>khoapm555@gmai.com</td>
                          <td>
                            <span className="label label-success">
                              Đã nhận hàng
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>10/10/2017 10:10:10</td>
                          <td>
                            <a href="">WREDSFVSR</a>
                          </td>
                          <td>Nguyễn Văn A</td>
                          <td>123/456 Cống Quỳnh, Q1,TPHCM</td>
                          <td>khoapm555@gmai.com</td>
                          <td>
                            <span className="label label-danger">
                              Thiếu hàng
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </JarvisWidget>
          </article>
        </div>
      </div>
    );
  }
}

export default Connect(AccountDetail);
