import React, {
    Component
} from 'react';
import serialize from 'form-serialize';
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import UiDatepicker from '../../../components/forms/date_picker';
class PromotionAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            start: "",
            finish: "",
            maximum: "0",
            price: "",
            totalCoupon: "",
            totalAccount: "",
            promotionMode: "group",
            attribute: "phone",

        }
    }

    onSubmit(e) {
        e.preventDefault();
        let form = document.querySelector('#smart-form');
        var obj = serialize(form, {hash: true});
        return false;
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            {this.props.id ? "Chỉnh sửa coupon" : "Tạo coupon"}
                        </h1>
                    </div>
                </div>
                    <JarvisWidget colorbutton={false} editbutton={false}
                                  custombutton={false}>
                        <header>
                                    <span className="widget-icon"> <i
                                        className="fa fa-edit"/> </span>
                            <h2>Chi tiết chiến dịch</h2>
                        </header>
                        <div>
                            <div className="widget-body no-padding">
                                <BootstrapValidator>
                                    <form id="smart-form" className="smart-form"
                                          data-bv-message="This value is not valid"
                                          data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                                          data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                                          data-bv-feedbackicons-validating="glyphicon glyphicon-refresh">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a data-toggle="tab" href="#menu1">Cơ bản</a>
                                            </li>
                                            <li className="">
                                                <a data-toggle="tab" href="#menu2">Nâng cao</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="menu1" className="tab-pane fade in active ">
                                                <fieldset>
                                                    <section className="form-group">
                                                        <label className="label">Mã coupon</label>
                                                        <label className="input">
                                                            <input type="text" className="form-control" name="code"
                                                                   value={this.state.code}
                                                                   onChange={e => this.setState({code: e.target.value})}/>
                                                        </label>
                                                    </section>
                                                    <section className="form-group">
                                                        <label className="label">Từ ngày</label>
                                                        <label className="input">
                                                            <UiDatepicker
                                                                name="start" placeholder="Select a date"
                                                                className="form-control datepicker"
                                                                data-date-format="dd/mm/yy"  value={this.state.start}
                                                                onChange={e => this.setState({start: e.target.value})}/>
                                                        </label>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Đến ngày</label>
                                                        <label className="input">
                                                            <UiDatepicker
                                                                name="finish" placeholder="Select a date"
                                                                className="form-control datepicker"
                                                                data-date-format="dd/mm/yy"   value={this.state.finish}
                                                                onChange={e => this.setState({finish: e.target.value})}/>
                                                        </label>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Tỷ lệ giảm (%)</label>
                                                        <label className="input">
                                                            <input type="text" className="form-control"
                                                                   placeholder="% giảm giá" name="downScale"
                                                                   value=""/>
                                                        </label>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Giảm tối đa
                                                            (VND)</label>
                                                        <label className="input">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Số tiền VND giảm tối đa" name="maximum"
                                                                   value={this.state.maximum}
                                                                   onChange={e => this.setState({maximum: e.target.value})}/>
                                                        </label>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Số tiền yêu
                                                            cầu</label>
                                                        <div className="input">
                                                            <input type="text" className="form-control" name="price"
                                                                   placeholder="Số tiền cần thiết để tham gia khuyến mãi"
                                                                   value={this.state.price}
                                                                   onChange={e => this.setState({price: e.target.value})}/>
                                                        </div>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Số lượng
                                                            Coupon</label>
                                                        <label className="input">
                                                            <input type="text" className="form-control" placeholder=""
                                                                   name="totalCoupon"
                                                                   value={this.state.totalCoupon}
                                                                   onChange={e => this.setState({totalCoupon: e.target.value})}/>
                                                        </label>
                                                    </section>

                                                    <section className="form-group">
                                                        <label className="label">Lượt dùng mỗi tài
                                                            khoản</label>
                                                        <label className="input">
                                                            <input type="text" className="form-control" placeholder=""
                                                                   name="toalAccount"
                                                                   value={this.state.totalAccount}
                                                                   onChange={e => this.setState({totalAccount: e.target.value})}/>
                                                        </label>
                                                    </section>
                                                </fieldset>
                                            </div>
                                            <div id="menu2" className="tab-pane fade">
                                                <fieldset>
                                                    <section className="form-group">
                                                        <label className="label">Hình
                                                            thức khuyến
                                                            mãi</label>
                                                        <label className="select">
                                                            <select name="promotionMode" className="form-control" value={this.state.promotionMode}
                                                                    onChange={e => this.setState({promotionMode: e.target.value})}>
                                                                <option value="defaut">Mặc định</option>
                                                                <option value="group">Khuyến mãi theo
                                                                    nhóm
                                                                    hàng
                                                                </option>
                                                                <option value="attribute">Khuyến mãi
                                                                    theo thuộc
                                                                    tính
                                                                </option>
                                                            </select> <i/> </label>
                                                    </section>
                                                    <section className="form-group">
                                                        <label className="label">Chọn
                                                            nhóm thuộc
                                                            tính</label>
                                                        <label className="select">
                                                            <select name="attribute" className="form-control" value={this.state.attribute}
                                                                    onChange={e => this.setState({attribute: e.target.value})}>
                                                                <option value="phone">Nhóm điện thoại
                                                                </option>
                                                                <option value="machines">Nhóm điện máy
                                                                </option>
                                                            </select> <i/> </label>
                                                    </section>
                                                </fieldset>
                                                <fieldset style={{width: '70%', margin: "0px auto"}}>
                                                    <header>
                                                        <h2>Danh sách thuộc tính </h2>
                                                    </header>
                                                    <div>
                                                        <div className="jarviswidget-editbox">
                                                        </div>
                                                        <div className="widget-body">
                                                            <div className="tabs-left">
                                                                <ul className="nav nav-tabs tabs-left"
                                                                    id="demo-pill-nav">
                                                                    <li className="active">
                                                                        <a href="#tab-r1"
                                                                           data-toggle="tab">Thương
                                                                            hiệu</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#tab-r2"
                                                                           data-toggle="tab">Giá bán</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#tab-r3"
                                                                           data-toggle="tab">Kích cỡ</a>
                                                                    </li>
                                                                </ul>
                                                                <div className="tab-content">
                                                                    <div className="tab-pane active"
                                                                         id="tab-r1">
                                                                        <div>
                                                                            <br/>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="trade[]"
                                                                                       value="samsung"
                                                                                       defaultChecked/>
                                                                                <i/>Alexandra</label>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       value="nokia"
                                                                                       name="trade[]"/>
                                                                                <i/>Alice</label>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="trade[]"/>
                                                                                <i/>Anastasia</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tab-pane"
                                                                         id="tab-r2">
                                                                        <div>
                                                                            <br/>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="checkbox"/>
                                                                                <i/>Alice</label>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="checkbox"/>
                                                                                <i/>Anastasia</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tab-pane"
                                                                         id="tab-r3">
                                                                        <div>
                                                                            <br/>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="checkbox"
                                                                                />
                                                                                <i/>Alexandra</label>
                                                                            <label className="checkbox">
                                                                                <input type="checkbox"
                                                                                       name="checkbox"
                                                                                       defaultChecked/>
                                                                                <i/>Anastasia</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {/* end widget content */}

                                                    </div>
                                                    {/* end widget div */}
                                                </fieldset>
                                            </div>
                                        </div>
                                        <footer>
                                            <button type="button" className="btn btn-primary"
                                                    onClick={this.onSubmit.bind(this)}>Xác nhận
                                            </button>
                                        </footer>
                                    </form>
                                </BootstrapValidator>
                            </div>
                        </div>
                    </JarvisWidget>
            </div>
        )
    }
}

export default Connect(PromotionAdd);