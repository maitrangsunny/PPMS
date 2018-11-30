import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import Layout from "../../components/layout";
import Utils, { LINK } from "../../utils";

class Dashboard extends Component {
  componentWillMount() {}

  async componentDidMount() {
    this.props.actions.storage.getUser();
  }

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
    };
  }

  onSearchChange = value => {
    this.setState({
      search: value,
    });
  };

  render() {
    return (
      <Layout
        logout={() => {
          this.props.actions.storage.removeAccessToken(),
            this.props.actions.storage.removeUser();
        }}
      >
        {this.state.loading ? (
          <div id="content">Loading....</div>
        ) : (
          <div id="content">
            <div className="well well-sm">
              <div className="input-group">
                <input
                  className="form-control input-lg"
                  value={this.state.search}
                  onChange={event => this.onSearchChange(event.target.value)}
                  placeholder="Search for an icon..."
                />
                <span className="input-group-addon">
                  <i className="fa fa-fw fa-lg fa-search" />
                </span>
              </div>
            </div>
            <div className="row">
              {/* NEW WIDGET START */}
              <article className="col-sm-12">
                {/* Widget ID (each widget will need unique ID)*/}
                <JarvisWidget
                  colorbutton={false}
                  editbutton={false}
                  togglebutton={false}
                  deletebutton={false}
                  color="purple"
                >
                  <header>
                    <h2>Chức năng</h2>
                  </header>
                  {/* widget div*/}
                  <div>
                    {/* widget content */}
                    <div className="widget-body" ref="demoContainer">
                      <ul className="bs-glyphicons">
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/noi-dung"
                          >
                            <span className="glyphicon glyphicon-book" />
                            <span className="glyphicon-class">Đơn Hàng</span>
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/san-pham"
                          >
                            <span className="glyphicon fa fa-fw fa-briefcase" />
                            <span className="glyphicon-class">Khách Hàng</span>
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/nha-cung-cap/danh-sach"
                          >
                            <span className="glyphicon fa fa-fw fa-truck" />
                            <span className="glyphicon-class">Cửa Hàng</span>
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/thong-ke/doanh-thu"
                          >
                            <span className="glyphicon fa fa-fw fa-line-chart" />
                            <span className="glyphicon-class">Thống Kê</span>
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/tai-khoan/danh-sach"
                          >
                            <span className="glyphicon fa fa-fw fa-users" />
                            <span className="glyphicon-class">Tài Khoản</span>
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              display: "block",
                            }}
                            href="/manage/geolocation/list"
                          >
                            <span className="glyphicon fa fa-fw fa-university" />
                            <span className="glyphicon-class">Quản Trị</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </JarvisWidget>
              </article>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

export default Connect(Dashboard);
