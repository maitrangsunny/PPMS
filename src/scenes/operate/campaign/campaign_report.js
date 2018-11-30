import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Paginator from '../../../components/common/paginator';
import Data from '../../../../public/assets/api/tables/promotion.json';
class PromotionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            state: 0
        };
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeOption(event) {
        this.setState({state: event.target.value});
    }

    search(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Báo Cáo
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <article className="col-xs-6">
                        <JarvisWidget editbutton={false} color="darken">
                            <header>
                                <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                <h2>Báo cáo</h2>
                            </header>
                            <div>
                                <div className="widget-body no-padding">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Số lượng</th>
                                                <th>Đã sử dụng</th>
                                                <th>Còn</th>
                                                <th>Tổng tiền giảm</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr >
                                                <td>100,000</td>
                                                <td>10,000</td>
                                                <td>90,000</td>
                                                <td>1,000,000,000</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </JarvisWidget>
                    </article>
                    <article className="col-xs-12">
                        <JarvisWidget editbutton={false} color="darken">
                            <header>
                                <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                <h2>Danh sách coupon</h2>
                            </header>
                            <div>
                                <div className="widget-body no-padding">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã coupon</th>
                                                <th>Số lượng</th>
                                                <th>Sử dụng</th>
                                                <th>Còn</th>
                                                <th>Tổng tiền giảm</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr >
                                                <td>1</td>
                                                <td>ASETDS</td>
                                                <td>100</td>
                                                <td>5</td>
                                                <td>95</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr >
                                                <td>2</td>
                                                <td>ASETDS</td>
                                                <td>100</td>
                                                <td>5</td>
                                                <td>95</td>
                                                <td>100,000</td>
                                            </tr>
                                            <tr >
                                                <td>3</td>
                                                <td>ASETDS</td>
                                                <td>100</td>
                                                <td>5</td>
                                                <td>95</td>
                                                <td>100,000</td>
                                            </tr>

                                            </tbody>

                                        </table>
                                        <Paginator total={Data.total}/>

                                    </div>

                                </div>
                            </div>
                        </JarvisWidget>
                    </article>
                </div>
            </div>
        )
    }
}

export default Connect(PromotionList);