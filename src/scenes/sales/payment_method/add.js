import React, {
    Component
} from 'react';
import Utils, {
    LINK
} from "../../../utils/index";
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import serialize from "form-serialize";
import {BIGBOX} from "../../../utils";

class PaymentMethodAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethodId:"",
            title: "",
            isActive:true,
            isDelete:false
        };
        this.props.id && this.props.actions.paymentMethod.requestDetail(this.props.id, this.props.storage.token)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.paymentMethod.detail !== this.props.paymentMethod.detail) {
            let paymentMethod = nextProps.paymentMethod.detail;
            this.setState({
                paymentMethodId:paymentMethod.paymentMethodId,
                title: paymentMethod.title,
                isDelete:paymentMethod.isDelete,
                isActive:paymentMethod.isActive
            })
        }
        if (this.props.paymentMethod.status !== nextProps.paymentMethod.status) {
            switch (nextProps.paymentMethod.status) {
                case 1 :
                    Utils.bigBox("Thành công", "Bạn đã tạo nội dung thành công", BIGBOX.SUCESS);
                    this.props.actions.app.navigate(Utils.link(LINK.PAYMENT_METHOD,"danh-sach"));
                    break;
                case 2 :
                    Utils.bigBox("Thành công", "Bạn đã chỉnh sửa nội dung thành công", BIGBOX.SUCESS);
                    this.props.actions.app.navigate(Utils.link(LINK.PAYMENT_METHOD,"danh-sach"));
                    break;
            }
        }
    }

    onSubmit() {
        // e.preventDefault();
        let data=this.state;
        let paymentMethod =this.props.actions.paymentMethod;
        // console.log(data);
        this.state.paymentMethodId===""?paymentMethod.requestCreate(data,this.props.storage.token):paymentMethod.requestUpdate(data,this.props.storage.token)
        return false;
    }
    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            {this.state.paymentMethodId==="" ? "Thêm ":"Chỉnh sửa "} phương thức thanh toán
                        </h1>
                    </div>
                </div>
                <JarvisWidget editbutton={false} deletebutton={false}>

                    {/* widget div*/}
                    <header>
                        <span className="widget-icon">
                            <i className="fa fa-edit"/>
                        </span>
                        <h2>Chi tiết phương thức thanh toán</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <BootstrapValidator>
                                <form id="smart-form" className="smart-form"
                                      data-bv-message="This value is not valid"
                                      data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                                      data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                                      data-bv-feedbackicons-validating="glyphicon glyphicon-refresh">
                                    <fieldset >
                                        <section className="form-group">
                                            <label className="label">Tên phương thức thanh toán</label>
                                            <div className="input">
                                                <input type="text" className="form-control"
                                                       name="title"
                                                       value={this.state.title}
                                                       onChange={e=>this.setState({title:e.target.value})}
                                                       placeholder="Tên đơn vị vận chuyển"
                                                       data-bv-notempty="true"
                                                       data-bv-notempty-message="Tên đơn vị vận chuyển không được bỏ trống"/>
                                            </div>
                                        </section>

                                        <section className="col-lg-12">
                                            <label className="toggle col-lg-3" style={{
                                                display: "inline-block"
                                            }}>
                                                <input type="checkbox" name="isActive"
                                                       value={this.state.isActive}
                                                       defaultChecked={this.state.isActive}
                                                       onChange={e => this.setState({isActive: e.target.checked})}/>
                                                <i data-swchon-text="Bật" data-swchoff-text="Tắt"/>
                                                Hoạt
                                                động
                                            </label>
                                        </section>

                                    </fieldset>
                                    <footer>
                                        <button type="button" className="btn btn-primary" disabled={false}
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

export default Connect(PaymentMethodAdd);