import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";

import Data from "../../../public/assets/api/tables/role.json";
// import Paginate from '../../components/paginate';
import PopupForm from "./components/popup";
import { Alert } from "react-bootstrap";
import Utils, { LINK } from "../../utils";

class AccountRole extends Component {
  constructor() {
    super();
    this.state = {
      type: "Create",
      name: "",
      bref: "",
      permission: [],
    };
  }

  setData(name, bref, permission, type) {
    this.setState({
      type: type,
      name: name,
      bref: bref,
      permission: permission,
    });
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Quản lý nhóm quyền
            </h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <button
                  className="btn btn-primary btn-lg"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Tao Nhom Quyen Moi
                </button>
              </li>
            </ul>
          </div>
        </div>
        <article>
          <div>
            <PopupForm data={this.state} />
          </div>
          <JarvisWidget editbutton={false} custombutton={false}>
            <header>
              <span className="widget-icon">
                {" "}
                <i className="fa fa-edit" />{" "}
              </span>

              <h2>Top sản phẩm mua nhiều</h2>
            </header>
            <div>
              <div className="widget-body no-padding">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Ngày tạo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data.data.map((data, i) => (
                        <tr key={i}>
                          <td>{data.id}</td>
                          <td>{data.role}</td>
                          <td>{data.bref}</td>
                          <td>{data.date}</td>
                          <td>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#myModal"
                              onClick={() =>
                                this.setData(
                                  data.role,
                                  data.bref,
                                  data.permission,
                                  "Edit"
                                )
                              }
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </JarvisWidget>
        </article>
      </div>
    );
  }
}

export default Connect(AccountRole);
