import React, { Component } from "react";

import Connect from "../../stores/connect";
import serialize from "form-serialize";
import JarvisWidget from "../../components/jarvis_widget";
import Utils, { LINK } from "../../utils";
import { Link } from "react-router-dom";
class SearchInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      phone: "",
    };
  }

  onSubmit(e) {
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
            <h1 className="page-title txt-color-blueDark">Quản lý đơn hàng</h1>
          </div>
        </div>
        <JarvisWidget editbutton={false} custombutton={false}>
          <header>
            <span className="widget-icon">
              {" "}
              <i className="fa fa-edit" />{" "}
            </span>

            <h2>Top tài khoản mua nhiều</h2>
          </header>
          <div>
            {/* widget content */}
            <div className="widget-body no-padding">
              <form className="smart-form" id="search">
                <fieldset>
                  <div className="row">
                    <section className="col col-xs-4">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Mã đơn hàng"
                          value={this.state.code}
                          className="form-control"
                          name="code"
                          onChange={e =>
                            this.setState({ code: e.target.value })
                          }
                        />
                      </div>
                    </section>
                    <section className="col col-xs-4">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Họ tên"
                          value={this.state.name}
                          className="form-control"
                          name="name"
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </div>
                    </section>
                    <section className="col col-xs-4">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Số điện
                                                    thoại"
                          value={this.state.phone}
                          className="form-control"
                          name="phone"
                          onChange={e =>
                            this.setState({ phone: e.target.value })
                          }
                        />
                      </div>
                    </section>
                  </div>
                </fieldset>
                <footer>
                  <button
                    className="btn btn-primary"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Tìm kiếm
                  </button>
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
            <h2>Top mua nhiều</h2>
          </header>
          <div>
            <div className="widget-body no-padding">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã đơn hàng</th>
                      <th>Họ tên</th>
                      <th>Số điện thoại</th>
                      <th>Thời gian đặt</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <Link to={Utils.link(LINK.INVOICE, "123123")}>
                          aaaa
                        </Link>
                      </td>
                      <td>Phạm Văn A</td>
                      <td>0123456789</td>
                      <td>10/10/2017 10:10:10</td>
                      <td>100,000,000</td>
                      <td>
                        <label className="btn btn-danger">Hết hàng</label>
                      </td>
                    </tr>
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

export default Connect(SearchInvoice);
