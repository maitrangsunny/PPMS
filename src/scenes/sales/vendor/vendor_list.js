import React, { Component } from "react";
import Utils, { LINK } from "../../../utils";
import { Link } from "react-router-dom";
import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";

class VendorList extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.router);
    this.state = {
      data: [],
    };
  }
  async componentWillMount() {
    await this.props.actions.product.listSup(this.props.storage.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.listSup && nextProps.product.listSup.status == 200) {
      this.setState({ data: nextProps.product.listSup.data });
    }
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Danh sách nhà cung cấp
            </h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <Link
                  to={Utils.link(LINK.VENDOR, "them-moi")}
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
                  <section className="col col-6">
                    <label className="input">
                      <input
                        type="text"
                        placeholder="Tên nhà cung cấp"
                        value={this.state.name}
                        className="form-control"
                        name="name"
                        onChange={e => this.setState({})}
                      />
                    </label>
                  </section>
                  <section className="col col-6">
                    <label className="select">
                      <select
                        className="form-control"
                        name="isActive"
                        value={this.state.isActive ? 1 : 0}
                        onChange={e =>
                          this.setState({
                            isActive: !!parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={0}>Đóng</option>
                        <option value={1}>Hoạt động</option>
                      </select>
                    </label>
                  </section>
                </fieldset>
                <footer style={{textAlign:'center'}}>
                  <Link
                    to={Utils.link(LINK.VENDOR, "danh-sach", {
                    })}
                    type="submit"
                    className="btn btn-primary"
                    style={{float: 'none'}}
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
              <i className="fa fa-table" />
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
                      <th>Tên nhà cung cấp</th>
                      <th>SĐT</th>
                      <th>Tình Trạng</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((item, index) => (
                        <tr onClick={()=>alert('asdasd')} key={index}>
                          <th>{index}</th>
                          <th>{item.name}</th>
                          <th>{item.phone}</th>
                          <th>{item.is_enable == 1 ? "Hoạt Động" : "Đóng" }</th>
                          <th>{item.note}</th>
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

export default Connect(VendorList);
