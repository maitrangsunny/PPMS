import React, {
    Component
} from 'react';

import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';

class InvoiceDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Chi tiết đơn hàng
                        </h1>
                    </div>
                </div>

                        <div className="row">
                            <article className="col-sm-12 col-md-12 col-lg-5">

                                {/* Widget ID (each widget will need unique ID)*/}
                                <JarvisWidget editbutton={false} custombutton={false}>

                                    <header>
                                        <span className="widget-icon"> <i className="fa fa-edit"/> </span>
                                        <h2>Thông tin đơn hàng </h2>
                                    </header>
                                    <div>
                                        {/* widget content */}
                                        <div className="widget-body no-padding">
                                            <form className="smart-form">
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Mã đơn hàng</label>
                                                        <label className="col col-7">RYUI</label>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Thời gian đặt</label>
                                                        <label className="col col-7">14/03/2017 10:10:10</label>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Số tiền</label>
                                                        <label className="col col-7">120,000</label>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Khoản cộng</label>
                                                        <div className="col col-7">
                                                            <label>Thuế : 100,000</label><br/>
                                                            <label>Ship : 20,000đ</label>
                                                        </div>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Khoản trừ</label>
                                                        <label className="col col-7">Coupon : 10,000</label>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Tổng tiền</label>
                                                        <label className="col col-7">240,000đ</label>
                                                    </section>
                                                </fieldset>
                                                <fieldset>
                                                    <section>
                                                        <label className="col col-5">Trạng thái</label>
                                                        <label className="col col-7 label-success">Đợi giao</label>
                                                    </section>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </JarvisWidget>
                            </article>
                            <article className="col-sm-12 col-md-12 col-lg-7">

                                {/* Widget ID (each widget will need unique ID)*/}
                                <JarvisWidget editbutton={false} custombutton={false}>

                                    <header>
                                        <span className="widget-icon"> <i className="fa fa-reorder"/> </span>
                                        <h2>Lịch sử giao hàng </h2>
                                    </header>
                                    <div>
                                        {/* widget content */}
                                        <div className="widget-body">
                                            <div className="table-responsive">

                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Thời gian</th>
                                                        <th>Mô tả</th>
                                                        <th>Trạng thái</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>10/10/2017 10:10:10</td>
                                                        <td>Khởi tạo đơn hàng thành công</td>
                                                        <td><span className="label label-success">Thành công</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>11/10/2017 10:10:10</td>
                                                        <td>Xử lý yêu cầu</td>
                                                        <td><span className="label label-success">Thành công</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>11/11/2017 10:10:10</td>
                                                        <td>Xác nhận với người đặt hàng</td>
                                                        <td><span className="label label-warning">Đang xử lý</span></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </JarvisWidget>
                            </article>
                        </div>
                        <div className="row">
                            <article className="col-sm-12 col-md-12 col-lg-12">
                                {/* Widget ID (each widget will need unique ID)*/}
                                <JarvisWidget editbutton={false} custombutton={false}>

                                    <header>
                                        <span className="widget-icon"> <i className="fa fa-reorder"/> </span>
                                        <h2>Chi tiết đơn hàng </h2>
                                    </header>
                                    <div>
                                        {/* widget content */}
                                        <div className="widget-body">
                                            <h3 className="title">Sản phẩm từ : Nhà thuốc Số 1</h3>
                                            <div className="table-responsive">

                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>SKU</th>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Số lượng</th>
                                                        <th>Số tiền</th>
                                                        <th>Trạng thái</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>ASRWF</td>
                                                        <td>WREDSFVSR</td>
                                                        <td>Bình nước</td>
                                                        <td>100</td>
                                                        <td>100,000</td>
                                                        <td><span className="label label-success">Đủ hàng</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>ASRWFR</td>
                                                        <td>WREDSFVSREE</td>
                                                        <td>Vòi nước</td>
                                                        <td>100</td>
                                                        <td>100,000</td>
                                                        <td><span className="label label-danger">Thiếu hàng</span></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="widget-body">
                                            <h3 className="title">Sản phẩm từ : Nhà thuốc số 2</h3>
                                            <div className="table-responsive">

                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>SKU</th>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Số lượng</th>
                                                        <th>Số tiền</th>
                                                        <th>Trạng thái</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>ASRWF</td>
                                                        <td>WREDSFVSR</td>
                                                        <td>Bình nước</td>
                                                        <td>100</td>
                                                        <td>100,000</td>
                                                        <td><span className="label label-success">Đủ hàng</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>ASRWFR</td>
                                                        <td>WREDSFVSREE</td>
                                                        <td>Vòi nước</td>
                                                        <td>100</td>
                                                        <td>100,000</td>
                                                        <td><span className="label label-danger">Thiếu hàng</span></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
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

export default Connect(InvoiceDetail);