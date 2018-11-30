import React, { Component } from "react";
import Utils, { LINK } from "../../utils";
import { Link } from "react-router-dom";
import Connect from "../../stores/connect";

import JarvisWidget from "../../components/jarvis_widget";
import serialize from "form-serialize";

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      state: 0,
      permission: 0,
      sortby: 0,
      isIncremet: 0,
    };
  }

  componentWillMount = () => {
    this.props.actions.authenticate.detailAdmin(this.props.storage.token);
  };

  search(e) {
    e.preventDefault();
    let form = document.querySelector("#search");
    var obj = serialize(form, { hash: true });
    return false;
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">Quản lý tài khoản</h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <Link
                  to={Utils.link(LINK.ACCOUNT, "tao-moi")}
                  className="btn btn-success btn-lg"
                >
                  Tạo mới
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <JarvisWidget editbutton={false} color="darken">
          <header>
            <span className="widget-icon">
              {" "}
              <i className="fa fa-table" />{" "}
            </span>
            <h2>Danh sách tài khoản</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover table-scroll">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Điểm thưởng</th>
                      <th>Nhóm quyền</th>
                      <th>Trạng thái</th>
                      <th>Ngày đăng kí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.authenticate.detailAdmin &&
                    this.props.authenticate.detailAdmin.member
                      ? this.props.authenticate.detailAdmin.member.map(
                          (item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <Link
                                  to={Utils.link(
                                    LINK.ACCOUNT,
                                    "chi-tiet/" + item.id
                                  )}
                                >
                                  {item.email}
                                </Link>
                              </td>
                              <td>0948224447</td>
                              <td>Chưa có</td>
                              <td>Nhân Viên</td>
                              <td>
                                {item.is_active == 1 ? (
                                  <span className="label label-success">
                                    Hoạt động
                                  </span>
                                ) : (
                                  <span className="label label-danger">
                                    Tạm Ngừng
                                  </span>
                                )}
                              </td>
                              <td>10/10/2017</td>
                            </tr>
                          )
                        )
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </JarvisWidget>
      </div>
    );
  }
}

export default Connect(AccountList);
