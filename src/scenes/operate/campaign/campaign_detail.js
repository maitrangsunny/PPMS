import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Utils, {
    LINK
} from "../../../utils";
import {Link} from 'react-router-dom';
import Data from '../../../../public/assets/api/tables/role.json';
import Paginator from '../../../components/common/paginator';
import {Alert} from 'react-bootstrap'


class AccountRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Create",
            name: "",
            bref: "",
            permission: []
        }

    }

    setData(name, bref, permission, type) {
        this.setState({
            type: type,
            name: name,
            bref: bref,
            permission: permission
        })
    }

    render() {

        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Thông tin chiến dịch
                        </h1>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                        <ul id="sparks" className="">
                            <li className="sparks-info">
                                <Link to={Utils.link(LINK.CAMPAIGN, "coupon/them-moi")} className="btn btn-success btn-lg">
                                    Tao mã coupon
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <JarvisWidget editbutton={false} color="darken">
                    <header>
                        <span className="widget-icon"> <i className="fa fa-edit"/> </span>
                        <h2>Danh sách coupon</h2>
                    </header>
                    <div>
                        <div className="widget-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã Coupon</th>
                                        <th>Số lượng</th>
                                        <th>Từ ngày</th>
                                        <th>Đến ngày</th>
                                        <th>Tỷ lệ giảm</th>
                                        <th>Giảm tối đa</th>
                                        <th>Số tiền yêu cầu</th>
                                        <th>Lượng Coupon</th>
                                        <th>Lượt dùng mỗi tài khoản</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><Link to={Utils.link(LINK.CAMPAIGN,"coupon/1")}>ADTFC</Link></td>
                                        <td>100</td>
                                        <td>10/10/2017 10:10:10</td>
                                        <td>10/10/2017 10:10:10</td>
                                        <td>10%</td>
                                        <td>100,000</td>
                                        <td>500,000</td>
                                        <td>500</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>ADTFCRRR</td>
                                        <td>100</td>
                                        <td>10/10/2017 10:10:10</td>
                                        <td>10/10/2017 10:10:10</td>
                                        <td>10%</td>
                                        <td>100,000</td>
                                        <td>500,000</td>
                                        <td>500</td>
                                        <td>1</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Paginator total={Data.total}/>

                        </div>
                    </div>
                </JarvisWidget>
            </div>

        )
    }

}

export default Connect(AccountRole);