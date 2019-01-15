import React, { Component } from 'react';
import {Modal, Button, Panel} from "react-bootstrap";
import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import UiDatepicker from "../../components/forms/date_picker";
import Moment from 'moment';
import _ from 'lodash';

class PermanentlyDeletedProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isChecked : false
        }
        
    }
    selectedItem = () => {
        this.setState({
            isChecked : !this.state.isChecked
        })
    }
    render(){
        return(
            <div id="content">
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 className="page-title txt-color-blueDark">
                    Danh sách thuốc xóa vĩnh viễn
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">                  
                  <li
                    // onClick={() => this.deletePending()}
                    className="sparks-info"
                  >
                    <button type="button" className="btn btn-danger btn-lg">
                      Xóa
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
                <h2>Danh sách</h2>
                </header>
                <div>
                    <div className="widget-body no-padding">
                        <div className="custom-table-bill">
                            {/* {this.NumberList(this.state.data)} */}
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Cửa hàng</th>
                                            <th>Thời gian</th>
                                            <th>Lựa chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Thuốc giảm đau</td>
                                            <td>135000VND</td>
                                            <td>Phú Khang</td>
                                            <td>15/01/2019</td>
                                            <td>
                                                <label className="checkbox-group">
                                                    <input type="checkbox"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>                                            
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Thuốc giảm đau</td>
                                            <td>135000VND</td>
                                            <td>Phú Khang</td>
                                            <td>15/01/2019</td>
                                            <td>
                                                <label className="checkbox-group">
                                                    <input type="checkbox"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>  
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Thuốc giảm đau</td>
                                            <td>135000VND</td>
                                            <td>Phú Khang</td>
                                            <td>15/01/2019</td>
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
          </div>
        )
    } 
}
export default Connect(PermanentlyDeletedProduct)