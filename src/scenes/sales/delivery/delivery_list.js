import React, { Component } from "react";

import Connect from "../../../stores/connect";
import Utils, { LINK } from "../../../utils";
import { Link } from "react-router-dom";
import JarvisWidget from "../../../components/jarvis_widget";

class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      limit: this.query["l"] || 20,
      page: parseInt(this.query["p"]) || 1,
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Danh sách đơn vị vận chuyển
            </h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <Link
                  to={Utils.link(LINK.DELIVERY, "them-moi")}
                  className="btn btn-success btn-lg"
                >
                  Tạo mới
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <JarvisWidget editbutton={false} custombutton={false}>
          <header>
            <span className="widget-icon">
              {" "}
              <i className="fa fa-edit" />{" "}
            </span>
          </header>
          <div>
            {/* widget content */}
            <div className="widget-body no-padding">
              <form className="smart-form" id="search">
                <fieldset>
                  <section className="col col-4">
                    <label className="input">
                      <input
                        type="text"
                        placeholder="Tên đơn vị vận chuyển"
                        value={this.state.title}
                        className="form-control"
                        name="title"
                        onChange={e => this.setState({ title: e.target.value })}
                      />
                    </label>
                  </section>
                </fieldset>
                <footer>
                  <Link
                    to={Utils.link(LINK.DELIVERY, "danh-sach", {
                      title: this.state.title,
                      limit: this.state.limit,
                      page: 1,
                    })}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Tìm kiếm
                  </Link>
                </footer>
              </form>
            </div>
          </div>
        </JarvisWidget>
        <JarvisWidget editbutton={false} color="darken">
          <header>
            <span className="widget-icon">
              {" "}
              <i className="fa fa-table" />{" "}
            </span>
            <h2>Danh sách nhà cung cấp</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên đơn vị giao hàng</th>
                      <th>Chi phí vận chuyển</th>
                      <th>Hoạt động</th>
                      <th>Ngày tạo</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.delivery.list.length > 0 &&
                      this.props.delivery.list.map((delivery, index) => (
                        <tr key={"delivery_list_" + delivery.deliveryId}>
                          <td>{index}</td>
                          <td>
                            <Link
                              to={Utils.link(
                                LINK.DELIVERY,
                                delivery.deliveryId
                              )}
                            >
                              {delivery.title}
                            </Link>
                          </td>
                          <td>{delivery.fee}</td>
                          <td>
                            {delivery.isActive ? (
                              <label className="label label-success">
                                Đang hoạt động
                              </label>
                            ) : (
                              <label className="label label-danger">Đóng</label>
                            )}
                          </td>
                          <td>{Utils.formatDate(delivery.createAt)}</td>
                          <td>
                            <span className="btn btn-danger center-block">
                              Xóa
                            </span>
                          </td>
                        </tr>
                      ))}
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

export default Connect(DeliveryList);
