import React, { Component } from "react";

import Connect from "../../stores/connect";
import JarvisWidget from "../../components/jarvis_widget";
import Data from "../../../public/assets/api/report/location.json";
import DataChart from "../../../public/assets/api/graphs/chartjs.json";
import UiDatepicker from "../../components/forms/date_picker";
import ChartJsGraph from "../../components/graphs/ChartJsGraph";
import SuggesEditext from "../../components/suggestCustomer";
import serialize from "form-serialize";

const theme = {
  container: {
    position: "relative",
  },
  input: {
    width: 300,
    height: 30,
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 500,
    fontSize: 16,
    border: "1px solid #aaa",
  },
  inputFocused: {
    outline: "none",
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    display: "none",
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    top: 51,
    width: 280,
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    maxHeight: 200,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
    overflow: "auto",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px",
  },
  suggestionHighlighted: {
    backgroundColor: "#ddd",
  },
};

class PaymentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {}

  dataReturn = value => {
    this.setState({
      nameCustomer: value.name,
      id: value.id,
    });
  };

  componentWillReceiveProps(nextProps) {}

  onSubmit(e) {
    e.preventDefault();
    let form = document.querySelector("#search");
    var obj = serialize(form, { hash: true });
    this.props.actions.product.thongke(
      this.props.storage.token,
      obj.startdate,
      obj.finishdate
    );
    return false;
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              Thống kê số đơn hàng của khách hàng
            </h1>
          </div>
        </div>
        <div className="row">
          <article className="col-sm-12">
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
                      <div className="row">
                        <section className="col col-6">
                          <label className="input">
                            {" "}
                            <i className="icon-append fa fa-calendar" />
                            <UiDatepicker
                              type="text"
                              name="startdate"
                              id="startdate"
                              minRestrict="#finishdate"
                              placeholder="Ngày Bắt Đầu"
                            />
                          </label>
                        </section>
                        <section className="col col-6">
                          <label className="input">
                            <i className="icon-append fa fa-calendar" />
                            <UiDatepicker
                              type="text"
                              name="finishdate"
                              id="finishdate"
                              maxRestrict="#startdate"
                              placeholder="Ngày Kết Thúc"
                            />
                          </label>
                        </section>
                      </div>
                    </fieldset>
                    <footer>
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={this.onSubmit.bind(this)}
                      >
                        Thống Kê
                      </button>
                    </footer>
                  </form>
                </div>
              </div>
            </JarvisWidget>
          </article>
          <article className="col-lg-12">
            <div className="row">
              <div className="col-xs-12">
                <JarvisWidget editbutton={false} color="darken">
                  <header>
                    <span className="widget-icon">
                      {" "}
                      <i className="fa fa-table" />{" "}
                    </span>
                    <h2>Báo cáo doanh thu</h2>
                  </header>
                  <div>
                    <div className="widget-body no-padding">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Tên</th>
                              <th>Số Lượng</th>
                              <th>Giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.product.thongke &&
                            this.props.product.thongke.data
                              ? this.props.product.thongke.data.map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.name}</td>
                                      <td>{item.number}</td>
                                      <td>
                                        {this.format2(
                                          parseInt(item.amount),
                                          "VNĐ"
                                        )}
                                      </td>
                                    </tr>
                                  )
                                )
                              : null}
                          </tbody>
                        </table>
                      </div>
                      <footer>
                        <h2 className="col-lg-8">
                          Tổng tiền đơn hàng đã bán :
                        </h2>
                        <h2 className="col-lg-4">
                          {this.format2(
                            parseInt(this.props.product.thongke.sum || 0),
                            "VNĐ"
                          )}
                        </h2>
                      </footer>
                    </div>
                  </div>
                </JarvisWidget>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default Connect(PaymentAdd);
