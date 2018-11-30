import React, { Component } from "react";

import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";
import BootstrapValidator from "../../../components/forms/bootstrap_validator";
import serialize from "form-serialize";
import FuelUxWizard from "../../../components/forms/FuelUxWizard";
import Configs from "../../../configs";

class VendorAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: 0,
      isActive: true,
    };
  }
  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <div id="content">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 className="page-title txt-color-blueDark">
                Thêm Nhà Cung Cấp
              </h1>
            </div>
          </div>
          <JarvisWidget editbutton={false} deletebutton={false}>
            {/* widget div*/}
            <div>
              <div className="step-content">
                <BootstrapValidator>
                  <form
                    className="smart-form"
                  >
                    <br />
                    <div className="step-pane active" data-step="1">
                      <h3>- Thông tin nhà cung cấp</h3>

                      {/* wizard form starts here */}
                      <fieldset>
                        <section className="form-group">
                          <label className="label">Tên nhà cung cấp</label>
                          <label className="input">
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={this.state.name}
                              onChange={e =>
                                this.setState({ name: e.target.value })
                              }
                              placeholder="Tên nhà cung cấp"
                              data-bv-notempty="true"
                              data-bv-notempty-message="Tên sản phẩm không được bỏ trống"
                            />
                          </label>
                        </section>
                        <section className="form-group">
                          <label className="label">SĐT</label>
                          <label className="input">
                            <input
                              type="number"
                              className="form-control"
                              name="slug"
                              value={this.state.phone}
                              onChange={e =>
                                this.setState({ phone: e.target.value })
                              }
                              placeholder="Số điện thoại"
                              data-bv-notempty="true"
                              data-bv-notempty-message="Slug không được bỏ trống"
                            />
                          </label>
                        </section>
                        <section className="col-lg-12">
                          <label
                            className="toggle col-lg-3"
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <input
                              type="checkbox"
                              name="isActive"
                              value={this.state.isActive}
                              defaultChecked={this.state.isActive}
                              onChange={e =>
                                this.setState({ isActive: e.target.checked })
                              }
                            />
                            <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                            Hoạt động
                          </label>
                        </section>
                      </fieldset>
                    </div>
                  </form>
                </BootstrapValidator>
              </div>
            </div>
          </JarvisWidget>
        </div>
      </div>
    );
  }
}

export default Connect(VendorAdd);
