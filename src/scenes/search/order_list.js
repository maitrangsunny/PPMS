import React, { Component } from 'react';
import {Modal, Button, Panel} from "react-bootstrap";
import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import UiDatepicker from "../../components/forms/date_picker";
import Moment from 'moment';
import _ from 'lodash';
class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            dataCustomer: [],
            listCustomer: [],
            startDay: "",
            endDay: "",
            idCustomer: 0,
            idDetail: 0,
            selectData: [],
        }
    }
    render(){
        return(
            <div id="content">
            {/* <div>
              <BillForm data={this.state.selectData} />
            </div> */}
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 className="page-title txt-color-blueDark">
                  Danh Sách Đơn Hàng Chờ Duyệt
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">
                  <li className="sparks-info">
                    <button
                    //   onClick={() =>
                    //     this.setState({
                    //       dataCustomer: this.props.authenticate.listOrder.data,
                    //     })
                    //   }
                      type="button"
                      className="btn btn-warning btn-lg"
                    >
                      Duyệt
                    </button>
                  </li>
                </ul>
              </div>
            </div>           
            <JarvisWidget editbutton={false} color="darken">
              <header>
                <span className="widget-icon">
                  <i className="fa fa-table" />
                </span>
                <h2>Danh sách đơn hàng</h2>
              </header>
              <div>
                <div className="widget-body no-padding">
                  <div className="custom-table-bill">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-hover">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td>1</td>
                              <td>Mai Trang</td>
                              <td>Tân Phú</td>
                              <td>0123456789</td>                             
                              <td>
                                  <label className="checkbox-group">
                                      <input type="checkbox"/>
                                      <span className="checkmark"></span>
                                  </label>
                              </td> 
                          </tr>
                        
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </JarvisWidget>            
            <Loading loading={this.state.loading} />
          </div>
        )
    }
}
export default Connect(OrderList);