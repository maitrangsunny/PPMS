import React, {
    Component
} from 'react';
import Utils, {
    LINK
} from "../../../utils";
import { Link } from 'react-router-dom';
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import serialize from "form-serialize";

class DeliveryAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryId: this.props.id | "",
            title: "",
            fee: "",
            supplier: "Nhà thuốc",
            isActive: false,
            coverageGeoLocation: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.delivery.detail !== this.props.delivery.detail) {

            let delivery = nextProps.delivery.detail;
            let coverageGeoLocation = [];
            delivery.coverageGeoLocation.map(location => coverageGeoLocation.push(location._id))
            console.log(coverageGeoLocation)
            this.setState({
                title: delivery.title,
                fee: delivery.fee,
                supplier: delivery.supplier,
                coverageGeoLocation: coverageGeoLocation,
                isActive: delivery.isActive
            })
        }
    }
    onSubmit() {
        let data = this.state;
        this.state.deliveryId === "" ? delevery.requestCreate(data, this.props.storage.token) : delevery.requestUpdate(data, this.props.storage.token)
        return false;
    }
    render() {
        console.log(this.state.isActive)
        return (
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
                    <header>
                        <span className="widget-icon">
                            <i className="fa fa-edit" />
                        </span>
                        <h2>Thêm mới danh mục</h2>
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
                                    <fieldset>
                                        <section className="form-group">
                                            <label className="label">Tên đơn vị vận chuyển</label>
                                            <div className="input">
                                                <input type="text" className="form-control"
                                                    name="title"
                                                    value={this.state.title}
                                                    onChange={e => this.setState({ title: e.target.value })}
                                                    placeholder="Tên đơn vị vận chuyển"
                                                    data-bv-notempty="true"
                                                    data-bv-notempty-message="Tên đơn vị vận chuyển không được bỏ trống" />
                                            </div>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Chi phí</label>
                                            <div className="input">
                                                <input type="text" className="form-control"
                                                    name="fee"
                                                    value={this.state.fee}
                                                    onChange={e => this.setState({ fee: e.target.value })}
                                                    placeholder="Fee"
                                                    data-bv-notempty="true"
                                                    data-bv-notempty-message="Chi phí không được bỏ trống" />
                                            </div>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Nhà cung cấp</label>
                                            <div className="input">
                                                <input type="text" className="form-control"
                                                    name="supplier"
                                                    value={this.state.supplier}
                                                    onChange={e => this.setState({ supplier: e.target.value })}
                                                    placeholder="Supplier" />
                                            </div>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Khu vực</label>
                                            <label style={{ color: "red" }}><b>Đang cập nhập</b></label>
                                        </section>
                                        <section className="col-lg-12">
                                            <label className="toggle col-lg-3" style={{
                                                display: "inline-block"
                                            }}>
                                                <input type="checkbox" name="isActive"
                                                    value={this.state.isActive}
                                                    defaultChecked={this.state.isActive}
                                                    onChange={e => this.setState({ isActive: e.target.checked })} />
                                                <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
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

export default Connect(DeliveryAdd);