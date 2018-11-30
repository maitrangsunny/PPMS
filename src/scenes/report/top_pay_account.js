import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import Data from "../../../public/assets/api/report/location.json";
import UiDatepicker from "../../components/forms/date_picker";
import serialize from "form-serialize";

class TopPayAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "none",
      province: "",
      branch: "",
    };
  }

  componentWillMount() {
    this.props.actions.authenticate.topTaiKhoanMuaNhieu(
      this.props.storage.token,
      "",
      ""
    );
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">Top tài khoản</h1>
          </div>
        </div>
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
                      <th>Họ tên</th>
                      <th>Tổng số đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.authenticate.topMuaNhieu &&
                    this.props.authenticate.topMuaNhieu.data
                      ? this.props.authenticate.topMuaNhieu.data.map(
                          (item, index) => 
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.number}</td>
                            </tr>
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

export default Connect(TopPayAccountList);
