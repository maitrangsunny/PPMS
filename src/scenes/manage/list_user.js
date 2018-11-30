import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import SmartNestable from "../../components/common/smart_nestable";
import BootstrapValidator from "../../components/forms/bootstrap_validator";
import serialize from "form-serialize";
import Utils from "../../utils";
class GeolocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
  }

  componentWillMount = () => {
    this.props.actions.authenticate.listUserAdmin(this.props.storage.token);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.listUserAdmin &&
      nextProps.authenticate.listUserAdmin.status == 200
    ) {
      this.setState({ showError: false });
    }
    if (
      nextProps.authenticate.listUserAdmin &&
      nextProps.authenticate.listUserAdmin.status == 403
    ) {
      this.setState({
        showError: true,
      });
    }
  }

  render() {
    return (
      <div id="content">
        {this.state.showError ? (
          <section>
            <div className="alert alert-danger fade in">
              <i className="fa-fw fa fa-times" />
              <strong>Lỗi!</strong> {this.props.authenticate.error}
            </div>
          </section>
        ) : (
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 className="page-title txt-color-blueDark">
                  Danh Sách Cửa Hàng
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">
                  <li className="sparks-info" />
                </ul>
              </div>
            </div>
            <JarvisWidget editbutton={false} color="darken">
              <header>
                <span className="widget-icon">
                  <i className="fa fa-table" />
                </span>
                <h2>Danh sách nội dung</h2>
              </header>
              <div>
                <div className="widget-body no-padding">
                  <div className="custom-table-bill">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.authenticate.listUserAdmin &&
                          this.props.authenticate.listUserAdmin.data
                            ? this.props.authenticate.listUserAdmin.data.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.email}</th>
                                    <th>{item.address || ""}</th>
                                    <th>{item.phone || ""}</th>
                                    <th>
                                      {Utils.getTime(item.outlet.created_at)}
                                    </th>
                                  </tr>
                                )
                              )
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </JarvisWidget>
          </div>
        )}
      </div>
    );
  }
}
export default Connect(GeolocationList);
